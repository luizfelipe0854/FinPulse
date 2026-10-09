import { useNavigate } from "react-router-dom";
import AlienShip from "@/assets/AlienShip.svg";
import { Button } from "@/components/atoms";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface rounded-[28px] shadow-card p-8 flex flex-col items-center text-center gap-3">
        <div className="size-20 rounded-full bg-surface-2 flex items-center justify-center mb-1">
          <img src={AlienShip} alt="" className="size-12" />
        </div>
        <p className="money text-5xl font-bold tracking-tight text-ink">404</p>
        <p className="text-[15px] text-muted">Essa página foi abduzida. Não encontramos nada aqui.</p>
        <Button label="Voltar para o início" shape="pill" className="mt-3" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};
