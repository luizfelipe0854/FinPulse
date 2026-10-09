import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SummaryCards, type Periodo } from "@/components/organisms/SummaryCards";
import { SpendingByCentro } from "@/components/organisms/SpendingByCentro";
import { TransactionChart } from "@/components/organisms/TransactionChart";
import { TransactionList } from "@/components/organisms/TransactionList";
import { monthKey } from "@/utils/formatters";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";

type DashboardViewProps = {
  transactions: ITransaction[];
  centros: ICentro[];
  income: number;
  expenses: number;
  balance: number;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onNavigateToLancamentos: () => void;
  onNavigateToCentros: () => void;
  onNewTransaction: () => void;
};

export const DashboardView = ({
  transactions,
  centros,
  income,
  expenses,
  balance,
  isLoading,
  onDelete,
  onNavigateToLancamentos,
  onNavigateToCentros,
  onNewTransaction,
}: DashboardViewProps) => {
  const [periodo, setPeriodo] = useState<Periodo>("mes");

  const mesAtual = monthKey(new Date());
  const doMes = transactions.filter((t) => monthKey(t.date) === mesAtual);
  const entradasMes = doMes.filter((t) => t.type === "entrada").reduce((a, t) => a + t.amount, 0);
  const saidasMes = doMes.filter((t) => t.type === "saida").reduce((a, t) => a + t.amount, 0);

  const resumo =
    periodo === "mes"
      ? { balance: entradasMes - saidasMes, income: entradasMes, expenses: saidasMes }
      : { balance, income, expenses };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col gap-7">
      <SummaryCards {...resumo} periodo={periodo} onPeriodoChange={setPeriodo} />

      <SpendingByCentro
        transactions={periodo === "mes" ? doMes : transactions}
        centros={centros}
        onSeeAll={onNavigateToCentros}
      />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">Recentes</h2>
          {transactions.length > 0 && (
            <button
              type="button"
              onClick={onNavigateToLancamentos}
              className="flex items-center gap-0.5 text-sm font-medium text-primary cursor-pointer hover:opacity-80"
            >
              Extrato
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        <TransactionList
          transactions={recentTransactions}
          centros={centros}
          isLoading={isLoading}
          onDelete={onDelete}
          emptyText="Nenhuma transação ainda"
          emptyDescription="Toque no + para registrar sua primeira entrada ou saída."
        />
      </section>

      {transactions.length > 0 && <TransactionChart transactions={transactions} />}

      {!isLoading && transactions.length === 0 && (
        <button
          type="button"
          onClick={onNewTransaction}
          className="hidden md:block mx-auto text-sm font-medium text-primary cursor-pointer hover:opacity-80"
        >
          Registrar primeiro lançamento
        </button>
      )}
    </div>
  );
};
