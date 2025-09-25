import { isAuthenticated } from "@/payload/access/access-control";

import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: isAuthenticated,
		create: isAuthenticated,
		delete: isAuthenticated,
		read: isAuthenticated,
		update: isAuthenticated,
	},
	admin: {
		defaultColumns: ["photo", "name", "email", "createdAt", "updatedAt"],
		useAsTitle: "name",
	},
	labels: {
		singular: "User",
		plural: "Users",
	},
	auth: true,
	fields: [
		{
			name: "name",
			type: "text",
			label: "Name",
			required: true,
		},
		{
			name: "photo",
			type: "upload",
			label: "Photo",
			relationTo: "media",
			admin: {
				position: "sidebar",
			},
		},
	],
};

export { Users };
