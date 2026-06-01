import type { ICentro } from "@/services/firebase/firestore";

export type TipoFiltro = "todos" | "entrada" | "saida";

type FilterBarProps = {
  tipoFiltro: TipoFiltro;
  onTipoChange: (tipo: TipoFiltro) => void;
  mesFiltro: string;
  onMesChange: (mes: string) => void;
  centroFiltro: string;
  onCentroChange: (centro: string) => void;
  mesesDisponiveis: string[];
  centros: ICentro[];
  algumFiltroAtivo: boolean;
  onClear: () => void;
};

export const FilterBar = ({
  tipoFiltro,
  onTipoChange,
  mesFiltro,
  onMesChange,
  centroFiltro,
  onCentroChange,
  mesesDisponiveis,
  centros,
  algumFiltroAtivo,
  onClear,
}: FilterBarProps) => {
  const tipoLabels = { todos: "Todos", entrada: "Entradas", saida: "Saídas" };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-1">
        {(["todos", "entrada", "saida"] as TipoFiltro[]).map((tipo) => {
          const ativo = tipoFiltro === tipo;
          return (
            <button
              key={tipo}
              type="button"
              onClick={() => onTipoChange(tipo)}
              className={`px-3 h-8 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                ativo
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-body)]"
              }`}
            >
              {tipoLabels[tipo]}
            </button>
          );
        })}
      </div>

      <select
        value={mesFiltro}
        onChange={(e) => onMesChange(e.target.value)}
        className="h-8 px-3 text-xs font-mono border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text-body)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
      >
        <option value="todos">Todos os meses</option>
        {mesesDisponiveis.map((mes) => {
          const [year, month] = mes.split("-");
          const label = new Date(Number(year), Number(month) - 1).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          });
          return (
            <option key={mes} value={mes}>
              {label}
            </option>
          );
        })}
      </select>

      {centros.length > 0 && (
        <select
          value={centroFiltro}
          onChange={(e) => onCentroChange(e.target.value)}
          className="h-8 px-3 text-xs font-mono border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text-body)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        >
          <option value="todos">Todos os centros</option>
          {centros.map((centro) => (
            <option key={centro.id} value={centro.nome}>
              {centro.icone} {centro.nome}
            </option>
          ))}
        </select>
      )}

      {algumFiltroAtivo && (
        <button
          type="button"
          onClick={onClear}
          className="h-8 px-3 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors cursor-pointer"
        >
          Limpar
        </button>
      )}
    </div>
  );
};
