import React, { ReactNode } from "react";
import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import { Footer } from "@/payload/blocks/globals/footer/component";
import { Header } from "@/payload/blocks/globals/header/component";

import { getServerSideURL } from "@/payload/utilities/get-url";
import { mergeOpenGraph } from "@/payload/utilities/merge-opengraph";

import type { Metadata } from "next";

// import global styles for the application
import "@/styles/globals.css";

// load the 'geist' font with the 'latin' subset
const geist = Geist({ subsets: ["latin"] });

// /**
//  * @component rootlayout
//  * @description the primary layout component for the entire application.
//  * it wraps all pages, setting up the basic html structure, fonts, theme provider,
//  * and global components like the header and footer.
//  *
//  * it utilizes next.js's native root layout functionality.
//  *
//  * @param {object} props - the properties passed to the layout.
//  * @param {reactnode} props.children - the page content to be rendered within the main tag.
//  */
const RootLayout = async (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<html lang="en" suppressHydrationWarning>
			{/* apply base styles and the geist font class to the body */}
			<body className={cn("flex h-screen flex-col", geist.className)}>
				{/* theme provider manages dark/light mode across the app */}
				<ThemeProvider
					attribute="class" // use 'class' to apply theme to the html element
					defaultTheme="system"
					enableSystem // allow system preference to override
					disableTransitionOnChange // prevent flashes when switching themes
				>
					{/* header component */}
					<header>
						<Header />
					</header>

					{/* main content area where child pages will be rendered */}
					<main>{children}</main>

					{/* footer component pinned to the bottom of the viewport */}
					<footer className="mt-auto">
						<Footer />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
};

// /**
//  * @constant metadata
//  * @description next.js metadata object for site-wide seo and social sharing configuration.
//  */
const metadata: Metadata = {
	// sets the base url for all relative urls in the metadata (e.g., og images)
	metadataBase: new URL(getServerSideURL()),
	// merges site-wide open graph defaults (like site name and description)
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image", // ensures large image display on twitter
		creator: "@m6o4solutions", // explicitly sets the twitter account creator
	},
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
	},
};

export { RootLayout as default, metadata };
