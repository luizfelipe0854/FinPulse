import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export const Card = ({ children, className, as: Tag = "div" }: CardProps) => {
  return (
    <Tag className={clsx("bg-surface rounded-3xl shadow-card", className)}>
      {children}
    </Tag>
  );
};
