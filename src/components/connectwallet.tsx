import { Box, Modal, Paper, Typography, IconButton, Grid, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  isRedirectable,
  useWallet,
  Wallet,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react";
import { useMemo } from "react";
import { proveAndVerify } from "../utils/verify";

interface WalletConnectionModalProps {
  open: boolean;
  onClose: () => void;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  open,
  onClose,
}) => {
  const { wallets, connect, disconnect, wallet } = useWallet();
  const [aptosdetected] = useMemo(() => {
    const aptosdetected: any = [];
    for (const wallet of wallets!) {
      const isWalletReady =
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable;
      const mobileSupport = (wallet as Wallet).deeplinkProvider;
      if (isWalletReady) {
        aptosdetected.push(wallet);
      } else if (!isWalletReady && isRedirectable()) {
        if (mobileSupport) {
          aptosdetected.push(wallet);
        }
      }
    }
    const otherWallets = aptosdetected
      .filter((item: any) => item.name !== "T wallet")
      .sort((a: any, b: any) => {
        const order = [
          "Continue with Google",
          "Petra",
          "Pontem",
          "Martian",
          "Fewcha",
          "Rise",
          "Nightly",
        ];
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);

        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    return [otherWallets];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets]);

  const handleWalletConnect = (walletName: any) => {
    proveAndVerify('')
    connect(walletName);
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open} timeout={225}>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          sx={{
            opacity: 1,
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
            bgcolor: "#ffffffe6",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              width: { xs: "85%", sm: "380px" },
              p: { xs: 2, sm: 3 },
              border: "1px solid #3a1e09",
              bgcolor: "white",
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)", 
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: "Manrope-Medium, Helvetica",
                  color: "#3a1e09",
                  fontWeight: "600",
                  fontSize: { xs: "0.875rem", sm: "1rem" }, 
                }}
              >
                Connect Wallet
              </Typography>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  color: "#3a1e09",
                  fontWeight: "600",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={1} sx={{ mt: 1 }}> {/* Reduced spacing */}
              {aptosdetected && aptosdetected.length > 0 ? (
                aptosdetected.map((item: any, key: any) => (
                  <Grid
                    item
                    xs={12}
                    key={key}
                    onClick={() => handleWalletConnect(item.name)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1.5}  
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(1,1,1,0.45)",
                          borderRadius: "1.25rem",
                        },
                      }}
                    >
                      {item.icon && (
                        <img
                          className="w-12 h-12"
                          src={item.icon}
                          alt={item.name}
                          width={36}
                          height={36}
                        />
                      )}
                      <Typography
                        variant="body1"
                        sx={{ flex: 1, ml: 2, fontWeight: "bold", fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {item.name}
                      </Typography>
                      {item.name === wallet?.name && (
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                          sx={{
                            fontFamily: "Manrope-Medium, Helvetica",
                            fontWeight: 800,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            cursor: "pointer",
                            gap: { xs: "0.5rem", sm: "1rem" },
                          }}
                          onClick={() => disconnectWallet()}
                        >
                          <Typography
                            variant="body1"
                            sx={{ flex: 1, ml: 2, fontWeight: "bold" }}
                          >
                            Disconnect
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      py: 1.5,
                      textAlign: "center",
                      color: "#FFFFFFCC",
                      fontWeight: "800",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    No Aptos Wallets Found
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WalletConnectionModal;
