import Link from "next/link";

import { Button } from "@/ui/button";
import { Container } from "@/components/container";

const Dashboard = () => {
	return (
		<Container>
			<article>
				<section className="pt-36 pb-36">
					<h1 className="font-header text-4xl font-bold tracking-wide text-sky-800">Dashboard Page</h1>

					<p className="my-5">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, cum reprehenderit. Doloremque
						corrupti aliquid nihil magnam impedit, quisquam soluta? Expedita et dolorum quo laudantium odio esse,
						distinctio nulla hic ea.
					</p>

					<Button className="rounded-lg font-semibold uppercase" variant="default" asChild>
						<Link href="/">Homepage</Link>
					</Button>
				</section>
			</article>
		</Container>
	);
};

export default Dashboard;
