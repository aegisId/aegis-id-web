import { useState, useEffect } from 'react';
import { TELEGRAM_BOT_NAME } from '../config/authConfig';

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void;
    };
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export const useTelegramAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.setAttribute('data-telegram-login', TELEGRAM_BOT_NAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    document.body.appendChild(script);

    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => {
        setUser(user);
        setUserId(user.id.toString());
        // You may want to send this data to your backend for verification
        // sendToBackend(user);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAuth = () => {
    console.log("TELEGRAM_BOT_NAME",TELEGRAM_BOT_NAME)
    // Telegram login is handled by the widget, so we don't need to do anything here
    // You could potentially trigger the widget to open programmatically if needed
    console.log('Telegram login widget should be visible');
  };

  const disconnect = () => {
    setUserId(null);
    setUser(null);
    // Note: Telegram doesn't provide a way to "log out" via the widget
    // You'll need to handle this on your backend if you're storing sessions
  };

  return { userId, user, handleAuth, disconnect };
};

// Uncomment and implement this function if you need to verify the user on your backend
// const sendToBackend = async (user: TelegramUser) => {
//   try {
//     const response = await fetch('/api/auth/telegram', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });
//     const data = await response.json();
//     // Handle the response as needed
//   } catch (error) {
//     console.error('Error sending Telegram user data to backend:', error);
//   }
// };