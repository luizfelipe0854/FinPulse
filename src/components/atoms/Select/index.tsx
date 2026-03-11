import { useState } from "react";

type SelectProps = {
  options: string[];
  placeholder?: string;
};

export const Select = ({
  options,
  placeholder = "Selecione uma opção",
}: SelectProps) => {
  const [value, setValue] = useState("");
  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="w-[200px] h-10 sm:h-11 md:h-12 px-4 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text-body)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
