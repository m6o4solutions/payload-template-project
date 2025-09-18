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

// lenient schema for build-time (defaults to empty strings)
const lenientSchema = zod.object({
	DATABASE_URI: zod.string().default(""),
	PAYLOAD_SECRET: zod.string().default(""),
	RESEND_API_KEY: zod.string().default(""),
	RESEND_FROM_EMAIL: zod.string().default(""),
	RESEND_FROM_NAME: zod.string().default(""),
	S3_BUCKET_NAME: zod.string().default(""),
	S3_ENDPOINT: zod.string().default(""),
	S3_ACCESS_KEY: zod.string().default(""),
	S3_SECRET_KEY: zod.string().default(""),
	S3_REGION: zod.string().default(""),
	UPLOADTHING_TOKEN: zod.string().default(""),
	NEXT_PUBLIC_SERVER_URL: zod.string().default(""),
});

// pick a schema depending on environment
const envSchema = process.env.NODE_ENV === "production" ? strictSchema : lenientSchema;

export const env = envSchema.parse(process.env);
