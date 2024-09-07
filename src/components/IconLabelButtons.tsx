import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Twitter, LinkedIn, Telegram, Google } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const buttonStyles = {
  width: '250px',
  height: '60px',
  fontSize: '1.25rem',
};

const iconList = [
  { icon: <Twitter />, label: 'Twitter' },
  { icon: <LinkedIn />, label: 'LinkedIn' },
  { icon: <Telegram />, label: 'Telegram' },
  { icon: <Google />, label: 'Google' },
];

const CLIENT_ID = 'YOUR_CLIENT_ID'; 
const REDIRECT_URI = 'http://localhost:3000/callback';

export default function IconLabelButtons() {
  const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);
  const [twitterUserId, setTwitterUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleTwitterCallback(code);
    }
  }, []);

  const toggleDrawer = (label: string) => () => {
    setOpenDrawer(openDrawer === label ? null : label);
  };

  const handleTwitterAuth = () => {
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = twitterAuthUrl;
  };

  const handleTwitterCallback = async (code: string) => {
    try {
      const response = await axios.post('/api/auth/twitter', { code });
      const { userId } = response.data;
      setTwitterUserId(userId);
      setOpenDrawer('Twitter');
    } catch (error) {
      console.error('Error during Twitter authentication:', error);
    }
  };

  const drawerContent = (label: string) => (
    <Box
      sx={{ width: 250, padding: 2 }}
      role="presentation"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{label}</Typography>
        <IconButton onClick={toggleDrawer(label)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        {label === 'Twitter' && twitterUserId ? (
          <>
            <Typography variant="body1" gutterBottom>Twitter User ID: {twitterUserId}</Typography>
            <Button variant="contained" color="secondary" onClick={() => setTwitterUserId(null)}>
              Disconnect Twitter
            </Button>
          </>
        ) : (
          <Button 
            variant="contained" 
            color="primary"
            onClick={label === 'Twitter' ? handleTwitterAuth : undefined}
          >
            Verify {label}
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Stack spacing={2} direction="column" alignItems="center">
        {iconList.map(({ icon, label }) => (
          <React.Fragment key={label}>
            <Button
              variant="contained"
              startIcon={icon}
              sx={buttonStyles}
              onClick={toggleDrawer(label)}
            >
              {label}
            </Button>
            <SwipeableDrawer
              anchor="right"
              open={openDrawer === label}
              onClose={toggleDrawer(label)}
              onOpen={toggleDrawer(label)}
            >
              {drawerContent(label)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
}