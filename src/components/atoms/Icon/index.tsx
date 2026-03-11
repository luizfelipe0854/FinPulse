import type { LucideIcon } from "lucide-react";

type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
};

export const Icon = ({ icon: IconEl, size = 18, className = "" }: IconProps) => {
  return <IconEl size={size} className={className} />;
}

