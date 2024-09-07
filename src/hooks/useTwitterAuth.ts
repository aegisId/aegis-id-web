import { useState, useEffect } from 'react';
import axios from 'axios';
import { TWITTER_CLIENT_ID, TWITTER_REDIRECT_URI } from '../config/authConfig';

export const useTwitterAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleTwitterCallback(code);
    }
  }, []);

  const handleAuth = () => {
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${TWITTER_REDIRECT_URI}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = twitterAuthUrl;
  };

  const handleTwitterCallback = async (code: string) => {
    try {
      const response = await axios.post('/api/auth/twitter', { code });
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error during Twitter authentication:', error);
    }
  };

  const disconnect = () => {
    setUserId(null);
    // Add any additional cleanup or API calls needed for disconnection
  };

  return { userId, handleAuth, disconnect };
};