const isBrowser =
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  typeof document !== "undefined";

export { isBrowser };
