import { Card } from "@/components/atoms";
import { EmptyState } from "@/components/molecules/EmptyState";
import { TransactionRow } from "@/components/molecules/TransactionRow";
import { formatDayHeader } from "@/utils/formatters";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";

type TransactionListProps = {
  transactions: ITransaction[];
  centros?: ICentro[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  emptyText?: string;
  emptyDescription?: string;
  groupByDay?: boolean;
};

const SkeletonRows = () => (
  <Card className="divide-y divide-line overflow-hidden">
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
        <div className="size-11 rounded-2xl bg-surface-2" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3.5 w-1/2 rounded-full bg-surface-2" />
          <div className="h-3 w-1/3 rounded-full bg-surface-2" />
        </div>
        <div className="h-3.5 w-20 rounded-full bg-surface-2" />
      </div>
    ))}
  </Card>
);

export const TransactionList = ({
  transactions,
  centros = [],
  isLoading,
  onDelete,
  emptyText = "Nenhuma transação encontrada",
  emptyDescription,
  groupByDay = false,
}: TransactionListProps) => {
  if (isLoading) return <SkeletonRows />;

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState text={emptyText} description={emptyDescription} />
      </Card>
    );
  }

  const centroPorNome = new Map(centros.map((c) => [c.nome, c]));

  const renderRows = (items: ITransaction[]) => (
    <Card className="divide-y divide-line overflow-hidden">
      {items.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          centro={centroPorNome.get(transaction.category)}
          hideDate={groupByDay}
          onDelete={onDelete}
        />
      ))}
    </Card>
  );

  if (!groupByDay) return renderRows(transactions);

  const grupos: { titulo: string; itens: ITransaction[] }[] = [];
  transactions.forEach((t) => {
    const titulo = formatDayHeader(t.date);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.titulo === titulo) ultimo.itens.push(t);
    else grupos.push({ titulo, itens: [t] });
  });

  return (
    <div className="flex flex-col gap-5">
      {grupos.map((grupo) => (
        <section key={grupo.titulo} className="flex flex-col gap-2">
          <h3 className="px-1 text-[13px] font-semibold text-muted first-letter:uppercase">
            {grupo.titulo}
          </h3>
          {renderRows(grupo.itens)}
        </section>
      ))}
    </div>
  );
};
