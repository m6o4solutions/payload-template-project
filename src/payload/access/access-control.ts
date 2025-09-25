import type { Access, AccessArgs } from "payload";

import type { User } from "@/payload-types";

type IsAuthenticated = (args: AccessArgs<User>) => boolean;

const isAuthenticated: IsAuthenticated = ({ req: { user } }) => {
	return Boolean(user);
};

const isAuthenticatedOrPublished: Access = ({ req: { user } }) => {
	if (user) {
		return true;
	}

	return {
		_status: {
			equals: "published",
		},
	};
};

const isPublic: Access = () => true;

export { isAuthenticated, isAuthenticatedOrPublished, isPublic };
