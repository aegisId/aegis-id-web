import { useEffect, useState } from "react";
import { BACKEND } from "../utils/helper";

export const useTelegramAuth = () => {
  const [userId, setUserId] = useState('null');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      setUserId(id);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleTelegramAuth = async () => {
    try {
      window.location.href = `${BACKEND}/telegram/login`;
    } catch (error) {
      console.error("Error initiating login:", error);
    }
  };

  return { userId, handleTelegramAuth };
};
