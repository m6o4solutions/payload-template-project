import sharp from "sharp";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import path from "path";
import { fileURLToPath } from "url";

import { globals } from "@/payload/blocks/globals";
import { collections } from "@/payload/collections";
import { Users } from "@/payload/collections/users/schema";

import { lexical } from "@/payload/fields/lexical";
import { resend } from "@/payload/fields/resend";

import { plugins } from "@/payload/plugins/schema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		components: {
			graphics: {},
		},
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
	globals: globals,
	plugins: [...plugins],
	secret: process.env.PAYLOAD_SECRET || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
