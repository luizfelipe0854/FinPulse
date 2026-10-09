import { useState } from "react";
import clsx from "clsx";
import { Button, Input, IconTile } from "@/components/atoms";
import { Sheet } from "@/components/organisms/Sheet";
import type { NovoCentro } from "@/types";

const PRESET_COLORS = [
  "#2f6bff",
  "#12a150",
  "#ef4452",
  "#f2a516",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

const SUGESTOES = ["🛒", "🍽️", "🏠", "🚗", "💡", "🎬", "💊", "📚", "✈️", "💼"];

type CentroModalProps = {
  onSubmit: (data: NovoCentro) => Promise<void>;
  onClose: () => void;
};

const labelClass = "text-[13px] font-medium text-muted px-1";

export const CentroModal = ({ onSubmit, onClose }: CentroModalProps) => {
  const [cor, setCor] = useState(PRESET_COLORS[0]);
  const [icone, setIcone] = useState(SUGESTOES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") ?? "").trim();
    const iconeLimpo = icone.trim();

    if (!nome || !iconeLimpo) return;

    try {
      setIsLoading(true);
      await onSubmit({ nome, icone: iconeLimpo, cor });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet title="Novo centro de custo" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <IconTile color={cor} size="lg">
            {icone || "?"}
          </IconTile>
          <label className="flex-1 flex flex-col gap-1.5">
            <span className={labelClass}>Nome</span>
            <Input name="nome" type="text" placeholder="Ex: Alimentação" required autoFocus />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Ícone</span>
          <div className="flex flex-wrap gap-2">
            {SUGESTOES.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIcone(emoji)}
                aria-label={`Usar ${emoji}`}
                aria-pressed={icone === emoji}
                className={clsx(
                  "size-10 rounded-xl text-xl flex items-center justify-center cursor-pointer transition-all",
                  icone === emoji ? "bg-primary/10 ring-2 ring-primary" : "bg-surface-2 hover:bg-line",
                )}
              >
                {emoji}
              </button>
            ))}
            <input
              type="text"
              value={SUGESTOES.includes(icone) ? "" : icone}
              onChange={(e) => setIcone(e.target.value)}
              maxLength={4}
              placeholder="Outro"
              aria-label="Outro emoji"
              className="h-10 w-20 rounded-xl bg-surface-2 text-center text-sm text-ink placeholder:text-muted outline-none border border-transparent focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Cor</span>
          <div className="flex gap-2.5 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCor(c)}
                style={{ backgroundColor: c }}
                aria-label={`Selecionar cor ${c}`}
                aria-pressed={cor === c}
                className={clsx(
                  "size-8 rounded-full cursor-pointer transition-transform ring-offset-2 ring-offset-surface",
                  cor === c ? "ring-2 ring-ink scale-110" : "hover:scale-105",
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            label="Cancelar"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            label={isLoading ? "Salvando..." : "Criar centro"}
            type="submit"
            size="lg"
            className="flex-[2]"
            disabled={isLoading}
          />
        </div>
      </form>
    </Sheet>
  );
};
