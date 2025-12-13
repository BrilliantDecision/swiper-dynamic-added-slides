import { type ElementType } from "react";

export type TSize = "large" | "medium" | "small" | "extra-small";

export interface IContainerProps {
  as?: ElementType;
  size?: TSize;
  className?: string;
  withoutPaddingsMobile?: boolean;
}
