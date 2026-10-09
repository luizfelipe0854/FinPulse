import clsx from "clsx";

type BadgeProps = {
  label: string;
  variant?: "success" | "danger" | "warning" | "info";
};

const styles = {
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
  warning: "bg-warning/15 text-warning",
  info: "bg-primary/10 text-primary",
};

export const Badge = ({ label, variant = "info" }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center h-6 px-2.5 rounded-full text-xs font-semibold",
        styles[variant],
      )}
    >
      {label}
    </span>
  );
};
