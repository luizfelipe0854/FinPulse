import FinPulseLogo from "@/assets/FinPulse.svg";
import { Button, Text } from "@/components/atoms";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img src={FinPulseLogo} alt="FinPulse Logo" className="w-32 h-32" />
      <Text as="h1" variant="title">
        Bem-vindo(a) ao FinPulse!
      </Text>
      <Text as="p" variant="body" moreProps="text-center">
        Controle total das suas finanças, com clareza e simplicidade.
      </Text>
      <Button
        label="Acessar Dashboard"
        variant="primary"
        moreProps="w-50 h-10 mt-4"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};
