import type { Access } from "payload";
import type { User } from "@/payload-types";

const isAuthenticated: Access<User> = ({ req: { user } }) => {
	// return true if user is authenticated, false if not
	return Boolean(user);
};

const isPublic: Access = () => true;

const isRestricted: Access = () => false;

export { isAuthenticated, isPublic, isRestricted };
