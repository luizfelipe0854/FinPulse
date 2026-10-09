import { ChevronRight } from "lucide-react";
import { Card, IconTile } from "@/components/atoms";
import { formatCurrency } from "@/utils/formatters";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";

type SpendingByCentroProps = {
  transactions: ITransaction[];
  centros: ICentro[];
  onSeeAll: () => void;
  limit?: number;
};

const COR_PADRAO = "#8a8f9e";

export const SpendingByCentro = ({
  transactions,
  centros,
  onSeeAll,
  limit = 4,
}: SpendingByCentroProps) => {
  const totais = new Map<string, number>();
  transactions
    .filter((t) => t.type === "saida")
    .forEach((t) => totais.set(t.category, (totais.get(t.category) ?? 0) + t.amount));

  const totalSaidas = [...totais.values()].reduce((acc, v) => acc + v, 0);
  if (totalSaidas === 0) return null;

  const ranking = [...totais.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([nome, valor]) => ({
      nome,
      valor,
      share: valor / totalSaidas,
      centro: centros.find((c) => c.nome === nome),
    }));

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold tracking-tight text-ink">Onde você gastou</h2>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-sm font-medium text-primary cursor-pointer hover:opacity-80"
        >
          Ver tudo
          <ChevronRight size={16} />
        </button>
      </div>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex h-2.5 gap-0.5 rounded-full overflow-hidden">
          {ranking.map((item) => (
            <div
              key={item.nome}
              style={{
                width: `${item.share * 100}%`,
                backgroundColor: item.centro?.cor ?? COR_PADRAO,
              }}
            />
          ))}
          <div className="flex-1 bg-surface-2" />
        </div>

        <ul className="flex flex-col gap-3">
          {ranking.map((item) => (
            <li key={item.nome} className="flex items-center gap-3">
              <IconTile color={item.centro?.cor ?? COR_PADRAO} size="sm">
                {item.centro?.icone ?? "•"}
              </IconTile>
              <span className="flex-1 min-w-0 truncate text-[15px] font-medium text-ink">
                {item.nome}
              </span>
              <span className="text-[13px] text-muted tabular-nums">
                {Math.round(item.share * 100)}%
              </span>
              <span className="money w-28 text-right text-[15px] font-semibold text-ink">
                {formatCurrency(item.valor)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
};
