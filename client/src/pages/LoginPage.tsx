import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const navigate = useNavigate();

  const {isAuthenticated,} =  useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginForm/>
  );
}
