import { LayoutDashboard, PlusCircle, Target, Sparkles } from "lucide-react";
import { NavButton } from "@/components/molecules/NavButton";
import type { PageId } from "@/types";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { pageId: PageId; label: string; icon: React.ReactNode }[] = [
  {
    pageId: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={15} />,
  },
  {
    pageId: "lancamentos",
    label: "Lançamentos",
    icon: <PlusCircle size={15} />,
  },
  { 
    pageId: "centros", 
    label: "Centro de Custos", 
    icon: <Target size={15} /> 
  },
  { 
    pageId: "ia", 
    label: "Análise IA", 
    icon: <Sparkles size={15} /> 
  },
];

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        <nav className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
          {navItems.map((item) => (
            <NavButton
              key={item.pageId}
              pageId={item.pageId}
              label={item.label}
              icon={item.icon}
              active={activePage === item.pageId}
              onClick={onNavigate}
            />
          ))}
        </nav>

        <span className="text-xs text-[var(--text-muted)] font-mono hidden md:block shrink-0">
          {today}
        </span>
      </div>
    </header>
  );
}
