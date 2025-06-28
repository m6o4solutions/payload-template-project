import { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<div>
			{/* header goes here */}

			{children}

			{/* footer goes here */}
		</div>
	);
};

export default ProtectedLayout;
