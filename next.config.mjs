import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname,
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
