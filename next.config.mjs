import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "payload-template.m6o4solutions.com",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
			},
		],
	},
	output: "standalone",
	webpack: (webpackConfig) => {
		webpackConfig.resolve.extensionAlias = {
			".cjs": [".cts", ".cjs"],
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".mjs": [".mts", ".mjs"],
		};

		return webpackConfig;
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
