import { useState, useEffect } from "react";
import { FirebaseError } from "firebase/app";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  type ITransaction,
} from "@/services/firebase/firestore";
import { toastMessage } from "@/utils/toastMessage";
import type { NovaTransacao } from "@/types";

export const useTransaction = (uid: string | undefined) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadTransactions() {
    if (!uid) return;
    setIsLoading(true);
    try {
      const data = await getTransactions(uid);
      setTransactions(data);
    } catch {
      toastMessage("Erro ao carregar transações.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [uid]);

  const addTransaction = async (data: NovaTransacao) => {
    if (!uid) return;
    try {
      await createTransaction(uid, data);
      toastMessage("Transação adicionada com sucesso!", "success");
      await loadTransactions();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toastMessage(error.message, "error");
      } else {
        toastMessage("Erro ao adicionar transação.", "error");
      }
      throw error;
    }
  };

  const removeTransaction = async (transactionId: string) => {
    if (!uid) return;
    try {
      await deleteTransaction(uid, transactionId);
      toastMessage("Transação removida!", "success");
      setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    } catch {
      toastMessage("Erro ao remover transação.", "error");
    }
  };

  const income = transactions
    .filter((t) => t.type === "entrada")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "saida")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return {
    transactions,
    isLoading,
    addTransaction,
    removeTransaction,
    income,
    expenses,
    balance,
  };
};
