import { Card } from "@/components/atoms";
import { EmptyState } from "@/components/molecules/EmptyState";
import { CentroCard } from "@/components/molecules/CentroCard";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";
import { PageTitle } from "./PageTitle";

type CentroStats = {
  entrada: number;
  saida: number;
  count: number;
};

type CentrosViewProps = {
  centros: ICentro[];
  transactions: ITransaction[];
  isLoading: boolean;
  onRemove: (id: string) => void;
  onNew: () => void;
};

export const CentrosView = ({
  centros,
  transactions,
  isLoading,
  onRemove,
  onNew,
}: CentrosViewProps) => {
  const statsPorCentro: Record<string, CentroStats> = {};

  transactions.forEach((t) => {
    if (!statsPorCentro[t.category]) {
      statsPorCentro[t.category] = { entrada: 0, saida: 0, count: 0 };
    }
    if (t.type === "entrada") {
      statsPorCentro[t.category].entrada += t.amount;
    } else {
      statsPorCentro[t.category].saida += t.amount;
    }
    statsPorCentro[t.category].count++;
  });

  const totalSaidas = Object.values(statsPorCentro).reduce((acc, s) => acc + s.saida, 0);

  const vazio = { entrada: 0, saida: 0, count: 0 };
  const centrosOrdenados = [...centros].sort(
    (a, b) => (statsPorCentro[b.nome]?.saida ?? 0) - (statsPorCentro[a.nome]?.saida ?? 0),
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="Centros de custo"
        subtitle="Para onde vai o seu dinheiro"
        action={{ label: "Novo centro", onClick: onNew, alwaysVisible: true }}
      />

      {isLoading ? (
        <Card className="h-48 animate-pulse" />
      ) : centros.length === 0 ? (
        <Card>
          <EmptyState
            text="Nenhum centro de custo ainda"
            description="Crie centros como Mercado, Casa ou Transporte para organizar seus lançamentos."
            actionLabel="Criar primeiro centro"
            onAction={onNew}
          />
        </Card>
      ) : (
        <Card className="divide-y divide-line overflow-hidden">
          {centrosOrdenados.map((centro) => {
            const stats = statsPorCentro[centro.nome] ?? vazio;
            return (
              <CentroCard
                key={centro.id}
                centro={centro}
                stats={stats}
                share={totalSaidas > 0 ? stats.saida / totalSaidas : 0}
                onRemove={onRemove}
              />
            );
          })}
        </Card>
      )}
    </div>
  );
};
