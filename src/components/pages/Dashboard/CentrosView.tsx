import { Plus } from "lucide-react";
import { Button, Text } from "@/components/atoms";
import { EmptyState } from "@/components/molecules/EmptyState";
import { CentroCard } from "@/components/molecules/CentroCard";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text as="h2" variant="title" size="lg">
          Centros de custo
        </Text>
        <Button
          label="Novo centro"
          icon={<Plus size={16} />}
          variant="primary"
          className="h-9 text-sm"
          onClick={onNew}
        />
      </div>

      {isLoading ? (
        <Text variant="muted" size="sm" className="py-8 text-center">
          Carregando...
        </Text>
      ) : centros.length === 0 ? (
        <EmptyState text="Nenhum centro de custo ainda" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {centros.map((centro) => {
            const stats = statsPorCentro[centro.nome] ?? {
              entrada: 0,
              saida: 0,
              count: 0,
            };

            return (
              <CentroCard
                key={centro.id}
                centro={centro}
                stats={stats}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
