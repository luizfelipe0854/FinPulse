import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { Card } from "@/components/atoms";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import { formatCurrency } from "@/utils/formatters";

export type Periodo = "mes" | "total";

type SummaryCardsProps = {
  balance: number;
  income: number;
  expenses: number;
  periodo: Periodo;
  onPeriodoChange: (periodo: Periodo) => void;
};

const periodoOptions: { value: Periodo; label: string }[] = [
  { value: "mes", label: "Este mês" },
  { value: "total", label: "Total" },
];

function calcularSaude(income: number, expenses: number) {
  if (income <= 0) return expenses > 0 ? 0 : null;
  const sobra = ((income - expenses) / income) * 100;
  return Math.max(0, Math.min(100, Math.round(sobra)));
}

function rotuloSaude(saude: number) {
  if (saude >= 20) return { texto: "Saudável", cor: "text-success", barra: "bg-success" };
  if (saude >= 5) return { texto: "Atenção", cor: "text-warning", barra: "bg-warning" };
  return { texto: "Apertado", cor: "text-danger", barra: "bg-danger" };
}

export const SummaryCards = ({
  balance,
  income,
  expenses,
  periodo,
  onPeriodoChange,
}: SummaryCardsProps) => {
  const saude = calcularSaude(income, expenses);
  const status = saude !== null ? rotuloSaude(saude) : null;

  return (
    <Card as="section" className="p-5 sm:p-6 flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-muted">
          {periodo === "mes" ? "Saldo do mês" : "Saldo total"}
        </span>
        <SegmentedControl
          ariaLabel="Período do resumo"
          options={periodoOptions}
          value={periodo}
          onChange={onPeriodoChange}
          className="w-full sm:w-auto"
        />
      </div>

      <p
        className={clsx(
          "money text-[40px] sm:text-5xl leading-none font-bold tracking-tight",
          balance < 0 ? "text-danger" : "text-ink",
        )}
      >
        {formatCurrency(balance)}
      </p>

      {saude !== null && status && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted">
              Sobrando <span className="font-semibold text-ink">{saude}%</span> do que entrou
            </span>
            <span className={clsx("font-semibold", status.cor)}>{status.texto}</span>
          </div>
          <div
            className="h-2 rounded-full bg-surface-2 overflow-hidden"
            role="meter"
            aria-label="Saúde financeira"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={saude}
          >
            <div
              className={clsx("h-full rounded-full transition-[width] duration-500", status.barra)}
              style={{ width: `${Math.max(saude, 2)}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <SummaryCard
          tone="success"
          icon={<ArrowDownLeft size={14} strokeWidth={2.5} />}
          label="Entradas"
          value={formatCurrency(income)}
        />
        <SummaryCard
          tone="danger"
          icon={<ArrowUpRight size={14} strokeWidth={2.5} />}
          label="Saídas"
          value={formatCurrency(expenses)}
        />
      </div>
    </Card>
  );
};
