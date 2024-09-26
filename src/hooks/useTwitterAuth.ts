import { useEffect, useState } from 'react';
import axios from 'axios';

export const useTwitterAuth = () => {
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code) {
      axios.get(`https://api.aegisid.io/twitter/callback?code=${code}`)
        .then(response => {
          setUserId(response.data.userId)
        })
        .catch(error => {
          console.error('Error fetching user ID:', error)
        })
    }
  }, [])
  const handleAuth = async () => {
        try {
      const response = await axios.get('https://api.aegisid.io/twitter/auth')
      window.location.href = response.data.url
    } catch (error) {
      console.error('Error initiating login:', error)
    }
  };
  const disconnect = () => {
    setUserId(null);
  };

  return { userId, handleAuth, disconnect };
};