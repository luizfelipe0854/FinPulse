import { Trash2 } from "lucide-react";
import { IconTile } from "@/components/atoms/IconTile";
import { formatCurrency } from "@/utils/formatters";
import type { ICentro } from "@/services/firebase/firestore";

type CentroStats = {
  entrada: number;
  saida: number;
  count: number;
};

type CentroCardProps = {
  centro: ICentro;
  stats: CentroStats;
  share: number;
  onRemove: (id: string) => void;
};

export const CentroCard = ({ centro, stats, share, onRemove }: CentroCardProps) => {
  const percent = Math.round(share * 100);

  return (
    <div className="group flex items-center gap-3 px-4 py-3.5">
      <IconTile color={centro.cor}>{centro.icone}</IconTile>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-medium text-ink truncate">{centro.nome}</p>
          <p className="money text-[15px] font-semibold text-ink shrink-0">
            {stats.saida > 0
              ? `− ${formatCurrency(stats.saida)}`
              : stats.entrada > 0
                ? `+ ${formatCurrency(stats.entrada)}`
                : "—"}
          </p>
        </div>

        <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${percent}%`, backgroundColor: centro.cor }}
          />
        </div>

        <p className="text-[13px] text-muted">
          {stats.count === 0
            ? "Sem lançamentos"
            : `${stats.count} lançamento${stats.count !== 1 ? "s" : ""}`}
          {stats.saida > 0 && ` · ${percent}% das saídas`}
          {stats.entrada > 0 && stats.saida > 0 && (
            <span className="text-success"> · + {formatCurrency(stats.entrada)}</span>
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(centro.id)}
        className="size-8 -mr-1 rounded-full flex items-center justify-center shrink-0 cursor-pointer text-muted hover:text-danger hover:bg-danger/10 transition-all md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100"
        aria-label={`Remover centro ${centro.nome}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
