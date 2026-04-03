import { Button, Text, Input } from "@/components/atoms";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { handleLogin, isLoadingLogin } = useLogin();
  const navigate = useNavigate();
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
      onSubmit={handleLogin}
      aria-busy={isLoadingLogin}
    >
      <div className="flex flex-col gap-1 text-center">
        <Text as="h1" variant="title" size="lg">
          Login
        </Text>
        <Text as="p" variant="body" size="sm">
          Preencha os campos para fazer login.
        </Text>
      </div>
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
          label={isLoadingLogin ? "Entrando..." : "Entrar"}
          variant="primary"
          aria-busy={isLoadingLogin}
          type="submit"
          disabled={isLoadingLogin}
          className="w-full h-10"
        />
        <Text as="span" variant="body" size="sm" className="mt-2 cursor-pointer">
          <a onClick={() => navigate("/cadastro")}>
            Não possui conta? Cadastre-se
          </a>
        </Text>
      </div>
    </form>
  );
};
