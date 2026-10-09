import { LogOut, Moon, Plus, Sun } from "lucide-react";
import FinPulseLogo from "@/assets/FinPulse.svg";
import { Button } from "@/components/atoms";
import { Navbar } from "@/components/organisms/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import type { PageId } from "@/types";

type AppHeaderProps = {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onNewTransaction: () => void;
};

const iconButton =
  "size-9 rounded-full bg-surface shadow-card text-muted hover:text-ink flex items-center justify-center cursor-pointer transition-colors";

export const AppHeader = ({ activePage, onNavigate, onNewTransaction }: AppHeaderProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "light" ? Moon : Sun;
  const themeLabel = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro";

  const nome = user?.name?.trim() || user?.email?.split("@")[0] || "";
  const primeiroNome = nome.split(" ")[0];
  const inicial = primeiroNome.charAt(0).toUpperCase() || "?";

  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img src={FinPulseLogo} alt="" className="hidden md:block size-8" />
          <span className="hidden md:block text-[17px] font-semibold tracking-tight text-ink">
            FinPulse
          </span>

          <span className="md:hidden size-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
            {inicial}
          </span>
          <div className="md:hidden min-w-0">
            <p className="text-[17px] font-semibold tracking-tight text-ink truncate">
              Olá{primeiroNome ? `, ${primeiroNome}` : ""}
            </p>
            <p className="text-[13px] text-muted truncate first-letter:uppercase">{hoje}</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Navbar variant="top" activePage={activePage} onNavigate={onNavigate} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:block">
            <Button
              label="Novo"
              icon={<Plus size={16} strokeWidth={2.5} />}
              size="sm"
              shape="pill"
              onClick={onNewTransaction}
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={iconButton}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <ThemeIcon size={18} />
          </button>
          <button
            type="button"
            onClick={logout}
            className={`${iconButton} hover:text-danger`}
            aria-label="Sair"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
