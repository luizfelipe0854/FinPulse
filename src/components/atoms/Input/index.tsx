import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const inputClass = clsx(
  "w-full h-12 px-4 rounded-xl text-[15px] text-ink placeholder:text-muted",
  "bg-surface-2 border border-transparent outline-none transition-colors",
  "focus:border-primary focus:bg-surface",
);

export const Input = ({ className, ...props }: InputProps) => {
  return <input {...props} className={clsx(inputClass, className)} />;
};
