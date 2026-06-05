import type { ITransaction } from "@/services/firebase/firestore";

export type ChartEntry = {
  mes: string;
  Entradas: number;
  Saídas: number;
};

export function buildChartData(transactions: ITransaction[]): ChartEntry[] {
  const months: Record<string, ChartEntry> = {};

  for (let i = -1; i <= 1; i++) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + i);

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });

    months[key] = { mes: label, Entradas: 0, Saídas: 0 };
  }

  transactions.forEach((t) => {
    const key = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`;
    if (months[key]) {
      if (t.type === "entrada") months[key].Entradas += t.amount;
      else months[key].Saídas += t.amount;
    }
  });

  return Object.values(months);
}
