import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/atoms";

type PageTitleProps = {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void; alwaysVisible?: boolean };
  extra?: ReactNode;
};

export const PageTitle = ({ title, subtitle, action, extra }: PageTitleProps) => {
  return (
    <div className="flex items-end justify-between gap-3 px-1">
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-[28px] leading-tight font-bold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {extra}
        {action && (
          <div className={action.alwaysVisible ? "block" : "hidden md:block"}>
            <Button
              label={action.label}
              icon={<Plus size={16} strokeWidth={2.5} />}
              size="sm"
              shape="pill"
              onClick={action.onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
