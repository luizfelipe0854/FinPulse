import clsx from "clsx";
import type { ReactNode } from "react";

type IconTileProps = {
  children: ReactNode;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-9 rounded-xl text-base",
  md: "size-11 rounded-2xl text-xl",
  lg: "size-14 rounded-2xl text-2xl",
};

export const IconTile = ({ children, color, size = "md", className }: IconTileProps) => {
  return (
    <span
      className={clsx(
        "flex items-center justify-center shrink-0 leading-none",
        !color && "bg-surface-2 text-muted",
        sizes[size],
        className,
      )}
      style={
        color
          ? { backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`, color }
          : undefined
      }
    >
      {children}
    </span>
  );
};
