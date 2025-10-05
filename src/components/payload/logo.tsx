import Image from "next/image";

import logo from "@/assets/s3-logo.png";

const Logo = () => {
	<div>
		<Image src={logo} alt="Superior Software Solutions Logo" />
	</div>;
};

export { Logo as default };
