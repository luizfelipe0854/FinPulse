import type { ReactNode, ElementType } from "react";

type TextProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: "title" | "subtitle" | "body" | "muted" | "badge";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
};

export const Text = ({
  children,
  as: Tag = "p",
  variant = "body",
  size = "md",
  className = "",
}: TextProps) => {
  const variants = {
    title: "font-bold text-[var(--text-title)]",
    subtitle: "text-[var(--text-body)]",
    body: "text-[var(--text-body)]",
    muted: "text-[var(--text-muted)]",
    badge: "text-xs uppercase",
  };

  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };

  return (
    <Tag className={`${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
};