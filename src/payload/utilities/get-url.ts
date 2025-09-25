import canUseDOM from "@/payload/utilities/can-use-dom";

const getServerSideURL = () => {
	return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
};

const getClientSideURL = () => {
	if (canUseDOM) {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ""}`;
	}

	return process.env.NEXT_PUBLIC_SERVER_URL || "";
};

export { getClientSideURL, getServerSideURL };
