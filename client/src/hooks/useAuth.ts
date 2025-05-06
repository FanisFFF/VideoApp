// src/hooks/useAuth.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useLoginMutation, useRegisterMutation } from "@/api/authApi";
import { setCredentials, logout } from "@/features/auth/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);

  const [loginMutation, { data: loginData, isSuccess: loggedIn, error: loginError, isLoading: loggingIn }] = useLoginMutation();
  const [registerMutation, { data: registerData, isSuccess: registered, error: registerError, isLoading: registering }] = useRegisterMutation();

  useEffect(() => {
    if (loggedIn && loginData) {
      dispatch(setCredentials(loginData));
    }
  }, [loggedIn, loginData, dispatch]);

  useEffect(() => {
    if (registered && registerData) {
      dispatch(setCredentials(registerData));
    }
  }, [registered, registerData, dispatch]);

  const login = (creds: { email: string; password: string }) => loginMutation(creds);
  const register = (creds: { name: string; email: string; password: string }) => registerMutation(creds);
  const logoutUser = () => dispatch(logout());
  return {
    user,
    token,
    isAuthenticated,
    loggingIn,
    registering,
    loginError,
    registerError,
    login,
    register,
    logout: logoutUser,
  };
  
}
