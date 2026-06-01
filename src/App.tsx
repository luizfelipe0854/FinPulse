import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "@/routes";
import { AuthProvider } from "@/contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}
