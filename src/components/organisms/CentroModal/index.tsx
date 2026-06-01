import { useState } from "react";
import { Button, Input, Text } from "@/components/atoms";
import type { NovoCentro } from "@/types";

const PRESET_COLORS = [
  "#4f46e5",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#0ea5e9",
  "#8b5cf6",
  "#06b6d4",
  "#64748b",
];

type CentroModalProps = {
  onSubmit: (data: NovoCentro) => Promise<void>;
  onClose: () => void;
};

export const CentroModal = ({ onSubmit, onClose }: CentroModalProps) => {
  const [cor, setCor] = useState(PRESET_COLORS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") ?? "").trim();
    const icone = String(fd.get("icone") ?? "").trim();

    if (!nome || !icone) return;

    try {
      setIsLoading(true);
      await onSubmit({ nome, icone, cor });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[var(--surface)] rounded-xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <Text as="h3" variant="title" size="lg">
            Novo centro de custo
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <Text as="span" variant="body" size="sm">
              Nome:
            </Text>
            <Input name="nome" type="text" placeholder="Ex: Alimentação" required />
          </label>

          <label className="flex flex-col gap-1">
            <Text as="span" variant="body" size="sm">
              Ícone (emoji):
            </Text>
            <Input name="icone" type="text" placeholder="Ex: 🍽️" maxLength={4} required />
          </label>

          <div className="flex flex-col gap-2">
            <Text as="span" variant="body" size="sm">
              Cor:
            </Text>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCor(c)}
                  style={{ backgroundColor: c }}
                  aria-label={`Selecionar cor ${c}`}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${
                    cor === c ? "scale-125 ring-2 ring-offset-2 ring-[var(--primary)]" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              label="Cancelar"
              variant="secondary"
              type="button"
              onClick={onClose}
              className="flex-1 h-10"
              disabled={isLoading}
            />
            <Button
              label={isLoading ? "Salvando..." : "Salvar"}
              variant="primary"
              type="submit"
              className="flex-1 h-10"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
