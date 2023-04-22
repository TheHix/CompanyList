import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (callback: () => Promise<any>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		function handleScroll() {
			if (!container || isLoading) return;

			if (
				container.scrollTop + container.clientHeight >=
				container.scrollHeight
			) {
				setIsLoading(true);
			}
		}

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [isLoading]);

	useEffect(() => {
		if (!isLoading) return;

		callback().finally(() => {
			setIsLoading(false);
		});
	}, [callback, isLoading]);

	return { containerRef, isLoading };
};

export default useInfiniteScroll;
