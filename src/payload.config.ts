import sharp from "sharp";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import path from "path";
import { fileURLToPath } from "url";

import { Media } from "@/payload/collections/Media";
import { Users } from "@/payload/collections/Users";

import { resend } from "@/payload/fields/resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		meta: {
			titleSuffix: " | M6O4 Solutions",
		},
		user: Users.slug,
	},
	collections: [Users, Media],
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	editor: lexicalEditor(),
	email: resend,
	globals: [],
	plugins: [payloadCloudPlugin()],
	secret: process.env.PAYLOAD_SECRET || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
