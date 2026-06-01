import { Text } from "@/components/atoms";

type SummaryCardProps = {
  icon: React.ReactNode;
  iconBgColor: string;
  label: string;
  value: string;
  valueColor?: string;
};

export const SummaryCard = ({
  icon,
  iconBgColor,
  label,
  value,
  valueColor = "text-[var(--text-title)]",
}: SummaryCardProps) => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBgColor}`}
      >
        {icon}
      </div>
      <div>
        <Text as="p" variant="muted" size="xs">
          {label}
        </Text>
        <Text as="p" variant="title" size="lg" className={valueColor}>
          {value}
        </Text>
      </div>
    </div>
  );
};
