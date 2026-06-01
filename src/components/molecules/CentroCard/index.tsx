import { Trash2 } from "lucide-react";
import { Text } from "@/components/atoms";
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
  onRemove: (id: string) => void;
};

export const CentroCard = ({ centro, stats, onRemove }: CentroCardProps) => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ backgroundColor: `${centro.cor}20` }}
      >
        {centro.icone}
      </div>

      <div className="flex-1 min-w-0">
        <Text as="p" variant="title" size="md">
          {centro.nome}
        </Text>
        <Text as="p" variant="muted" size="xs">
          {stats.count} lançamento{stats.count !== 1 ? "s" : ""}
        </Text>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          {stats.saida > 0 && (
            <Text as="p" variant="body" size="sm" className="text-[var(--danger)]">
              − {formatCurrency(stats.saida)}
            </Text>
          )}
          {stats.entrada > 0 && (
            <Text as="p" variant="body" size="sm" className="text-[var(--success)]">
              + {formatCurrency(stats.entrada)}
            </Text>
          )}
          {stats.count === 0 && (
            <Text as="p" variant="muted" size="xs">
              Sem lançamentos
            </Text>
          )}
        </div>

        <button
          type="button"
          onClick={() => onRemove(centro.id)}
          className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors cursor-pointer"
          aria-label="Remover centro"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
