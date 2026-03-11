import { Login } from "@/components/organisms";
import FinPulseLogo from "@/assets/FinPulse.svg";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img
        src={FinPulseLogo}
        alt="FinPulse Logo"
        className="w-32 h-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <Login />
    </div>
  );
};
