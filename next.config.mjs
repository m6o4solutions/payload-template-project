import { withPayload } from "@payloadcms/next/withPayload";

const createRemotePattern = (url) => {
	const { protocol, hostname, port } = new URL(url);

	return {
		protocol: protocol.replace(":", ""),
		hostname,
		port: hostname === "localhost" ? port : undefined,
	};
};

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		qualities: [25, 50, 75],
		remotePatterns: [createRemotePattern(NEXT_PUBLIC_SERVER_URL)],
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
