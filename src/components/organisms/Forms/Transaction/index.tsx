import { useState } from "react";
import { Button, Input, Text } from "@/components/atoms";
import type { ICentro } from "@/services/firebase/firestore";
import type { NovaTransacao } from "@/types";

type TransactionFormProps = {
  centros: ICentro[];
  onSubmit: (data: NovaTransacao) => Promise<void>;
  onCancel: () => void;
};

const selectClass =
  "w-full h-10 sm:h-11 px-4 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text-body)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]";

export const TransactionForm = ({
  centros,
  onSubmit,
  onCancel,
}: TransactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: NovaTransacao = {
      type: data.get("type") as "entrada" | "saida",
      amount: Number(data.get("amount")),
      category: data.get("category") as string,
      description: data.get("description") as string,
      date: new Date(data.get("date") as string),
    };

    setIsLoading(true);
    try {
      await onSubmit(payload);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Tipo:
        </Text>
        <select name="type" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Selecione o tipo
          </option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Valor:
        </Text>
        <Input
          name="amount"
          type="number"
          placeholder="0,00"
          min="0.01"
          step="0.01"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Centro de custo:
        </Text>
        <select
          name="category"
          required
          className={selectClass}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione um centro
          </option>
          {centros.map((c) => (
            <option key={c.id} value={c.nome}>
              {c.icone} {c.nome}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Descrição:
        </Text>
        <Input name="description" type="text" placeholder="Descrição" required />
      </label>

      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Data:
        </Text>
        <Input
          name="date"
          type="date"
          required
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </label>

      <div className="flex gap-3 mt-2">
        <Button
          label="Cancelar"
          variant="secondary"
          type="button"
          onClick={onCancel}
          className="flex-1 h-10"
        />
        <Button
          label={isLoading ? "Salvando..." : "Salvar"}
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="flex-1 h-10"
        />
      </div>
    </form>
  );
};
