import classNames from "classnames";
import { type PropsWithChildren } from "react";

import styles from "./Container.module.scss";
import { type IContainerProps } from "./types";

export const Container = ({
  as: Tag = "div",
  size = "medium",
  children,
  className,
  withoutPaddingsMobile,
}: PropsWithChildren<IContainerProps>) => {
  return (
    <Tag
      className={classNames(
        styles.container,
        styles[`container-${size}`],
        className,
        {
          [styles.withoutPaddingsMobile]: withoutPaddingsMobile,
        }
      )}
    >
      {children}
    </Tag>
  );
};
