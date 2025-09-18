import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			(() => {
				const url = new URL(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000");

				return {
					protocol: url.protocol.replace(":", "") as "http" | "https",
					hostname: url.hostname,
					port: url.hostname === "localhost" ? url.port : undefined,
				};
			})(),
		],
	},
	output: "standalone",
	turbopack: {
		resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
