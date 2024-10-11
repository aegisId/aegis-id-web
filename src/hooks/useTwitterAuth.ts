import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useTwitterAuth = () => {
  const navigate = useNavigate(); 
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    console.log("🚀 ~code:", code)
  
    if (code) {
      axios.get(`https://api.aegisid.io/twitter/callback?code=${code}`)
        .then(response => {
          console.log("response.data.userId",response.data.userId)
          setUserId(response.data.userId)
          navigate('/profile');
        })
        .catch(error => {
          console.error('Error fetching user ID:', error)
        })
    }
  }, [navigate])
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