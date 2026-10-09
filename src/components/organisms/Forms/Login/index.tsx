import { Link } from "react-router-dom";
import { Button, Input } from "@/components/atoms";
import { useLogin } from "@/hooks/useLogin";

const labelClass = "text-[13px] font-medium text-muted px-1";

export const Login = () => {
  const { handleLogin, isLoadingLogin } = useLogin();

  return (
    <form className="flex flex-col gap-5" onSubmit={handleLogin} aria-busy={isLoadingLogin}>
      <h2 className="text-xl font-semibold tracking-tight text-ink">Entrar</h2>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>E-mail</span>
        <Input
          name="email"
          placeholder="voce@email.com"
          type="email"
          autoComplete="email"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Senha</span>
        <Input
          name="password"
          placeholder="Sua senha"
          type="password"
          autoComplete="current-password"
          minLength={8}
        />
      </label>

      <Button
        label={isLoadingLogin ? "Entrando..." : "Entrar"}
        type="submit"
        size="lg"
        disabled={isLoadingLogin}
        aria-busy={isLoadingLogin}
        className="w-full mt-1"
      />

      <p className="text-sm text-muted text-center">
        Ainda não tem conta?{" "}
        <Link to="/cadastro" className="font-semibold text-primary hover:opacity-80">
          Criar conta
        </Link>
      </p>
    </form>
  );
};
