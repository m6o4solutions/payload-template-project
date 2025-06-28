import type { CollectionConfig } from "payload";

const Customers: CollectionConfig = {
	slug: "customers",
	labels: {
		singular: "Customer",
		plural: "Customers",
	},
	fields: [
		{
			name: "clerkUserId",
			type: "text",
			label: "Clerk User ID",
			unique: true,
			required: true,
		},
		{
			name: "email",
			type: "email",
			label: "Email",
			unique: true,
			required: true,
		},
		{
			name: "firstName",
			type: "text",
			label: "First Name",
		},
		{
			name: "lastName",
			type: "text",
			label: "Last Name",
		},
		{
			name: "imageUrl",
			type: "text",
			label: "Image URL",
		},
	],
};

export { Customers };
