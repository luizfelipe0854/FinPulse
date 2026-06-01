import { Sparkles } from "lucide-react";
import { Text } from "@/components/atoms";

export const IAView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
        <Sparkles size={32} className="text-[var(--primary)]" />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <Text as="h2" variant="title" size="xl">
          Análise com IA
        </Text>
        <Text as="p" variant="muted" size="sm">
          Em breve você poderá receber análises e recomendações personalizadas
          com base nos seus lançamentos e objetivos financeiros.
        </Text>
      </div>

      <span className="px-3 py-1 text-xs font-mono rounded-full border border-[var(--primary)]/30 text-[var(--primary)] bg-[var(--primary)]/10">
        Em desenvolvimento
      </span>
    </div>
  );
};
