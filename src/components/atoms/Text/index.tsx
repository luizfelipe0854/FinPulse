import type { ReactNode, ElementType } from "react";
import clsx from "clsx";

type TextProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: "title" | "subtitle" | "body" | "muted" | "badge" | "eyebrow";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
};

const variants = {
  title: "font-semibold tracking-tight text-ink",
  subtitle: "font-medium text-body",
  body: "text-body",
  muted: "text-muted",
  badge: "text-xs font-semibold",
  eyebrow: "text-xs font-semibold uppercase tracking-wider text-muted",
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-[15px]",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

export const Text = ({
  children,
  as: Tag = "p",
  variant = "body",
  size = "md",
  className = "",
}: TextProps) => {
  return (
    <Tag className={clsx(variants[variant], sizes[size], className)}>
      {children}
    </Tag>
  );
};
