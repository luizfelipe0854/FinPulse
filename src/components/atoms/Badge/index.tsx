import { Text } from "@/components/atoms";

type BadgeProps = {
  label: string;
  variant?: "success" | "danger" | "warning" | "info";
};

export const Badge = ({ label, variant = "info" }: BadgeProps) => {
  const styles = {
    success: "text-[var(--success)]",
    danger: "text-[var(--danger)]",
    warning: "text-[var(--warning)]",
    info: "text-[var(--info)]",
  };

  return (
    <Text variant="badge" as="span" className={`px-2 py-1 ${styles[variant]}`}>
      {label}
    </Text>
  );
};
