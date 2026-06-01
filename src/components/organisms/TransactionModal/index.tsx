import { Text } from "@/components/atoms";
import { TransactionForm } from "@/components/organisms/Forms/Transaction";
import type { ICentro } from "@/services/firebase/firestore";
import type { NovaTransacao } from "@/types";

type TransactionModalProps = {
  centros: ICentro[];
  onSubmit: (data: NovaTransacao) => Promise<void>;
  onClose: () => void;
};

export const TransactionModal = ({
  centros,
  onSubmit,
  onClose,
}: TransactionModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[var(--surface)] rounded-xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <Text as="h3" variant="title" size="lg">
            Nova transação
          </Text>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-title)] transition-colors cursor-pointer text-xl leading-none"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <TransactionForm
          centros={centros}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};
