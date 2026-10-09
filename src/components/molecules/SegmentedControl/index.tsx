import clsx from "clsx";

type Option<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  tone?: "surface" | "success" | "danger";
  className?: string;
};

const activeTone = {
  surface: "bg-surface text-ink shadow-card",
  success: "bg-success text-white",
  danger: "bg-danger text-white",
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  tone = "surface",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={clsx("flex p-1 gap-1 rounded-full bg-surface-2", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={clsx(
              "flex-1 h-8 px-3.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200",
              active ? activeTone[tone] : "text-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
