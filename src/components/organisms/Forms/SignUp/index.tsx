import { Link } from "react-router-dom";
import { Button, Input } from "@/components/atoms";
import { useSignUp } from "@/hooks/useSignUp";

const labelClass = "text-[13px] font-medium text-muted px-1";

export const SignUp = () => {
  const { handleSignUp, isLoadingSignUp } = useSignUp();

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSignUp} aria-busy={isLoadingSignUp}>
      <h2 className="text-xl font-semibold tracking-tight text-ink">Criar conta</h2>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Nome</span>
        <Input name="displayName" placeholder="Como quer ser chamado" type="text" autoComplete="name" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>E-mail</span>
        <Input name="email" placeholder="voce@email.com" type="email" autoComplete="email" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Senha</span>
        <Input
          name="password"
          placeholder="Mínimo de 8 caracteres"
          type="password"
          autoComplete="new-password"
          minLength={8}
        />
      </label>

      <Button
        label={isLoadingSignUp ? "Criando..." : "Criar conta"}
        type="submit"
        size="lg"
        disabled={isLoadingSignUp}
        aria-busy={isLoadingSignUp}
        className="w-full mt-1"
      />

      <p className="text-sm text-muted text-center">
        Já tem conta?{" "}
        <Link to="/login" className="font-semibold text-primary hover:opacity-80">
          Entrar
        </Link>
      </p>
    </form>
  );
};
