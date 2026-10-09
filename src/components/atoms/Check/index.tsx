type CheckboxProps = {
  label: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
};

export const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2.5 text-sm text-body cursor-pointer select-none">
      <input
        type="checkbox"
        className="size-5 rounded-md accent-[var(--primary)] cursor-pointer"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label}
    </label>
  );
};
