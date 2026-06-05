import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import { Text } from "@/components/atoms";
import { formatCurrency, formatDate } from "@/utils/formatters";
import type { ITransaction } from "@/services/firebase/firestore";

type TransactionRowProps = {
  transaction: ITransaction;
  onDelete: (id: string) => void;
};

export const TransactionRow = ({ transaction, onDelete }: TransactionRowProps) => {
  const isEntrada = transaction.type === "entrada";

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isEntrada ? "bg-[var(--success)]/10" : "bg-[var(--danger)]/10"
          }`}
        >
          {isEntrada ? (
            <TrendingUp size={16} className="text-[var(--success)]" />
          ) : (
            <TrendingDown size={16} className="text-[var(--danger)]" />
          )}
        </div>

        <div className="min-w-0">
          <Text as="p" variant="body" size="sm" className="truncate font-medium">
            {transaction.description}
          </Text>
          <Text as="p" variant="muted" size="xs">
            <span className="hidden sm:inline">{transaction.category} · </span>
            {formatDate(transaction.date)}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          className="text-sm font-bold"
          style={{ color: isEntrada ? "var(--success)" : "var(--danger)" }}
        >
          {isEntrada ? "+" : "−"} {formatCurrency(transaction.amount)}
        </span>

        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors cursor-pointer"
          aria-label="Remover transação"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
