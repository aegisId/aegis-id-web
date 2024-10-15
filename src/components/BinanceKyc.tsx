import React from "react";
import { Box, Typography, Button, Paper, Dialog } from "@mui/material";
import { useAppKitAccount } from "@reown/appkit/react";
import { verifyBinance } from "../utils/helper";
import useNotification from "../hooks/useNotification";

interface BinanceFrame {
  open: boolean;
  onClose: () => void;
  setBinanceVerifed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BinanceFrame: React.FC<BinanceFrame> = ({
  open,
  onClose,
  setBinanceVerifed,
}) => {
  const { showError,showSuccess, NotificationComponent } = useNotification();

  const { address, isConnected } = useAppKitAccount();
  const handleVerify = async (address: string) => {
    if (address && isConnected) {
      const data = await verifyBinance(address);
      if (data) {
        showSuccess("Binance KYC Success");
        setBinanceVerifed(true);
      } else {
        showError("Binance KYC Failed");
      }
    }
  };
  return (
    <>
      {NotificationComponent}
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            position: "relative",
            zIndex: 0,
          },
        }}
        sx={{ zIndex: 1 }}
      >
        <Paper
          elevation={1}
          sx={{
            maxWidth: "624px",
            p: { xs: 2, sm: 4 },
            border: "1px solid #3a1e09",
            bgcolor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box>
              <Typography
                variant="h6"
                mr={4}
                sx={{
                  color: "#3a1e09",
                  fontWeight: "600",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Connect with Binance KYC
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "#3a1e09",
                fontWeight: "600",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              6 Points
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            width="100%"
            mt={2}
          >
            <w3m-button />
          </Box>

          <Box display="flex" width="100%" mt={2}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 0,
                flex: 1,
                borderColor: "#3a1e09",
                color: "#3a1e09",
                textTransform: "none",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                p: { xs: "6px 12px", sm: "8px 16px" },
              }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{
                flex: 1,
                bgcolor: "#3a1e09",
                color: "white",
                textTransform: "none",
                ml: 2,
                borderRadius: 0,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                p: { xs: "6px 12px", sm: "8px 16px" },
                "&:hover": { bgcolor: "#2c1608" },
              }}
              disabled={!isConnected}
              onClick={() => handleVerify(address!)}
            >
              Verify
            </Button>
          </Box>
        </Paper>
      </Dialog>
    </>
  );
};
