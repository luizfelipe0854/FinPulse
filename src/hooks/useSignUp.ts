import { FirebaseError } from "firebase/app";
import { createUser } from "@/services/firebase/auth";
import { toastMessage } from "@/utils/toastMessage";
import { firebaseErrors } from "@/constants/firebaseErrors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoadingSignUp) return;

    const formData = new FormData(event.currentTarget);

    const data = {
      displayName: String(formData.get("displayName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? "").trim(),
    };

    if (!data.displayName || !data.email || !data.password) {
      toastMessage(
        "Preencha todos os campos para criar um usuário!",
        "warning",
      );
      return;
    }

    try {
      setIsLoadingSignUp(true);
      await createUser(data.email, data.password, data.displayName);
      toastMessage("Usuário criado com sucesso!", "success");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toastMessage(firebaseErrors[error.code] ?? error.message, "error");
      } else {
        toastMessage("Erro inesperado.", "error");
      }
    } finally {
      setIsLoadingSignUp(false);
    }
  }
  return {
    handleSignUp,
    isLoadingSignUp,
  };
};
