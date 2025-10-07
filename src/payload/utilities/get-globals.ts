import { unstable_cache } from "next/cache";

import config from "@payload-config";
import { getPayload } from "payload";

import type { Config } from "@/payload-types";

type Global = keyof Config["globals"];

/**
 * fetches a single global document from Payload by slug.
 * @param {Global} slug - the slug of the global document.
 * @param {number} [depth=0] - the depth for relationship population.
 * @returns {Promise<any>} the global document object.
 */
const getGlobal = async (slug: Global, depth = 0) => {
	const payload = await getPayload({ config: config });

	const global = await payload.findGlobal({
		slug,
		depth,
	});

	return global;
};

/**
 * returns an unstable_cache function mapped with a cache tag for the global's slug.
 * the returned function should be called to execute the query, e.g., `await getCachedGlobal('header')()`.
 * @param {Global} slug - the slug of the global.
 * @param {number} [depth=0] - the depth for relationship population.
 * @returns {() => Promise<any>} a memoized function that returns the global document.
 */
const getCachedGlobal = (slug: Global, depth = 0) =>
	unstable_cache(async () => getGlobal(slug, depth), [slug], {
		tags: [`global_${slug}`],
	});

export { getGlobal, getCachedGlobal };
