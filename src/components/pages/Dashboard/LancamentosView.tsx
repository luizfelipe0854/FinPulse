import { useState } from "react";
import { FileDown } from "lucide-react";
import { FilterBar, type TipoFiltro } from "@/components/molecules/FilterBar";
import { TransactionList } from "@/components/organisms/TransactionList";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";
import { exportTransactionsToExcel } from "@/utils/exportTransactions";
import { formatCurrency } from "@/utils/formatters";
import { PageTitle } from "./PageTitle";

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

  const entrou = transacoesFiltradas
    .filter((t) => t.type === "entrada")
    .reduce((a, t) => a + t.amount, 0);
  const saiu = transacoesFiltradas
    .filter((t) => t.type === "saida")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="Extrato"
        action={{ label: "Novo lançamento", onClick: onNewTransaction }}
        extra={
          <button
            type="button"
            onClick={() => exportTransactionsToExcel(transacoesFiltradas)}
            className="size-10 rounded-full bg-surface shadow-card text-muted hover:text-primary flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Exportar para Excel"
            title="Exportar para Excel"
          >
            <FileDown size={18} />
          </button>
        }
      />

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

      {!isLoading && transacoesFiltradas.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface shadow-card px-4 py-3">
            <p className="text-[13px] font-medium text-muted">Entrou</p>
            <p className="money text-lg font-semibold text-success">{formatCurrency(entrou)}</p>
          </div>
          <div className="rounded-2xl bg-surface shadow-card px-4 py-3">
            <p className="text-[13px] font-medium text-muted">Saiu</p>
            <p className="money text-lg font-semibold text-ink">{formatCurrency(saiu)}</p>
          </div>
        </div>
      )}

      <TransactionList
        transactions={transacoesFiltradas}
        centros={centros}
        isLoading={isLoading}
        onDelete={onDelete}
        groupByDay
        emptyText="Nenhum lançamento encontrado"
        emptyDescription={
          algumFiltroAtivo ? "Tente limpar os filtros." : "Seus lançamentos vão aparecer aqui."
        }
      />
    </div>
  );
};
