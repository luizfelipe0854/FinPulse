import { useState } from "react";
import clsx from "clsx";
import { Button, Input, Select } from "@/components/atoms";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import type { ICentro } from "@/services/firebase/firestore";
import type { NovaTransacao } from "@/types";

type TransactionFormProps = {
  centros: ICentro[];
  onSubmit: (data: NovaTransacao) => Promise<void>;
  onCancel: () => void;
};

type Tipo = NovaTransacao["type"];

const tipoOptions: { value: Tipo; label: string }[] = [
  { value: "saida", label: "Saída" },
  { value: "entrada", label: "Entrada" },
];

const labelClass = "text-[13px] font-medium text-muted px-1";

export const TransactionForm = ({ centros, onSubmit, onCancel }: TransactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipo, setTipo] = useState<Tipo>("saida");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: NovaTransacao = {
      type: data.get("type") as Tipo,
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
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input type="hidden" name="type" value={tipo} />
      <SegmentedControl
        ariaLabel="Tipo do lançamento"
        options={tipoOptions}
        value={tipo}
        onChange={setTipo}
        tone={tipo === "saida" ? "danger" : "success"}
      />

      <label className="flex flex-col items-center gap-1 py-2">
        <span className="text-[13px] font-medium text-muted">Valor</span>
        <span
          className={clsx(
            "flex items-baseline justify-center gap-1.5 transition-colors",
            tipo === "saida" ? "text-danger" : "text-success",
          )}
        >
          <span className="text-2xl font-semibold">R$</span>
          <input
            name="amount"
            type="number"
            inputMode="decimal"
            placeholder="0,00"
            min="0.01"
            step="0.01"
            required
            autoFocus
            className="money [field-sizing:content] min-w-[4ch] max-w-[9ch] bg-transparent text-5xl font-bold tracking-tight outline-none placeholder:text-line"
          />
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Descrição</span>
        <Input name="description" type="text" placeholder="Ex: Mercado do mês" required />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Centro de custo</span>
          <Select name="category" required defaultValue="">
            <option value="" disabled>
              {centros.length ? "Escolha um centro" : "Crie um centro antes"}
            </option>
            {centros.map((c) => (
              <option key={c.id} value={c.nome}>
                {c.icone} {c.nome}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Data</span>
          <Input
            name="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </label>
      </div>

      <div className="flex gap-3 pt-1">
        <Button label="Cancelar" variant="secondary" size="lg" onClick={onCancel} className="flex-1" />
        <Button
          label={isLoading ? "Salvando..." : "Salvar"}
          type="submit"
          size="lg"
          disabled={isLoading}
          className="flex-[2]"
        />
      </div>
    </form>
  );
};
