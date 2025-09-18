# check=skip=SecretsUsedInArgOrEnv
# Base image with Node.js 22 on Alpine
FROM node:22-alpine AS base

# ----------------------
# 1. Dependencies stage
# ----------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Enable pnpm and install dependencies
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ----------------------
# 2. Build stage
# ----------------------
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Provide placeholder envs so Next.js doesn't crash during build
ENV DATABASE_URI="placeholder"
ENV PAYLOAD_SECRET="placeholder"
ENV RESEND_API_KEY="placeholder"
ENV RESEND_FROM_EMAIL="placeholder@email.com"
ENV RESEND_FROM_NAME="placeholder"
ENV S3_BUCKET_NAME="placeholder"
ENV S3_ENDPOINT="http://placeholder.com"
ENV S3_ACCESS_KEY="placeholder"
ENV S3_SECRET_KEY="placeholder"
ENV S3_REGION="placeholder"
ENV UPLOADTHING_TOKEN="placeholder"
ENV NEXT_PUBLIC_SERVER_URL="http://placeholder.com"
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cHJlc2VudC1ncmFja2xlLTE2LmNsZXJrLmFjY291bnRzLmRldiQ"
ENV CLERK_SECRET_KEY="placeholder"
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL="http://placeholder.com"
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL="http://placeholder.com"
ENV NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="http://placeholder.com"
ENV NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="http://placeholder.com"
ENV CLERK_WEBHOOK_SIGNING_SECRET="placeholder"

# Build Next.js app
RUN corepack enable pnpm && pnpm run build

# ----------------------
# 3. Production stage
# ----------------------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

# Copy only what’s needed for production
COPY --from=builder /app/public ./public

RUN mkdir .next

RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Run the standalone Next.js server
CMD ["node", "server.js"]