import React from "react";
import Image from "next/image";

import { getPayload } from "payload";
import config from "@payload-config";

import { Media } from "@/payload-types";

const Logo = async () => {
	const payload = await getPayload({ config: config });

	const branding = await payload.findGlobal({ slug: "branding" });

	const logo = branding.organizationLogo as Media;

	return (
		<>
			<Image
				src={logo?.url || ""}
				alt={logo?.alt || "logo"}
				width={100}
				height={100}
				priority
			/>
		</>
	);
};

export { Logo };
