"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useDebounce } from "@/payload/utilities/use-debounce";

/**
 * a client-side search component that debounces user input
 * and updates the Next.js router query parameter for search results.
 */
const Search = () => {
	const [value, setValue] = useState("");
	const router = useRouter();

	// debounce the input value to limit the frequency of route changes
	const debouncedValue = useDebounce(value);

	useEffect(() => {
		// navigate to the search route with the query parameter
		router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
	}, [debouncedValue, router]);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<Input
					id="search"
					onChange={(event) => {
						setValue(event.target.value);
					}}
					placeholder="Search"
				/>
				<button type="submit" className="sr-only">
					submit
				</button>
			</form>
		</div>
	);
};

export { Search };
