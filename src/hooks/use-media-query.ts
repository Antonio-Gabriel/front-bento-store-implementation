import { useLayoutEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const mediaMatch = window?.matchMedia(query);
      
      setMatches(mediaMatch.matches);

      const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

      mediaMatch.addEventListener("change", handler);

      return () => mediaMatch.removeEventListener("change", handler);
    }
  }, [query]);

  return matches;
};