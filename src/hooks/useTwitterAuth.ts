import { useState } from 'react';
import axios from 'axios';

export const useTwitterAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const backendHost = "https://api.aegisid.io";

  const missionEndpoints = {
    twitterAuthlink: "/twitter/authlink",
  }
  const defaultCreds = {
    oauthToken: "",
    oauthVerifier: "",
  };
  const [twitterCreds, setTwitterCreds] = useState(defaultCreds);
  console.log("🚀 ~ useTwitterAuth ~ twitterCreds:", twitterCreds)


  const handleAuth = async () => {
    setTwitterCreds(defaultCreds); // Reset tokens on every auth attempt
    const authlinkEndpoint: URL = new URL(
      missionEndpoints.twitterAuthlink,
      backendHost
    );
    const api = axios.create({
    baseURL: "https://api.aegisid.io",
    withCredentials: true,
  });

    const response = await api.post(authlinkEndpoint.href).catch((err) => {});
    if (response?.status === 200) {
      const oauth_token =
        new URL(response.data.authlink).searchParams.get("oauth_token") || "";
      setTwitterCreds((prevCreds) => ({
        ...prevCreds,
        oauth_token,
      }));
      const twitterPopup = window.open(
        response.data.authlink,
        "twitterPopup",
        "width=500"
      );
      window.onmessage = (ev) => {
        if (ev.data.eventType === "twitter oauth") {
          setTwitterCreds({
            oauthToken: ev.data.oauth_token,
            oauthVerifier: ev.data.oauth_verifier,
          });
          twitterPopup?.close();
        }
      };
    }
  };
  const disconnect = () => {
    setUserId(null);
  };

  return { userId, handleAuth, disconnect };
};