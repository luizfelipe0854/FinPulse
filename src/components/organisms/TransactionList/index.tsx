import { Text } from "@/components/atoms";
import { EmptyState } from "@/components/molecules/EmptyState";
import { TransactionRow } from "@/components/molecules/TransactionRow";
import type { ITransaction } from "@/services/firebase/firestore";

type TransactionListProps = {
  transactions: ITransaction[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  emptyText?: string;
};

export const TransactionList = ({
  transactions,
  isLoading,
  onDelete,
  emptyText = "Nenhuma transação encontrada",
}: TransactionListProps) => {
  if (isLoading) {
    return (
      <Text variant="muted" size="sm" className="py-8 text-center">
        Carregando...
      </Text>
    );
  }

  if (transactions.length === 0) {
    return <EmptyState text={emptyText} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
