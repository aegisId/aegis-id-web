import { useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  id: number; 
  message: React.ReactNode;
  severity: AlertColor;
}

let idCounter = 0; 

const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const showNotification = useCallback((message: React.ReactNode, severity: AlertColor = 'info') => {
    const newNotification = { id: idCounter++, message, severity };
    setNotifications((prev) => [...prev, newNotification]);
  }, []);

  const showSuccessHash = useCallback((message: string, fullUrl: string) => {
    const hash = fullUrl.split('/').pop()?.split('?')[0];
    const explorerLink = (
      <a href={fullUrl} target="_blank" rel="noopener noreferrer">
        {hash}
      </a>
    );
    showNotification(
      <>
        {message} {explorerLink}
      </>
      , 'success'
    );
  }, [showNotification]);

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error');
  }, [showNotification]);

  const showWarning = useCallback((message: string) => {
    showNotification(message, 'warning');
  }, [showNotification]);

  const showInfo = useCallback((message: string) => {
    showNotification(message, 'info');
  }, [showNotification]);

  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const NotificationComponent = (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id} 
          open={true} 
          autoHideDuration={4000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => handleClose(notification.id)} severity={notification.severity} variant="filled">
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showSuccessHash,
    NotificationComponent,
  };
};

export default useNotification;
