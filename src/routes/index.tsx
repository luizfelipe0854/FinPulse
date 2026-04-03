import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { LoginPage } from "@/components/pages/LoginPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { NotFoundPage } from "@/components/pages/NotFound";
import { DashboardPage } from "@/components/pages/Dashboard";

import { Home } from "@/components/pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
