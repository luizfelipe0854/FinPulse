import { useState } from "react";
import { AppHeader } from "@/components/organisms/AppHeader";
import { Navbar } from "@/components/organisms/Navbar";
import { TransactionModal } from "@/components/organisms/TransactionModal";
import { CentroModal } from "@/components/organisms/CentroModal";
import { useAuth } from "@/hooks/useAuth";
import { useTransaction } from "@/hooks/useTransaction";
import { useCentros } from "@/hooks/useCentros";
import type { PageId, NovaTransacao, NovoCentro } from "@/types";
import { DashboardView } from "./DashboardView";
import { LancamentosView } from "./LancamentosView";
import { CentrosView } from "./CentrosView";
import { IAView } from "./IAView";

export const DashboardPage = () => {
  const { user } = useAuth();

  const {
    transactions,
    isLoading: loadingTransactions,
    addTransaction,
    removeTransaction,
    income,
    expenses,
    balance,
  } = useTransaction(user?.id);

  const {
    centros,
    isLoading: loadingCentros,
    addCentro,
    removeCentro,
  } = useCentros(user?.id);

  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showCentroModal, setShowCentroModal] = useState(false);

  async function handleAddTransaction(data: NovaTransacao) {
    await addTransaction(data);
    setShowTransactionModal(false);
  }

  async function handleAddCentro(data: NovoCentro) {
    await addCentro(data);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <AppHeader />

      <Navbar activePage={activePage} onNavigate={setActivePage} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activePage === "dashboard" && (
          <DashboardView
            transactions={transactions}
            income={income}
            expenses={expenses}
            balance={balance}
            isLoading={loadingTransactions}
            onDelete={removeTransaction}
            onNavigateToLancamentos={() => setActivePage("lancamentos")}
          />
        )}

        {activePage === "lancamentos" && (
          <LancamentosView
            transactions={transactions}
            centros={centros}
            isLoading={loadingTransactions}
            onDelete={removeTransaction}
            onNewTransaction={() => setShowTransactionModal(true)}
          />
        )}

        {activePage === "ia" && <IAView />}

        {activePage === "centros" && (
          <CentrosView
            centros={centros}
            transactions={transactions}
            isLoading={loadingCentros}
            onRemove={removeCentro}
            onNew={() => setShowCentroModal(true)}
          />
        )}
      </main>

      {showTransactionModal && (
        <TransactionModal
          centros={centros}
          onSubmit={handleAddTransaction}
          onClose={() => setShowTransactionModal(false)}
        />
      )}

      {showCentroModal && (
        <CentroModal
          onSubmit={handleAddCentro}
          onClose={() => setShowCentroModal(false)}
        />
      )}
    </div>
  );
};
