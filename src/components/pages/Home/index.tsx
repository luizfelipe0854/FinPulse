import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import FinPulseLogo from "@/assets/FinPulse.svg";
import { Button, IconTile } from "@/components/atoms";

const exemplo = [
  { emoji: "🛒", nome: "Mercado", info: "Alimentação · hoje", valor: "− R$ 284,90", cor: "#12a150" },
  { emoji: "💼", nome: "Salário", info: "Trabalho · ontem", valor: "+ R$ 5.200,00", cor: "#2f6bff", entrada: true },
  { emoji: "🚗", nome: "Combustível", info: "Transporte · 6 out", valor: "− R$ 180,00", cor: "#f2a516" },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bg">
      <header className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={FinPulseLogo} alt="" className="size-8" />
          <span className="text-[17px] font-semibold tracking-tight text-ink">FinPulse</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-6 pt-10 pb-16 md:pt-20 grid md:grid-cols-2 gap-12 items-center">
        <section className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <h1 className="text-[40px] sm:text-5xl leading-[1.05] font-bold tracking-tight text-ink">
            Seu dinheiro,
            <br />
            <span className="text-primary">com clareza.</span>
          </h1>
          <p className="text-[17px] text-muted max-w-md">
            Registre entradas e saídas, separe por centro de custo e veja para onde vai cada real.
            Simples, rápido e salvo na nuvem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button label="Criar conta" size="lg" shape="pill" onClick={() => navigate("/cadastro")} />
            <Button
              label="Já tenho conta"
              variant="secondary"
              size="lg"
              shape="pill"
              onClick={() => navigate("/login")}
            />
          </div>
        </section>

        <section aria-hidden className="w-full max-w-sm mx-auto flex flex-col gap-3">
          <div className="bg-surface rounded-[28px] shadow-float p-5 flex flex-col gap-4">
            <p className="text-sm font-medium text-muted">Saldo do mês</p>
            <p className="money text-4xl font-bold tracking-tight text-ink">R$ 3.142,60</p>
            <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full w-[38%] rounded-full bg-success" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-2xl bg-surface-2 p-3">
                <p className="flex items-center gap-1.5 text-[13px] text-muted">
                  <ArrowDownLeft size={14} className="text-success" /> Entradas
                </p>
                <p className="money font-semibold text-ink">R$ 5.200,00</p>
              </div>
              <div className="flex-1 rounded-2xl bg-surface-2 p-3">
                <p className="flex items-center gap-1.5 text-[13px] text-muted">
                  <ArrowUpRight size={14} className="text-danger" /> Saídas
                </p>
                <p className="money font-semibold text-ink">R$ 2.057,40</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-[28px] shadow-float divide-y divide-line overflow-hidden">
            {exemplo.map((item) => (
              <div key={item.nome} className="flex items-center gap-3 px-4 py-3">
                <IconTile color={item.cor} size="sm">
                  {item.emoji}
                </IconTile>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{item.nome}</p>
                  <p className="text-xs text-muted">{item.info}</p>
                </div>
                <p className={`money text-sm font-semibold ${item.entrada ? "text-success" : "text-ink"}`}>
                  {item.valor}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
