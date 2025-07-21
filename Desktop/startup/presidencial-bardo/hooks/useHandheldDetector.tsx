import { useEffect, useState } from "react";

const useHandheldDetector = (options?: {
	customBreakpoint?: number;
}): boolean => {
	const [isHandheld, setIsHandheld] = useState<boolean>(false);

	useEffect(() => {
		// Ensure this code only runs on the client
		if (typeof window === "undefined") {
			return;
		}

		const mediaQuery = window.matchMedia(
			`(max-width: ${options?.customBreakpoint ? options.customBreakpoint : "1023"}px)`,
		);

		const handleMatch = (e: MediaQueryList | MediaQueryListEvent) => {
			setIsHandheld(e.matches);
		};

		// Set the initial state
		handleMatch(mediaQuery);

		// Listen for changes
		mediaQuery.addEventListener("change", handleMatch);

		// Cleanup listener on unmount
		return () => {
			mediaQuery.removeEventListener("change", handleMatch);
		};
	}, [options?.customBreakpoint]); // Re-run if breakpoint changes

	return isHandheld;
};

export default useHandheldDetector;
