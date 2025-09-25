import React from "react";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Payload CMS Basic Template",
	description: "Template to get started with Next.js, Payload 3.0 CMS and Tailwind CSS.",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;

	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
