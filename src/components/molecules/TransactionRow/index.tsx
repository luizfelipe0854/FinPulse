import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import clsx from "clsx";
import { IconTile } from "@/components/atoms/IconTile";
import { formatCurrency, formatShortDate } from "@/utils/formatters";
import type { ICentro, ITransaction } from "@/services/firebase/firestore";

type TransactionRowProps = {
  transaction: ITransaction;
  centro?: ICentro;
  hideDate?: boolean;
  onDelete: (id: string) => void;
};

export const TransactionRow = ({
  transaction,
  centro,
  hideDate = false,
  onDelete,
}: TransactionRowProps) => {
  const isEntrada = transaction.type === "entrada";

  return (
    <div className="group flex items-center gap-3 px-4 py-3">
      <IconTile color={centro?.cor ?? (isEntrada ? "#12a150" : undefined)}>
        {centro?.icone ??
          (isEntrada ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />)}
      </IconTile>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-ink truncate">
          {transaction.description}
        </p>
        <p className="text-[13px] text-muted truncate">
          {transaction.category}
          {!hideDate && ` · ${formatShortDate(transaction.date)}`}
        </p>
      </div>

      <span
        className={clsx(
          "money text-[15px] font-semibold shrink-0",
          isEntrada ? "text-success" : "text-ink",
        )}
      >
        {isEntrada ? "+" : "−"} {formatCurrency(transaction.amount)}
      </span>

      <button
        type="button"
        onClick={() => onDelete(transaction.id)}
        className={clsx(
          "size-8 -mr-1 rounded-full flex items-center justify-center shrink-0 cursor-pointer",
          "text-muted hover:text-danger hover:bg-danger/10 transition-all",
          "md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100",
        )}
        aria-label={`Remover "${transaction.description}"`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
