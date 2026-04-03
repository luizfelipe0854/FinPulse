import { Button, Input, Text } from "@/components/atoms";
import { useSignUp } from "@/hooks/useSignUp";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const { handleSignUp, isLoadingSignUp } = useSignUp();
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
      onSubmit={handleSignUp}
      aria-busy={isLoadingSignUp}
    >
      <div className="flex flex-col gap-1 text-center">
        <Text as="h1" variant="title" size="lg">
          Criar Conta
        </Text>
        <Text as="p" variant="body" size="sm">
          Preencha os campos para criar sua conta.
        </Text>
      </div>
      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Nome:
        </Text>
        <Input name="displayName" placeholder="Digite seu nome" type="text" />
      </label>
      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          E-mail:
        </Text>
        <Input
          name="email"
          placeholder="Digite seu e-mail"
          type="email"
          autoComplete="email"
        />
      </label>
      <label className="flex flex-col gap-1">
        <Text as="span" variant="body" size="sm">
          Senha:
        </Text>
        <Input
          name="password"
          placeholder="Digite sua senha"
          type="password"
          autoComplete="new-password"
          minLength={8}
        />
      </label>
      <div className="flex flex-col justify-center items-center w-full">
        <Button
          label={isLoadingSignUp ? "Criando..." : "Registrar"}
          variant="primary"
          aria-busy={isLoadingSignUp}
          type="submit"
          disabled={isLoadingSignUp}
          className="w-full h-10"
        />
        <Text as="span" variant="body" size="sm" className="mt-2 cursor-pointer">
          <a onClick={() => navigate("/login")}>Já possui conta? Faça login</a>
        </Text>
      </div>
    </form>
  );
};
