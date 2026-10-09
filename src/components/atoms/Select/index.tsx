import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  look?: "field" | "chip";
};

export const Select = ({ look = "field", className, children, ...props }: SelectProps) => {
  return (
    <div className={clsx("relative", look === "field" && "w-full", className)}>
      <select
        {...props}
        className={clsx(
          "w-full appearance-none cursor-pointer outline-none transition-colors text-ink",
          "border border-transparent focus:border-primary",
          look === "field" && "h-12 pl-4 pr-10 rounded-xl text-[15px] bg-surface-2 focus:bg-surface",
          look === "chip" && "h-9 pl-3.5 pr-8 rounded-full text-sm font-medium bg-surface shadow-card",
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className={clsx(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted",
          look === "field" ? "right-4" : "right-3",
        )}
      />
    </div>
  );
};
