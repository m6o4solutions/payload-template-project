import { unstable_cache } from "next/cache";

import { getPayload } from "payload";

import configPromise from "@payload-config";

import type { Config } from "src/payload-types";

type Collection = keyof Config["collections"];

const getDocument = async (collection: Collection, slug: string, depth = 0) => {
	const payload = await getPayload({ config: configPromise });

	const page = await payload.find({
		collection,
		depth,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return page.docs[0];
};

// returns a unstable_cache function mapped with the cache tag for the slug
const getCachedDocument = (collection: Collection, slug: string) =>
	unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
		tags: [`${collection}_${slug}`],
	});

export { getCachedDocument };
