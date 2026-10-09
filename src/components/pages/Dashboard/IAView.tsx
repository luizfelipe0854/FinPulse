import { Sparkles } from "lucide-react";
import { Badge, Card } from "@/components/atoms";
import { PageTitle } from "./PageTitle";

const ideias = [
  "Onde dá para economizar este mês",
  "Gastos fora do padrão",
  "Previsão de saldo para os próximos meses",
];

export const IAView = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Análise IA" />

      <Card className="p-6 sm:p-8 flex flex-col items-center text-center gap-4">
        <div className="size-16 rounded-2xl bg-primary text-primary-ink flex items-center justify-center shadow-[0_10px_30px_-8px_var(--primary)]">
          <Sparkles size={30} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Badge label="Em desenvolvimento" />
          <h2 className="text-xl font-semibold tracking-tight text-ink">Seu analista financeiro</h2>
          <p className="text-sm text-muted max-w-sm">
            Em breve você vai receber análises e recomendações personalizadas com base nos seus
            lançamentos e objetivos.
          </p>
        </div>

        <ul className="w-full max-w-sm flex flex-col gap-2 mt-2 text-left">
          {ideias.map((ideia) => (
            <li
              key={ideia}
              className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3 text-sm text-body"
            >
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              {ideia}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
