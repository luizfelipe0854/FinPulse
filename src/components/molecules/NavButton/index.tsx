import clsx from "clsx";
import type { PageId } from "@/types";

interface NavButtonProps {
  pageId: PageId;
  label: string;
  shortLabel?: string;
  icon: React.ReactNode;
  active: boolean;
  variant?: "top" | "tab";
  onClick: (page: PageId) => void;
}

export function NavButton({
  pageId,
  label,
  shortLabel,
  icon,
  active,
  variant = "top",
  onClick,
}: NavButtonProps) {
  if (variant === "tab") {
    return (
      <button
        type="button"
        onClick={() => onClick(pageId)}
        aria-current={active ? "page" : undefined}
        className={clsx(
          "flex-1 flex flex-col items-center justify-center gap-1 h-full cursor-pointer transition-colors",
          active ? "text-primary" : "text-muted",
        )}
      >
        {icon}
        <span className="text-[11px] font-medium leading-none">{shortLabel ?? label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick(pageId)}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all duration-200",
        active ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink",
      )}
    >
      <span className={clsx(active ? "text-primary" : "text-muted")}>{icon}</span>
      {label}
    </button>
  );
}
