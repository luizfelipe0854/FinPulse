import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from "recharts";
import { Text } from "@/components/atoms";
import { buildChartData } from "@/utils/chartHelpers";
import type { ITransaction } from "@/services/firebase/firestore";

type TransactionChartProps = {
  transactions: ITransaction[];
};

const formatLabel = (v: unknown) => {
  const n = Number(v);
  return n === 0 || isNaN(n) ? "" : n >= 1000 ? `R$${(n / 1000).toFixed(1)}k` : `R$${n.toFixed(0)}`;
};

export const TransactionChart = ({ transactions }: TransactionChartProps) => {
  const data = buildChartData(transactions);

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 flex flex-col gap-3">
      <Text as="h2" variant="title" size="lg">
        Entradas vs Saídas
      </Text>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={6} barCategoryGap="15%" margin={{ top: 20 }}>
          <XAxis
            dataKey="mes"
            tick={{
              fontSize: 12,
              fill: "var(--text-muted)",
              fontFamily: "Geist Mono, monospace",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Bar dataKey="Entradas" fill="#00e5a0" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="Entradas"
              position="top"
              formatter={formatLabel}
              style={{
                fontSize: 11,
                fill: "var(--text-muted)",
                fontFamily: "Geist Mono, monospace",
              }}
            />
          </Bar>

          <Bar dataKey="Saídas" fill="#ff4d6a" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="Saídas"
              position="top"
              formatter={formatLabel}
              style={{
                fontSize: 11,
                fill: "var(--text-muted)",
                fontFamily: "Geist Mono, monospace",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
