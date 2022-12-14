import React from "react";
import classNames from "classnames";
import { PropsWithChildren } from "src/@types/react";

type Props = {
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const Badge: React.FC<Props> = ({
  className,
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200",
        className
      )}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </span>
  );
};
