type CheckboxProps = {
  label: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
};
export const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2 text-[var(--text-body)] cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label}
    </label>
  );
};
