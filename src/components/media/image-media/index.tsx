"use client";

import React from "react";
// imports the highly optimized next.js image component.
import NextImage from "next/image";

// utility to merge tailwind classes.
import { cn } from "@/lib/utils";
// utility to construct the correct cdn/full url path for media assets from payload.
import { getMediaUrl } from "@/payload/utilities/get-media-url";

// imports types for static images and the media component's props.
import type { StaticImageData } from "next/image";
import type { Props as MediaProps } from "@/components/media/types";

// imports custom css variables, specifically to access defined breakpoints.
import { cssVariables } from "@/css-variables";

const { breakpoints } = cssVariables;

// a base64 encoded, low-resolution image to serve as the placeholder (blur-up effect)
// while the high-resolution image is still loading.
const placeholderBlur =
	"data:image/png;base64,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";

/**
 * @component imagemedia
 * @description handles the rendering of images using the next/image component for performance.
 * it supports both local static image imports (src) and remote payload cms media (resource).
 * it automatically calculates responsive 'sizes' attributes.
 *
 * @param {string} [altfromprops] - standard alt text.
 * @param {boolean} [fill] - controls nextimage fill behavior.
 * @param {string} [pictureclassname] - classes for the <picture> wrapper.
 * @param {string} [imgclassname] - classes for the final <img> element.
 * @param {boolean} [priority] - high-priority loading for lcp optimization.
 * @param {object} resource - payload media object for remote images.
 * @param {string} [sizefromprops] - custom 'sizes' attribute string.
 * @param {StaticImageData | string} [srcfromprops] - local static image import or explicit url string.
 * @param {string} [loadingfromprops] - loading strategy ('lazy' or 'eager').
 */
const ImageMedia = ({
	alt: altFromProps,
	fill,
	pictureClassName,
	imgClassName,
	priority,
	resource,
	size: sizeFromProps,
	src: srcFromProps,
	loading: loadingFromProps,
}: MediaProps) => {
	// initializes variables, allowing them to be overridden by payload data if present.
	let width: number | undefined;
	let height: number | undefined;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || "";

	// logic to process payload resource data if a static src is not provided.
	if (!src && resource && typeof resource === "object") {
		const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource;

		// extracts dimensions and alt text from the payload object.
		width = fullWidth!;
		height = fullHeight!;
		alt = altFromResource || "";

		// appends the 'updatedat' timestamp as a cache-busting tag to the image url.
		const cacheTag = resource.updatedAt;
		src = getMediaUrl(url, cacheTag);
	}

	// determines the loading strategy: 'eager' if priority is true, otherwise 'lazy'.
	const loading = loadingFromProps || (!priority ? "lazy" : undefined);

	// calculates the responsive 'sizes' attribute string.
	// this tells the browser which size image to fetch at different viewport widths.
	const sizes = sizeFromProps
		? sizeFromProps
		: // default logic: iterates over defined breakpoints to generate the string: (max-width: Xpx) 2Xw
			Object.entries(breakpoints)
				.map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
				.join(", ");

	return (
		// optional <picture> wrapper for added styling via pictureclassname.
		<picture className={cn(pictureClassName)}>
			<NextImage
				alt={alt || ""}
				className={cn(imgClassName)}
				fill={fill}
				// width/height are only passed if 'fill' is false.
				height={!fill ? height : undefined}
				// enables the blur-up placeholder effect.
				placeholder="blur"
				blurDataURL={placeholderBlur}
				priority={priority}
				// ensures maximum quality (configurable).
				quality={100}
				loading={loading}
				sizes={sizes}
				src={src}
				// width/height are only passed if 'fill' is false.
				width={!fill ? width : undefined}
			/>
		</picture>
	);
};

export { ImageMedia };
