import React from "react";
import Image from "next/image";

import { getPayload } from "payload";
import config from "@payload-config";

import { Media } from "@/payload-types";

const Icon = async () => {
	const payload = await getPayload({ config: config });

	const branding = await payload.findGlobal({ slug: "branding" });

	const icon = branding.organizationIcon as Media;

	return (
		<>
			<Image src={icon.url || ""} alt={icon.alt} width={32} height={32} priority />
		</>
	);
};

export { Icon };
