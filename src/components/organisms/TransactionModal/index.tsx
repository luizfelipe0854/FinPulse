import { Sheet } from "@/components/organisms/Sheet";
import { TransactionForm } from "@/components/organisms/Forms/Transaction";
import type { ICentro } from "@/services/firebase/firestore";
import type { NovaTransacao } from "@/types";

type TransactionModalProps = {
  centros: ICentro[];
  onSubmit: (data: NovaTransacao) => Promise<void>;
  onClose: () => void;
};

export const TransactionModal = ({ centros, onSubmit, onClose }: TransactionModalProps) => {
  return (
    <Sheet title="Novo lançamento" onClose={onClose}>
      <TransactionForm centros={centros} onSubmit={onSubmit} onCancel={onClose} />
    </Sheet>
  );
};
