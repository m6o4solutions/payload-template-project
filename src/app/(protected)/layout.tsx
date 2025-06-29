import { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

export default ProtectedLayout;
