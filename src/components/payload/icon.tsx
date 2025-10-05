import Image from "next/image";

import logo from "@/assets/s3-logo.png";

const Icon = () => {
	<div>
		<Image src={logo} alt="Superior Software Solutions Logo" />
	</div>;
};

export { Icon as default };
