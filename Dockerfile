# check=skip=SecretsUsedInArgOrEnv

# Base image with Node.js 22 on Alpine
FROM node:22-alpine AS build

# This is required for Payload CMS (Sharp) to work on Alpine.
RUN apk add --no-cache libc6-compat

# ----------------------
# 1. Dependencies stage
# ----------------------
FROM base AS deps

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

# We define them as ARGs so GitHub Actions can pass them in during the build
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_META_ICON
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# We map them to ENV variables so Next.js can see them during build
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_META_ICON=${NEXT_PUBLIC_META_ICON}
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}

# Placeholders to prevent build errors
ENV PAYLOAD_BUILDING="true"
ENV DATABASE_URI_PRD="mongodb://127.0.0.1/build-production-db"
ENV DATABASE_URI_DEV="mongodb://127.0.0.1/build-development-db"
ENV PAYLOAD_SECRET="placeholder"
ENV PREVIEW_SECRET="placeholder"
ENV CRON_SECRET="placeholder"
ENV NEXT_PRIVATE_RECAPTCHA_SECRET_KEY="placeholder"

# Build Next.js app
RUN corepack enable pnpm && pnpm build

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

# Set up .next permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone output
# This includes the necessary node_modules and server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Run the standalone Next.js server
CMD ["node", "server.js"]
