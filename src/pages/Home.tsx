import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Skeleton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import logo from "../assets/logo.svg";
import logo_light from "../assets/logo_light.svg";
import twitter from "../assets/twitter.svg";
import WalletConnectionModal from "../components/connectwallet";
import {
  AccountInfo,
  useWallet,
  WalletInfo,
} from "@aptos-labs/wallet-adapter-react";
import { useTwitterAuth } from "../hooks/useTwitterAuth";
import {
  getAccountAge,
  getProtocolsInteracted,
  getTotalNumberOfTransaction,
} from "../utils/helper";
import { proveAndVerify } from "../utils/verify";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3a1e09",
  color: theme.palette.common.white,
  fontFamily: "'Jost-Medium', Helvetica",
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#2a160a",
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

const ProfileSection = () => {
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
      {/* Profile Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: { xs: "200px", sm: "250px", md: "300px" },
          aspectRatio: "1 / 1",
          position: "relative",
          border: "1px solid #3a1e09",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Humanity Score Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
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

        {/* Verified Status Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "30%",
            backgroundColor: "#3a1e09",
          }}
        >
          <Typography
            sx={{
              color: "#f5e6d3",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              fontWeight: "bold",
            }}
          >
            Verified
          </Typography>
          <Typography
            sx={{
              color: "#f5e6d3",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            }}
          >
            0/12
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body1"
        sx={{ color: "#3a1e09", textAlign: "center" }}
      >
        Connect your wallet to see your profile
      </Typography>
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
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {actions.map((action) => (
        <Button
          key={action}
          variant={selectedAction === action ? "contained" : "outlined"}
          sx={{
            bgcolor: selectedAction === action ? "#3a1e09" : "transparent",
            borderColor: "#3a1e09",
            color: selectedAction === action ? "white" : "#3a1e09",
            flex: { xs: "1 0 40%", sm: "1 0 auto" },
          }}
          onClick={() => handleActionClick(action)}
        >
          {action}
        </Button>
      ))}
    </Box>
  );
};

const TaskList = () => {
  const tasks = [
    { name: "Connect with X", description: "Link your X account", points: 7 },
    {
      name: "Connect with Discord",
      description: "Link your Discord account",
      points: 5,
    },
    {
      name: "Connect with LinkedIn",
      description: "Link your LinkedIn account",
      points: 8,
    },
  ];

  const { userId, handleAuth } = useTwitterAuth();

  const handleTaskClick = async (task: {
    name: any;
    description?: string;
    points?: number;
  }) => {
    if (task.name === "Connect with X") {
      if (!userId) {
        await handleAuth();
      }
      if (userId) {
        proveAndVerify(userId);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {tasks.map((task, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="center"
          sx={{
            cursor: "pointer",
            "&:hover .task-box": {
              backgroundColor: "#fef6eb",
            },
          }}
          onClick={() => handleTaskClick(task)}
        >
          <Grid item xs={2} sm={1}>
            <Box
              className="task-box"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                aspectRatio: "1/1",
                border: "1px solid #3a1e09",
                transition: "background-color 0.3s",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#3a1e09", fontWeight: "bold" }}
              >
                {index + 1}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Box
              className="task-box"
              sx={{
                p: 2,
                border: "1px solid #3a1e09",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.3s",
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ color: "#3a1e09", fontWeight: "bold" }}
                >
                  {task.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#3a1e09" }}>
                  {task.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#3a1e09", fontWeight: "bold" }}
                >
                  {task.points} Points
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Box
              className="task-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: 56, md: 72 },
                height: { xs: 48, sm: 56, md: 72 },
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
                border: "1px solid #3a1e09",
                aspectRatio: "1 / 1",
                maxWidth: { xs: 56, sm: 72, md: "none" },
                transition: "background-color 0.3s",
              }}
            >
              <ArrowForwardIcon
                sx={{
                  width: { xs: 20, sm: 24, md: 32 },
                  height: { xs: 20, sm: 24, md: 32 },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "#1b0b00",
      pt: 5,
      pb: 3,
      px: 5,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Container maxWidth="xl">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} container justifyContent="center">
          <img alt="Container" src={logo_light} />
        </Grid>
        <Grid item xs={12} sm={4} container justifyContent="center">
          <Grid item>
            <Link
              href="/"
              sx={{
                color: "#F3F4F6",
                fontFamily: "Manrope-Medium, Helvetica",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: "500",
                textDecoration: "none",
                mr: { xs: 2, sm: 5 },
              }}
            >
              About Us
            </Link>
            <Link
              href="/"
              sx={{
                color: "#F3F4F6",
                fontFamily: "Manrope-Medium, Helvetica",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              App
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} container justifyContent="center">
          <a
            href="https://x.com/aegisid_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="List" src={twitter} />
          </a>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderTop: 1,
          borderColor: "#374151",
          mt: 6,
          pt: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#D1D5DB",
            fontFamily: "Manrope-Regular, Helvetica",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          © Copyright 2024, All Rights Reserved
        </Typography>
      </Box>
    </Container>
  </Box>
);
interface HeaderProps {
  onConnectWallet: () => void;
  connected: boolean;
  wallet: WalletInfo | null;
  account: AccountInfo | null;
}
const Header: React.FC<HeaderProps> = ({
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

interface OnChainProps {
  transactions: number | null;
  age: Date | null;
  totalGas: number | null;
  loading: boolean;
}

const OnChain = ({
  transactions,
  age,
  totalGas,
  loading,
}: OnChainProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const calculateAgeInDays = (startDate: Date): number => {
    const today = new Date();
    const timeDifference = today.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {["Account Age", "Total Transactions", "Total Gas"].map(
        (title, index) => (
          <Grid item xs={12} sm={4} key={title}>
            <Box textAlign="center" mb={isMobile ? 2 : 0}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  height: "100%",
                  borderLeft:
                    index === 1
                      ? { xs: "none", sm: "1.5px solid #3a1e091a" }
                      : "none",
                  borderRight:
                    index === 1
                      ? { xs: "none", sm: "1.5px solid #3a1e091a" }
                      : "none",
                }}
              >
                {/* Display Skeleton while loading */}
                {index === 1 ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: 90, sm: 100 },
                      height: { xs: 90, sm: 100 },
                      margin: "auto",
                      borderRadius: "50%",
                      border: "4px solid #3a1e09",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <Skeleton
                        variant="circular"
                        width={isMobile ? 90 : 100}
                        height={isMobile ? 90 : 100}
                      />
                    ) : (
                      <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                          color: "#3a1e09",
                          fontWeight: "bold",
                        }}
                      >
                        {transactions ? transactions.toLocaleString() : "0"}
                      </Typography>
                    )}
                  </Box>
                ) : loading ? (
                  <Skeleton
                    variant="text"
                    width={isMobile ? 80 : 120}
                    height={isMobile ? 40 : 60}
                  />
                ) : (
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    color="#3a1e09"
                    fontWeight="bold"
                  >
                    {index === 0
                      ? age
                        ? `${calculateAgeInDays(age)} Days`
                        : "0"
                      : totalGas
                      ? totalGas
                      : "0"}
                  </Typography>
                )}

                {index === 2 && totalGas ? (
                  <Typography
                    variant={isMobile ? "h5" : "h6"}
                    color="#3a1e09"
                    fontWeight="bold"
                  >
                    APT
                  </Typography>
                ) : (
                  ""
                )}

                <Typography variant="subtitle1" color="#3a1e09" mt={1}>
                  {title}
                </Typography>

                <Typography variant="body2" color="#3a1e09" mt={0.5}>
                  {index === 1 && age && !loading
                    ? `${age.toLocaleString("default", {
                        month: "short",
                      })} ${age.getFullYear()} - Present`
                    : ""}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )
      )}
    </Grid>
  );
};
interface ChainDataProps {
  protocols: {
    kanalabs: number;
    hippo: number;
  } | null;
  totalGas: number | null;
  transactions: number | null;
  age: Date | null;
  isloading: boolean;
}

const ChainData = ({
  protocols,
  totalGas,
  transactions,
  age,
  isloading,
}: ChainDataProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={1} alignItems="center">
      {[
        {
          title: "Protocols",
          value: isloading ? (
            <Skeleton variant="text" width={isMobile ? 100 : 150} />
          ) : protocols ? (
            `${protocols.kanalabs ?? 0} (Kanalabs), ${
              protocols.hippo ?? 0
            } (Hippo)`
          ) : (
            "N/A"
          ),
        },
        {
          title: "Total Gas",
          value: isloading ? (
            <Skeleton variant="text" width={isMobile ? 50 : 100} />
          ) : totalGas ? (
            `${totalGas} APT`
          ) : (
            "N/A"
          ),
        },
        {
          title: "Transactions",
          value: isloading ? (
            <Skeleton variant="text" width={isMobile ? 50 : 100} />
          ) : transactions ? (
            `${transactions}`
          ) : (
            "N/A"
          ),
        },
        {
          title: "Account Age",
          value: isloading ? (
            <Skeleton variant="text" width={isMobile ? 100 : 150} />
          ) : age ? (
            age.toDateString()
          ) : (
            "N/A"
          ),
        },
      ].map((item, index) => (
        <Grid item xs={12} sm={6} key={item.title}>
          <Box textAlign="center" mb={isMobile ? 2 : 0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
                height: "100%",
                borderLeft:
                  index === 1
                    ? { xs: "none", sm: "1.5px solid #3a1e091a" }
                    : "none",
                borderRight:
                  index === 1
                    ? { xs: "none", sm: "1.5px solid #3a1e091a" }
                    : "none",
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                color="#3a1e09"
                fontWeight="bold"
              >
                {item.value}
              </Typography>
              <Typography variant="subtitle1" color="#3a1e09" mt={1}>
                {item.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const Home: React.FC = () => {
  const { connected, wallet, account } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(
    "Social Media"
  );
  type ProtocolsInteractedResponse = {
    protocal: {
      kanalabs: number;
      hippo: number;
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
              {selectedAction === "Social Media" && <TaskList />}
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

export default Home;
