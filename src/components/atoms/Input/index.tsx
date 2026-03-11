import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="w-full h-10 sm:h-11 md:h-12 px-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] cursor-pointer rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition"
    />
  );
};
