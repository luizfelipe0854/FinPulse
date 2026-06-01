import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { formatCurrency } from "@/utils/formatters";

type SummaryCardsProps = {
  balance: number;
  income: number;
  expenses: number;
};

export const SummaryCards = ({ balance, income, expenses }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <SummaryCard
        icon={<Wallet size={20} className="text-[var(--primary)]" />}
        iconBgColor="bg-[var(--primary)]/10"
        label="Saldo"
        value={formatCurrency(balance)}
        valueColor={balance < 0 ? "text-[var(--danger)]" : "text-[var(--text-title)]"}
      />
      <SummaryCard
        icon={<TrendingUp size={20} className="text-[var(--success)]" />}
        iconBgColor="bg-[var(--success)]/10"
        label="Entradas"
        value={formatCurrency(income)}
        valueColor="text-[var(--success)]"
      />
      <SummaryCard
        icon={<TrendingDown size={20} className="text-[var(--danger)]" />}
        iconBgColor="bg-[var(--danger)]/10"
        label="Saídas"
        value={formatCurrency(expenses)}
        valueColor="text-[var(--danger)]"
      />
    </div>
  );
};
