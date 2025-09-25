import React, { ReactNode } from "react";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import { FooterServer as Footer } from "@/payload/blocks/globals/footer/server";
import { HeaderServer as Header } from "@/payload/blocks/globals/header/server";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Payload Basic Template",
	description: "Template to get started with Next.js, Payload 3.0 CMS and Tailwind CSS.",
};

const montserrat = Montserrat({ subsets: ["latin"] });

const RootLayout = async (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("flex h-screen flex-col", montserrat.className)}>
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

export default RootLayout;
