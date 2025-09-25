import sharp from "sharp";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { plugins } from "@/payload/plugins/schema";

import path from "path";
import { fileURLToPath } from "url";

import { collections } from "@/payload/collections";
import { Users } from "@/payload/collections/users/schema";

import { lexical } from "@/payload/fields/lexical";
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
	collections: collections,
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	editor: lexical,
	email: resend,
	globals: [],
	plugins: [payloadCloudPlugin(), ...plugins],
	secret: process.env.PAYLOAD_SECRET || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
