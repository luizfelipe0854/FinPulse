import { LogOut } from "lucide-react";
import FinPulseLogo from "@/assets/FinPulse.svg";
import { Text } from "@/components/atoms";
import { useAuth } from "@/hooks/useAuth";

export const AppHeader = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[var(--surface)] border-b border-[var(--border)] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={FinPulseLogo} alt="FinPulse" className="w-7 h-7" />
        <Text as="span" variant="title" size="sm">
          FinPulse
        </Text>
      </div>

      <div className="flex items-center gap-3">
        <Text as="span" variant="muted" size="xs" className="hidden sm:block">
          {user?.name ?? user?.email}
        </Text>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span className="hidden sm:block text-xs">Sair</span>
        </button>
      </div>
    </div>
  );
};
