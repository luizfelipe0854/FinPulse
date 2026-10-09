import { House, ReceiptText, PieChart, Sparkles, Plus } from "lucide-react";
import clsx from "clsx";
import { NavButton } from "@/components/molecules/NavButton";
import type { PageId } from "@/types";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  variant: "top" | "bottom";
  onNewTransaction?: () => void;
}

const navItems: { pageId: PageId; label: string; shortLabel: string; Icon: typeof House }[] = [
  { pageId: "dashboard", label: "Início", shortLabel: "Início", Icon: House },
  { pageId: "lancamentos", label: "Lançamentos", shortLabel: "Extrato", Icon: ReceiptText },
  { pageId: "centros", label: "Centros de custo", shortLabel: "Centros", Icon: PieChart },
  { pageId: "ia", label: "Análise IA", shortLabel: "IA", Icon: Sparkles },
];

export function Navbar({ activePage, onNavigate, variant, onNewTransaction }: NavbarProps) {
  if (variant === "top") {
    return (
      <nav aria-label="Principal" className="flex items-center gap-1 p-1 rounded-full bg-surface-2">
        {navItems.map(({ pageId, label, Icon }) => (
          <NavButton
            key={pageId}
            pageId={pageId}
            label={label}
            icon={<Icon size={16} />}
            active={activePage === pageId}
            onClick={onNavigate}
          />
        ))}
      </nav>
    );
  }

  const [primeiro, segundo, ...resto] = navItems;

  const renderTab = ({ pageId, label, shortLabel, Icon }: (typeof navItems)[number]) => (
    <NavButton
      key={pageId}
      variant="tab"
      pageId={pageId}
      label={label}
      shortLabel={shortLabel}
      icon={<Icon size={22} strokeWidth={activePage === pageId ? 2.4 : 1.9} />}
      active={activePage === pageId}
      onClick={onNavigate}
    />
  );

  return (
    <nav
      aria-label="Principal"
      className="md:hidden fixed bottom-0 inset-x-0 z-[55] bg-surface border-t border-line pb-[env(safe-area-inset-bottom)] [transform:translateZ(0)]"
    >
      <div className="flex items-center h-16 px-2">
        {renderTab(primeiro)}
        {renderTab(segundo)}

        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={onNewTransaction}
            aria-label="Novo lançamento"
            className={clsx(
              "size-14 -mt-7 rounded-full bg-primary text-primary-ink flex items-center justify-center cursor-pointer",
              "shadow-[0_8px_20px_-4px_var(--primary)] ring-4 ring-bg active:scale-95 transition-transform",
            )}
          >
            <Plus size={26} strokeWidth={2.5} />
          </button>
        </div>

        {resto.map(renderTab)}
      </div>
    </nav>
  );
}
