import type { ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  as?: "p" | "span" | "h1" | "h2" | "h3";
  variant?: "title" | "subtitle" | "body" | "muted" | "badge";
  moreProps?: string;
};

export const Text = ({
  children,
  as: Tag = "p",
  variant = "body",
  moreProps,
}: TextProps) => {
  const styles = {
    title: "text-lg font-bold text-[var(--text-title)]",
    subtitle: "text-sm text-[var(--text-body)]",
    body: "text-sm text-[var(--text-body)]",
    muted: "text-xs text-[var(--text-muted)]",
    badge: "text-xs",
  };

  return (
    <Tag className={styles[variant] + (moreProps ? ` ${moreProps}` : "")}>
      {children}
    </Tag>
  );
};
