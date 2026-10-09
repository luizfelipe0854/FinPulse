import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import FinPulseLogo from "@/assets/FinPulse.svg";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center px-4 py-10 sm:justify-center">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <Link to="/" aria-label="Voltar para o início">
            <img src={FinPulseLogo} alt="FinPulse" className="size-14" />
          </Link>
          <h1 className="text-[32px] leading-[1.1] font-bold tracking-tight text-ink">
            Seu dinheiro,
            <br />
            <span className="text-primary">com clareza.</span>
          </h1>
        </div>

        <div className="bg-surface rounded-[28px] shadow-card p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};
