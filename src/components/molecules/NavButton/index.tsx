import clsx from "clsx";
import type { PageId } from "@/types";

interface NavButtonProps {
  pageId: PageId;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: (page: PageId) => void;
}

export function NavButton({
  pageId,
  label,
  icon,
  active,
  onClick,
}: NavButtonProps) {
  return (
    <button
      onClick={() => onClick(pageId)}
      className={clsx(
        "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all duration-200 cursor-pointer",
        active
          ? "text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20"
          : "text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--surface)] border border-transparent",
      )}
    >
      <span
        className={clsx(
          "transition-colors",
          active ? "text-[var(--primary)]" : "text-[var(--text-muted)]",
        )}
      >
        {icon}
      </span>
      {label}
      {active && (
        <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-px bg-[var(--primary)] rounded-full" />
      )}
    </button>
  );
}
