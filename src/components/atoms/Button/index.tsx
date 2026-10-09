import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill";
  moreProps?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: "bg-primary text-primary-ink hover:brightness-110",
  secondary: "bg-surface-2 text-ink hover:bg-line",
  danger: "bg-danger/10 text-danger hover:bg-danger/15",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const shapes = {
  rounded: { sm: "rounded-xl", md: "rounded-xl", lg: "rounded-2xl" },
  pill: { sm: "rounded-full", md: "rounded-full", lg: "rounded-full" },
};

export const Button = ({
  type = "button",
  label,
  icon,
  onClick,
  variant = "primary",
  size = "md",
  shape = "rounded",
  moreProps,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap",
        "transition-[filter,background-color,transform] duration-150 active:scale-[0.98] cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        shapes[shape][size],
        moreProps,
        className,
      )}
      {...rest}
    >
      {icon}
      {label}
    </button>
  );
};
