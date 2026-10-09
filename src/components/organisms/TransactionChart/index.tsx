import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Card } from "@/components/atoms";
import { buildChartData } from "@/utils/chartHelpers";
import { formatCurrency } from "@/utils/formatters";
import type { ITransaction } from "@/services/firebase/firestore";

type TransactionChartProps = {
  transactions: ITransaction[];
};

const ChartTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl bg-surface shadow-float px-3.5 py-2.5 text-[13px]">
      <p className="font-semibold text-ink mb-1 capitalize">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="flex items-center gap-2 text-muted">
          <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}
          <span className="money ml-auto pl-3 font-semibold text-ink">
            {formatCurrency(Number(p.value))}
          </span>
        </p>
      ))}
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-1.5 text-[13px] text-muted">
    <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </span>
);

export const TransactionChart = ({ transactions }: TransactionChartProps) => {
  const data = buildChartData(transactions);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold tracking-tight text-ink">Últimos meses</h2>
        <div className="flex items-center gap-3">
          <Legend color="var(--success)" label="Entradas" />
          <Legend color="var(--danger)" label="Saídas" />
        </div>
      </div>

      <Card className="pt-5 pb-3 px-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={4} barCategoryGap="28%" margin={{ top: 4, right: 8, left: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "var(--text-muted)", fontFamily: "inherit" }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <Tooltip
              content={ChartTooltip}
              cursor={{ fill: "var(--surface-2)", radius: 12 }}
            />
            <Bar
              dataKey="Entradas"
              fill="var(--success)"
              radius={[8, 8, 8, 8]}
              maxBarSize={36}
            />
            <Bar dataKey="Saídas" fill="var(--danger)" radius={[8, 8, 8, 8]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
};
