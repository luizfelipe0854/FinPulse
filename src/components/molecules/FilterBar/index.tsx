import { X } from "lucide-react";
import { Select } from "@/components/atoms";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
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

const tipoOptions: { value: TipoFiltro; label: string }[] = [
  { value: "todos", label: "Tudo" },
  { value: "entrada", label: "Entradas" },
  { value: "saida", label: "Saídas" },
];

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
  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl
        ariaLabel="Tipo de lançamento"
        options={tipoOptions}
        value={tipoFiltro}
        onChange={onTipoChange}
        className="sm:max-w-sm"
      />

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Select
          look="chip"
          value={mesFiltro}
          onChange={(e) => onMesChange(e.target.value)}
          aria-label="Filtrar por mês"
          className="shrink-0"
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
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </option>
            );
          })}
        </Select>

        {centros.length > 0 && (
          <Select
            look="chip"
            value={centroFiltro}
            onChange={(e) => onCentroChange(e.target.value)}
            aria-label="Filtrar por centro de custo"
            className="shrink-0"
          >
            <option value="todos">Todos os centros</option>
            {centros.map((centro) => (
              <option key={centro.id} value={centro.nome}>
                {centro.icone} {centro.nome}
              </option>
            ))}
          </Select>
        )}

        {algumFiltroAtivo && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 h-9 pl-3 pr-3.5 rounded-full text-sm font-medium text-danger bg-danger/10 hover:bg-danger/15 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X size={14} />
            Limpar
          </button>
        )}
      </div>
    </div>
  );
};
