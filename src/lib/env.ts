import zod from "zod";

// strict schema for runtime
const strictSchema = zod.object({
	DATABASE_URI: zod.string().nonempty(""),
	PAYLOAD_SECRET: zod.string().nonempty(""),
	RESEND_API_KEY: zod.string().nonempty(""),
	RESEND_FROM_EMAIL: zod.string().nonempty(""),
	RESEND_FROM_NAME: zod.string().nonempty(""),
	S3_BUCKET_NAME: zod.string().nonempty(""),
	S3_ENDPOINT: zod.string().nonempty(""),
	S3_ACCESS_KEY: zod.string().nonempty(""),
	S3_SECRET_KEY: zod.string().nonempty(""),
	S3_REGION: zod.string().nonempty(""),
	UPLOADTHING_TOKEN: zod.string().nonempty(""),
	NEXT_PUBLIC_SERVER_URL: zod.string().nonempty(""),
});

// lenient schema for build-time
const lenientSchema = zod.object({
	DATABASE_URI: zod.string().optional().default(""),
	PAYLOAD_SECRET: zod.string().optional().default(""),
	RESEND_API_KEY: zod.string().optional().default(""),
	RESEND_FROM_EMAIL: zod.string().optional().default(""),
	RESEND_FROM_NAME: zod.string().optional().default(""),
	S3_BUCKET_NAME: zod.string().optional().default(""),
	S3_ENDPOINT: zod.string().optional().default(""),
	S3_ACCESS_KEY: zod.string().optional().default(""),
	S3_SECRET_KEY: zod.string().optional().default(""),
	S3_REGION: zod.string().optional().default(""),
	UPLOADTHING_TOKEN: zod.string().optional().default(""),
	NEXT_PUBLIC_SERVER_URL: zod.string().optional().default(""),
});

// pick a schema depending on environment
const envSchema = process.env.NODE_ENV === "production" ? strictSchema : lenientSchema;

export const env = envSchema.parse(process.env);
