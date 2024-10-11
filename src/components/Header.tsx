import { AccountInfo, WalletInfo } from "@aptos-labs/wallet-adapter-react";
import { Box, Button, styled } from "@mui/material";
import logo from "../assets/logo.svg";

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#3a1e09",
    color: "#ffffff",
    border: "1px solid #3a1e09",
    fontFamily: "'Jost', sans-serif",
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#2a160a",
      color: "#ffffff",
    },
    [theme.breakpoints.up("xs")]: {
      padding: "6px 12px",
      fontSize: theme.typography.pxToRem(14),
      lineHeight: 1.4,
    },
    [theme.breakpoints.up("sm")]: {
      padding: "8px 16px",
      fontSize: theme.typography.pxToRem(15),
      lineHeight: 1.45,
    },
    [theme.breakpoints.up("md")]: {
      padding: "9px 17px",
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1.5,
    },
    [theme.breakpoints.up("lg")]: {
      padding: "10px 20px",
      fontSize: theme.typography.pxToRem(18),
      lineHeight: 1.55,
    },
  }));

interface HeaderProps {
    onConnectWallet: () => void;
    connected: boolean;
    wallet: WalletInfo | null;
    account: AccountInfo | null;
  }
  export const Header:React.FC<HeaderProps> = ({
    onConnectWallet,
    connected,
    wallet,
    account,
  }) => {
    const shortenAddress = (address: string) =>
      `${address.slice(0, 5)}...${address.slice(-5)}`;
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <img alt="Logo" src={logo} style={{ maxHeight: 40 }} />
        <CustomButton onClick={onConnectWallet}>
          {connected && wallet && account ? (
            <>
              <img
                alt="Wallet"
                src={wallet.icon}
                style={{ maxHeight: 30, marginRight: 8 }}
              />
              <span>{shortenAddress(account.address)}</span>
            </>
          ) : (
            "Connect Wallet"
          )}
        </CustomButton>
      </Box>
    );
  };