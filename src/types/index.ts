export type PageId = "dashboard" | "lancamentos" | "centros" | "ia";

export type NovaTransacao = {
  type: "entrada" | "saida";
  amount: number;
  category: string;
  description: string;
  date: Date;
};

export type NovoCentro = {
  nome: string;
  icone: string;
  cor: string;
};
