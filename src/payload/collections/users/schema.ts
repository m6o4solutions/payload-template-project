import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
	slug: "users",
	labels: {
		singular: "User",
		plural: "Users",
	},
	auth: true,
	fields: [
		/* email added by default. add more fields as needed */
	],
};

export { Users };
