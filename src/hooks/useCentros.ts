import { useState, useEffect } from "react";
import { FirebaseError } from "firebase/app";
import {
  createCentro,
  getCentros,
  deleteCentro,
  type ICentro,
} from "@/services/firebase/firestore";
import { toastMessage } from "@/utils/toastMessage";
import type { NovoCentro } from "@/types";

export const useCentros = (uid: string | undefined) => {
  const [centros, setCentros] = useState<ICentro[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadCentros() {
    if (!uid) return;
    setIsLoading(true);
    try {
      const data = await getCentros(uid);
      setCentros(data);
    } catch {
      toastMessage("Erro ao carregar centros de custo.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCentros();
  }, [uid]);

  const addCentro = async (data: NovoCentro) => {
    if (!uid) return;
    try {
      await createCentro(uid, data);
      toastMessage("Centro criado com sucesso!", "success");
      await loadCentros();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toastMessage(error.message, "error");
      } else {
        toastMessage("Erro ao criar centro.", "error");
      }
      throw error;
    }
  };

  const removeCentro = async (centroId: string) => {
    if (!uid) return;
    try {
      await deleteCentro(uid, centroId);
      toastMessage("Centro removido!", "success");
      setCentros((prev) => prev.filter((c) => c.id !== centroId));
    } catch {
      toastMessage("Erro ao remover centro.", "error");
    }
  };

  return { centros, isLoading, addCentro, removeCentro };
};
