import { useState, useEffect } from "react";

export const useLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getItem = (key: string): string | null => {
    if (!isClient) return null;
    return window.localStorage.getItem(key);
  };

  const setItem = (key: string, value: string): void => {
    if (!isClient) return;
    window.localStorage.setItem(key, value);
  };

  const removeItem = (key: string): void => {
    if (!isClient) return;
    window.localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};
