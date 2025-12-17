import { useEffect, useState } from "react";
import { breakpoints } from "../browser/breakpoints";
import { isBrowser } from "../browser/isBrowser";

export type MediaQueryKeys = keyof typeof breakpoints;

const getMatches = (query: string, param: MediaQueryKeys): boolean => {
  if (isBrowser) {
    const isIpad = /(iPad).*OS\s([\d_]+)/.test(navigator.userAgent);
    if (
      param === "tabletMax" &&
      (isIpad ||
        ((window.navigator.platform === "MacIntel" ||
          window.navigator.userAgent.includes("Mac")) &&
          navigator.maxTouchPoints > 1))
    ) {
      return true;
    }

    return window.matchMedia(query).matches;
  }
  return false;
};

const changeListenerMedia = (
  matchMedia: MediaQueryList,
  handleChange: () => void
) => {
  if ("addEventListener" in matchMedia) {
    matchMedia.addEventListener("change", handleChange);
  } else {
    window.addEventListener("resize", handleChange);
  }
};

const removeChangeListenerMedia = (
  matchMedia: MediaQueryList,
  handleChange: () => void
) => {
  if ("addEventListener" in matchMedia) {
    matchMedia.removeEventListener("change", handleChange);
  } else {
    window.removeEventListener("resize", handleChange);
  }
};

export const useMediaQuery = (param: MediaQueryKeys): boolean => {
  const query = breakpoints[param];

  const [matches, setMatches] = useState<boolean>(getMatches(query, param));

  function handleChange() {
    setMatches(getMatches(query, param));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if ("addEventListener" in matchMedia) {
      matchMedia.addEventListener("change", handleChange);
    } else {
      window.addEventListener("resize", handleChange);
    }

    return () => {
      if ("addEventListener" in matchMedia) {
        matchMedia.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener("resize", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

export const useMediaQueryAll = (params: MediaQueryKeys[]) => {
  function getAllMedia() {
    return params
      .map((query) => getMatches(breakpoints[query], query))
      .reduce(
        (o, val, index) => ({ ...o, [params[index]]: val }),
        {}
      ) as Record<MediaQueryKeys, boolean>;
  }

  const [matches, setMatches] = useState<Record<MediaQueryKeys, boolean>>(
    getAllMedia()
  );

  function handleChange() {
    setMatches(getAllMedia());
  }

  useEffect(() => {
    const allMatchMedia = params.map((val) =>
      window.matchMedia(breakpoints[val])
    );

    handleChange();

    allMatchMedia.forEach((media) => {
      changeListenerMedia(media, handleChange);
    });

    return () => {
      allMatchMedia.forEach((media) => {
        removeChangeListenerMedia(media, handleChange);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return matches;
};
