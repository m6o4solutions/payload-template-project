import { unstable_cache } from "next/cache";

import { getPayload } from "payload";

import configPromise from "@payload-config";

import type { Config } from "src/payload-types";

type Global = keyof Config["globals"];

const getGlobal = async (slug: Global, depth = 0) => {
	const payload = await getPayload({ config: configPromise });

	const global = await payload.findGlobal({
		slug,
		depth,
	});

	return global;
};

// returns a unstable_cache function mapped with the cache tag for the slug
const getCachedGlobal = (slug: Global, depth = 0) =>
	unstable_cache(async () => getGlobal(slug, depth), [slug], {
		tags: [`global_${slug}`],
	});

export { getCachedGlobal };
