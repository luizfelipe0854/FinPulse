type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = "button",
  label,
  icon,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const base = `px-4 border-none rounded-lg flex items-center justify-center gap-2 text-[var(--surface)] cursor-pointer`;

  const styles = {
    primary: "bg-[var(--primary)]  hover:bg-[var(--primary)]/90",

    secondary: "bg-[var(--danger)] hover:bg-[var(--danger)]/90",
  };

  return (
    <button
      type={type}
      className={`${base} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
};
