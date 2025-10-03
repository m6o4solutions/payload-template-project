import {
	FixedToolbarFeature,
	HeadingFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
// import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";

import { Plugin } from "payload";

import { beforeSyncWithSearch } from "@/payload/search/before-sync";
import { searchFields } from "@/payload/search/field-overrides";

import { Media } from "@/payload/collections/media/schema";

// import { getServerSideURL } from "@/payload/utilities/get-url";

// import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
// import { Page, Post } from "@/payload-types";

// const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
// 	return doc?.title ? `${doc.title} | Payload Basic Template` : "Payload Basic Template";
// };

// const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
// 	const url = getServerSideURL();

// 	return doc?.slug ? `${url}/${doc.slug}` : url;
// };

const plugins: Plugin[] = [
	formBuilderPlugin({
		fields: {
			payment: false,
		},
		formOverrides: {
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "confirmationMessage") {
						return {
							...field,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										FixedToolbarFeature(),
										HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
									];
								},
							}),
						};
					}
					return field;
				});
			},
		},
	}),
	payloadCloudPlugin(),
	s3Storage({
		collections: {
			media: true,
		},
		bucket: process.env.S3_BUCKET || "",
		config: {
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
				secretAccessKey: process.env.S3_ACCESS_KEY_SECRET || "",
			},
			region: process.env.S3_REGION || "",
			endpoint: process.env.S3_ENDPOINT || "",
		},
	}),
	searchPlugin({
		collections: ["posts"],
		beforeSync: beforeSyncWithSearch,
		searchOverrides: {
			fields: ({ defaultFields }) => {
				return [...defaultFields, ...searchFields];
			},
		},
	}),
	// seoPlugin({ generateTitle, generateURL }),
];

export { plugins };
