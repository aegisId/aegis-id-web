import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND } from '../utils/helper';

export const useTwitterAuth = () => {
  const [userId, setUserId] = useState(null)
  const [twitterLoading, setTwitterLoading] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')  
    if (code) {
      axios.get(`${BACKEND}/twitter/callback?code=${code}`)
        .then(response => {
          setUserId(response.data.userId)
          setTwitterLoading(true)
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(error => {
          console.error('Error fetching user ID:', error)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleAuth = async () => {
        try {
      const response = await axios.get(`${BACKEND}/twitter/auth`)
      window.location.href = response.data.url
    } catch (error) {
      console.error('Error initiating login:', error)
    }
  };
  const disconnect = () => {
    setUserId(null);
  };

  return { userId, twitterLoading, handleAuth, disconnect };
};