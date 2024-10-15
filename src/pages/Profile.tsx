import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import WalletConnectionModal from "../components/connectwallet";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  getAccountAge,
  getProtocolsInteracted,
  getTotalNumberOfTransaction,
} from "../utils/helper";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChainData } from "../components/OnChainActivity";
import { OnChain } from "../components/Onchain";
import { Bio } from "../components/Bio";
import { ImportKyc } from "../components/importKyc";
import { Social } from "../components/Social";

const ProfileSection = () => {
  const { connected } = useWallet();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRight: { xs: "none", md: "1px solid #3a1e091a" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: { xs: "200px", sm: "250px", md: "300px" },
          aspectRatio: "1 / 1",
          position: "relative",
          border: "1px solid #3a1e09",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#3a1e09",
              fontWeight: "bold",
              fontSize: { xs: "4rem", sm: "5rem", md: "7rem", lg: "8rem" },
              lineHeight: 1,
            }}
          >
            0
          </Typography>
          <Typography
            sx={{
              color: "#3a1e09",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              fontWeight: "bold",
              mt: 1,
            }}
          >
            Humanity Score
          </Typography>
        </Box>
      </Box>
      {!connected && (
        <Typography
          variant="body1"
          sx={{ color: "#3a1e09", textAlign: "center" }}
        >
          Connect your wallet to see your profile
        </Typography>
      )}
    </Box>
  );
};

interface ActionButtonsProps {
  onActionClick: (action: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onActionClick }) => {
  const actions: string[] = [
    "Social Media",
    "Biometrics and Liveliness",
    "Import KYC",
    "On-chain activity",
  ];

  const [selectedAction, setSelectedAction] = useState<string>(actions[0]);

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    onActionClick(action);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {actions.map((action) => (
        <Grid item xs={12} sm={6} md={3} key={action}>
          <Button
            variant={selectedAction === action ? "contained" : "outlined"}
            fullWidth
            sx={{
              borderRadius: 0,
              bgcolor: selectedAction === action ? "#3a1e09" : "transparent",
              borderColor: "#3a1e09",
              color: selectedAction === action ? "white" : "#3a1e09",
              padding: { xs: "10px 0", sm: "12px 0" },
              height: "100%",
              transition: "background-color 0.3s",
            }}
            onClick={() => handleActionClick(action)}
          >
            {action}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const Profile: React.FC = () => {
  const { connected, wallet, account } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(
    "Social Media"
  );
  type ProtocolsInteractedResponse = {
    protocal: {
      kanalabs: number;
      hippo: number;
      amnis: number;
      areis: number;
      cellana: number;
      chingari: number;
      eragon: number;
      liquidswapV0: number;
      merkle: number;
      panora: number;
      thalaLsd: number;
      thalaProtocol: number;
    };
    totalGas: number;
  };

  const [accountAge, setAccountAge] = useState<Date>();
  const [totalTransactions, setTotalTransactions] = useState<string>();
  const [protocolsInteracted, setProtocolsInteracted] =
    useState<ProtocolsInteractedResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [age, transactions, protocols] = await Promise.all([
            getAccountAge(account?.address!),
            getTotalNumberOfTransaction(account?.address!),
            getProtocolsInteracted(account?.address!),
          ]);

          setAccountAge(age!);
          setTotalTransactions(transactions);
          setProtocolsInteracted(protocols!);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setAccountAge(undefined);
      setTotalTransactions(undefined);
      setProtocolsInteracted(undefined);
    }
  }, [account, account?.address, connected]);
  useEffect(() => {
    if (connected) {
      setIsModalOpen(false);
    }
  }, [connected]);

  const handleConnectWallet = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Header
          onConnectWallet={handleConnectWallet}
          connected={connected}
          wallet={wallet}
          account={account}
        />

        <Grid container spacing={4} sx={{ my: 4 }}>
          <Grid item xs={12} md={3}>
            <ProfileSection />
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <OnChain
                transactions={Number(totalTransactions)}
                age={accountAge!}
                totalGas={protocolsInteracted?.totalGas!}
                loading={loading}
              />
              <ActionButtons onActionClick={handleActionClick} />
              {selectedAction === "Social Media" && <Social />}
              {selectedAction === "Biometrics and Liveliness" && <Bio />}
              {selectedAction === "Import KYC" && <ImportKyc />}
              {selectedAction === "On-chain activity" && (
                <ChainData
                  protocols={protocolsInteracted?.protocal!}
                  totalGas={protocolsInteracted?.totalGas!}
                  transactions={Number(totalTransactions)}
                  age={accountAge!}
                  isloading={loading}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <WalletConnectionModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default Profile;

