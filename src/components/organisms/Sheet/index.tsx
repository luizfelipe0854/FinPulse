import { useEffect, useId, type ReactNode } from "react";
import { X } from "lucide-react";

type SheetProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export const Sheet = ({ title, onClose, children }: SheetProps) => {
  const titleId = useId();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="animate-fade fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet w-full sm:max-w-md max-h-[92dvh] overflow-y-auto bg-surface rounded-t-[28px] sm:rounded-[28px] shadow-float px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6"
      >
        <div className="sm:hidden mx-auto mb-3 h-1.5 w-10 rounded-full bg-line" />

        <div className="flex items-center justify-between mb-5">
          <h3 id={titleId} className="text-lg font-semibold tracking-tight text-ink">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-surface-2 text-muted hover:text-ink flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
