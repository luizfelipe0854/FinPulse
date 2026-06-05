import { useState } from "react";
import { Plus, FileDown } from "lucide-react";
import { Button, Text } from "@/components/atoms";
import { FilterBar, type TipoFiltro } from "@/components/molecules/FilterBar";
import { TransactionList } from "@/components/organisms/TransactionList";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";
import { exportTransactionsToExcel } from "@/utils/exportTransactions";

type LancamentosViewProps = {
  transactions: ITransaction[];
  centros: ICentro[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onNewTransaction: () => void;
};

export const LancamentosView = ({
  transactions,
  centros,
  isLoading,
  onDelete,
  onNewTransaction,
}: LancamentosViewProps) => {
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltro>("todos");
  const [mesFiltro, setMesFiltro] = useState("todos");
  const [centroFiltro, setCentroFiltro] = useState("todos");

  const mesesDisponiveis: string[] = [];
  transactions.forEach((t) => {
    const mesChave = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`;
    if (!mesesDisponiveis.includes(mesChave)) {
      mesesDisponiveis.push(mesChave);
    }
  });
  mesesDisponiveis.sort((a, b) => b.localeCompare(a));

  const transacoesFiltradas = transactions.filter((t) => {
    const mesChave = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`;
    const passaMes = mesFiltro === "todos" || mesChave === mesFiltro;
    const passaTipo = tipoFiltro === "todos" || t.type === tipoFiltro;
    const passaCentro = centroFiltro === "todos" || t.category === centroFiltro;
    return passaMes && passaTipo && passaCentro;
  });

  const algumFiltroAtivo =
    tipoFiltro !== "todos" || mesFiltro !== "todos" || centroFiltro !== "todos";

  function handleClearFilters() {
    setTipoFiltro("todos");
    setMesFiltro("todos");
    setCentroFiltro("todos");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text as="h2" variant="title" size="lg">
          <span className="sm:hidden">Lançamentos</span>
          <span className="hidden sm:inline">Todos os lançamentos</span>
        </Text>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => exportTransactionsToExcel(transacoesFiltradas)}
            className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            aria-label="Exportar transações"
          >
            <FileDown size={20} />
          </button>
          {/* Mobile: apenas ícone */}
          <button
            type="button"
            onClick={onNewTransaction}
            className="sm:hidden h-9 w-9 rounded-lg bg-[var(--primary)] flex items-center justify-center text-[var(--surface)] cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
            aria-label="Nova transação"
          >
            <Plus size={18} />
          </button>
          {/* Desktop: botão completo */}
          <Button
            label="Nova transação"
            icon={<Plus size={16} />}
            variant="primary"
            className="hidden sm:flex h-9 text-sm"
            onClick={onNewTransaction}
          />
        </div>
      </div>

      <FilterBar
        tipoFiltro={tipoFiltro}
        onTipoChange={setTipoFiltro}
        mesFiltro={mesFiltro}
        onMesChange={setMesFiltro}
        centroFiltro={centroFiltro}
        onCentroChange={setCentroFiltro}
        mesesDisponiveis={mesesDisponiveis}
        centros={centros}
        algumFiltroAtivo={algumFiltroAtivo}
        onClear={handleClearFilters}
      />

      <TransactionList
        transactions={transacoesFiltradas}
        isLoading={isLoading}
        onDelete={onDelete}
        emptyText="Nenhum lançamento encontrado"
      />
    </div>
  );
};
