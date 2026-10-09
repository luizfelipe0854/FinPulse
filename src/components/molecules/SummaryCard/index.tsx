import clsx from "clsx";

type SummaryCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "danger";
};

export const SummaryCard = ({ icon, label, value, tone }: SummaryCardProps) => {
  return (
    <div className="flex-1 min-w-0 rounded-2xl bg-surface-2 p-3.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            "size-6 rounded-full flex items-center justify-center",
            tone === "success" ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
          )}
        >
          {icon}
        </span>
        <span className="text-[13px] font-medium text-muted">{label}</span>
      </div>
      <span className="money text-lg font-semibold text-ink truncate">{value}</span>
    </div>
  );
};
