import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Twitter, Telegram, Google, LinkedIn,  } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTwitterAuth } from '../hooks/useTwitterAuth';
// import { useLinkedInAuth } from '../hooks/';
import { useTelegramAuth } from '../hooks/useTelegramAuth';
// import { useGoogleAuth } from '../hooks/useGoogleAuth';

const buttonStyles = {
  width: '250px',
  height: '60px',
  fontSize: '1.25rem',
};

const iconList = [
  { icon: <Twitter />, label: 'Twitter', useAuth: useTwitterAuth },
  { icon: <LinkedIn />, label: 'Discord', useAuth: useTwitterAuth },
  { icon: <Telegram />, label: 'Telegram', useAuth: useTelegramAuth },
  { icon: <Google />, label: 'Google', useAuth: useTwitterAuth },
];

export default function SocialAuthButtons() {
  const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);

  const toggleDrawer = (label: string) => () => {
    setOpenDrawer(openDrawer === label ? null : label);
  };

  const drawerContent = (label: string) => {
    console.log("🚀 ~ drawerContent ~ label:", label)
    const { userId, handleAuth, disconnect } = iconList.find(item => item.label === label)!.useAuth();

    return (
      <Box sx={{ width: 250, padding: 2 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{label}</Typography>
          <IconButton onClick={toggleDrawer(label)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
          {userId ? (
            <>
              <Typography variant="body1" gutterBottom>{label} User ID: {userId}</Typography>
              <Button variant="contained" color="secondary" onClick={disconnect}>
                Disconnect {label}
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAuth}>
              Verify {label}
            </Button>
          )}
        </Box>
      </Box>
    );
  };

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