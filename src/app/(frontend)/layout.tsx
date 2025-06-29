import { ReactNode } from "react";
import { Comfortaa as FontHeader, Montserrat as FontBody } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { FooterServer as Footer } from "@/payload/blocks/globals/footer/server";
import { HeaderServer as Header } from "@/payload/blocks/globals/header/server";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Payload CMS Starter Template",
	description: "Template to get started with Next.js, Payload 3.0, SQLite, Tailwind CSS and shadcn/ui.",
};

const fontHeader = FontHeader({ subsets: ["latin"], variable: "--font-header" });
const fontBody = FontBody({ subsets: ["latin"], variable: "--font-body" });

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning className={cn(fontHeader.variable, fontBody.variable)}>
				<head>
					<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
				</head>

				<body className="font-body flex h-screen flex-col">
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
		</ClerkProvider>
	);
};

export default RootLayout;
