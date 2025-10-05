import { useState, useEffect } from "react";
import { User, AuthState } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/routes";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const { getItem, setItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const storedAuth = getItem(STORAGE_KEYS.AUTH);
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, [getItem]);

  const login = (user: User) => {
    const newAuthState = { isAuthenticated: true, user };
    setAuthState(newAuthState);
    setItem(STORAGE_KEYS.AUTH, JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    removeItem(STORAGE_KEYS.AUTH);
  };

  return { authState, login, logout };
};
