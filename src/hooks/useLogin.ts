import { FirebaseError } from "firebase/app";
import { toastMessage } from "@/utils/toastMessage";
import { firebaseErrors } from "@/constants/firebaseErrors";
import { useState } from "react";
import { signIn } from "@/services/firebase/auth";

export const useLogin = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoadingLogin) return;

    const formData = new FormData(event.currentTarget);

    const data = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? "").trim(),
    };

    if (!data.email || !data.password) {
      toastMessage("Preencha todos os campos para fazer login!", "warning");
      return;
    }

    try {
      setIsLoadingLogin(true);
      await signIn(data.email, data.password);
      toastMessage("Login realizado com sucesso!", "success");
      data.email = "";
      data.password = "";
    } catch (error) {
      if (error instanceof FirebaseError) {
        toastMessage(firebaseErrors[error.code] ?? error.message, "error");
      } else {
        toastMessage("Erro inesperado.", "error");
      }
    } finally {
      setIsLoadingLogin(false);
    }
  }
  return {
    handleLogin,
    isLoadingLogin,
  };
};
