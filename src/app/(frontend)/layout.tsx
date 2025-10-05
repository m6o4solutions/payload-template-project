import React, { ReactNode } from "react";
import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import { FooterServer as Footer } from "@/payload/blocks/globals/footer/component";
import { HeaderServer as Header } from "@/payload/blocks/globals/header/component";

import type { Metadata } from "next";

import "@/styles/globals.css";

const metadata: Metadata = {
	title: "Payload Basic Template",
	description: "Template to get started with Next.js, Payload 3.0 CMS and Tailwind CSS.",
};

const geist = Geist({ subsets: ["latin"] });

const RootLayout = async (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body className={cn("flex h-screen flex-col", geist.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<header>
						<Header />
					</header>

					<main>{children}</main>

					<footer className="mt-auto">
						<Footer />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
};

export { RootLayout as default, metadata };
