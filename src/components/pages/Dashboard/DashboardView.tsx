import { ChevronRight } from "lucide-react";
import { Text } from "@/components/atoms";
import { SummaryCards } from "@/components/organisms/SummaryCards";
import { TransactionChart } from "@/components/organisms/TransactionChart";
import { TransactionList } from "@/components/organisms/TransactionList";
import type { ITransaction } from "@/services/firebase/firestore";

type DashboardViewProps = {
  transactions: ITransaction[];
  income: number;
  expenses: number;
  balance: number;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onNavigateToLancamentos: () => void;
};

export const DashboardView = ({
  transactions,
  income,
  expenses,
  balance,
  isLoading,
  onDelete,
  onNavigateToLancamentos,
}: DashboardViewProps) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <SummaryCards balance={balance} income={income} expenses={expenses} />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Text as="h2" variant="title" size="lg">
            <span className="sm:hidden">Transações</span>
            <span className="hidden sm:inline">Transações recentes</span>
          </Text>
          <button
            type="button"
            onClick={onNavigateToLancamentos}
            className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline cursor-pointer shrink-0"
          >
            <span className="sm:hidden">Lançamentos</span>
            <span className="hidden sm:inline">Ver todos os lançamentos</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <TransactionList
          transactions={recentTransactions}
          isLoading={isLoading}
          onDelete={onDelete}
          emptyText="Nenhuma transação ainda"
        />
      </section>

      <TransactionChart transactions={transactions} />
    </div>
  );
};
