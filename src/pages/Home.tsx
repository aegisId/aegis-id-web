import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";
import SecurityIcon from "../assets/SecurityIcon.svg";
import DevicesIcon from "../assets/DevicesIcon.svg";
import PersonIcon from "../assets/PersonIcon.svg";
import CreditScoreIcon from "../assets/CreditScoreIcon.svg";
import VerifiedUserIcon from "../assets/VerifiedUserIcon.svg";
import SybilIcon from "../assets/SybilIcon.svg";
import FactCheckIcon from "../assets/FactCheckIcon.svg";
import FolderCheck from "../assets/FolderCheck.svg";
import NotificationsIcon from "../assets/NotificationsIcon.svg";
import MouseIcon from "../assets/MouseIcon.svg";
import AssignmentTurnedInIcon from "../assets/AssignmentTurnedInIcon.svg";
import Streamlined from "../assets/Streamline.svg";
import CheckCircleIcon from "../assets/CheckCircleIcon.svg";
import AppRegistrationIcon from "../assets/AppRegistrationIcon.svg";
import MoreHorizIcon from "../assets/MoreHorizIcon.svg";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import logo_light from "../assets/logo_light.svg";
import twitter from "../assets/twitter.svg";
import logo from "../assets/logo.svg";
import StringImage from "../assets/String.svg";
import StringImageFlip from "../assets/StringFlip.svg";
import Mask_group from "../assets/Mask group.png";

interface Feature {
  icon: string;
  description: string;
}

interface Section {
  icon: string;
  title: string;
  subtitle: string;
  features: Feature[];
}

interface FeatureSectionProps extends Section {}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#3A1E09",
    },
    secondary: {
      main: "#F58600",
    },
    background: {
      default: "#FFFFFF",
      paper: "#f5860014",
    },
  },
  typography: {
    fontFamily: "'Jost', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          "@media (min-width:600px)": {
            fontSize: "3rem",
          },
          "@media (min-width:960px)": {
            fontSize: "3.5rem",
          },
        },
        h2: {
          "@media (min-width:600px)": {
            fontSize: "2.5rem",
          },
        },
      },
    },
  },
});
const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon,
  title,
  subtitle,
  features,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", maxWidth: "1160px", mx: "auto", my: 5 }}>
      <Card
        sx={{
          bgcolor: "#f5860014",
          backdropFilter: "blur(48px) brightness(100%)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: 1,
          },
        }}
      >
        <CardContent sx={{ py: 9, px: isMobile ? 4 : 14, textAlign: "center" }}>
          <Box
            component="img"
            src={icon}
            alt="Section Icon"
            sx={{ width: 88, height: 88, color: "#3a1e09" }}
          />
          <Typography
            variant="h2"
            sx={{
              color: "#3a1e09",
              mt: 2,
              fontSize: "2.75rem",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#3a1e09a8", mt: 1, fontSize: "1.1rem" }}
          >
            {subtitle}
          </Typography>
          <Grid container spacing={isMobile ? 2 : 4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component="img"
                    src={feature.icon}
                    alt="Feature Icon"
                    sx={{ width: 24, height: 24, color: "#3a1e09" }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: "#3a1e09", fontSize: "1rem" }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
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

export const LandingPage: React.FC = () => {
  const sections: Section[] = [
    {
      icon: SecurityIcon,
      title: "Privacy-First Digital Identity",
      subtitle: "ZK-Powered, User-Controlled Credentials",
      features: [
        {
          icon: PersonIcon,
          description: "Protect your data with advanced cryptographic proofs",
        },
        {
          icon: DevicesIcon,
          description: "All data securely stored on your device",
        },
        {
          icon: VerifiedUserIcon,
          description:
            "No Third-Party Sharing: Your information remains yours alone",
        },
        {
          icon: CreditScoreIcon,
          description:
            "Earn better scores to access exclusive Aptos ecosystem benefits",
        },
      ],
    },
    {
      icon: SybilIcon,
      title: "Sybil-Resistant User Verification for dApps & Enterprises",
      subtitle: "Simple APIs, Powerfull Human Verification",
      features: [
        {
          icon: FactCheckIcon,
          description: "Verify users with our straightforward API",
        },
        {
          icon: AssignmentTurnedInIcon,
          description: "Identify your loyal users in a sea of bots",
        },
        {
          icon: NotificationsIcon,
          description: "Engage with your most dedicated and authentic users",
        },
        {
          icon: MouseIcon,
          description:
            "Enhanced User Experience: Build trust and improve community interactions",
        },
      ],
    },
    {
      icon: Streamlined,
      title: "Streamlined Compliance Solutions",
      subtitle: "Simplifying Regulatory Adherence in Web3",
      features: [
        {
          icon: CheckCircleIcon,
          description:
            "Pre-Approved Entity Access: Quickly verify eligibility for resticted services",
        },
        {
          icon: FolderCheck,
          description:
            "Effortlessly check users against global sanctions lists",
        },
        {
          icon: AppRegistrationIcon,
          description: "Streamline user onboarding with reusable KYC",
        },
        {
          icon: MoreHorizIcon,
          description:
            "Full-stack compliance solutions using KYC/AML for dApps and enterpriese",
        },
      ],
    },
  ];
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <img alt="Logo" src={logo} style={{ maxHeight: 40 }} />
              <Link href="/profile" underline="none">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 2,
                    borderRadius: 0,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
  
        <Container>
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              mb: 6,
              position: "relative",
              padding: "10rem 0", 
            }}
          >
            <Box
              component="img"
              src={Mask_group}
              alt="Mask Group"
              sx={{
                position: "absolute",
                top: { xs: 60, sm: -50, md: -70 },
                transform: "translateX(-46%)",
                zIndex: 0, 
                width: { xs: "90%", sm: "80%", md: "70%" }, 
                maxHeight: { xs: "40%", sm: "50%", md: "60%" },
              }}
            />
  
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  // backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: -1,
                },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                color="text.primary"
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                }}
              >
                Aegis ID's Comprehensive
                <br />
                Digital ID Suite
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: "600px",
                  mx: "auto",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Protects dApps and Enterprises from Sybil attacks while
                protecting User Privacy through Zero-Knowledge proofs
              </Typography>
            </Box>
  
            <Box
              component="img"
              src={StringImage}
              alt="Main illustration"
              sx={{
                maxWidth: "100%",
                height: "auto",
                mb: 4,
              }}
            />
  
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: 0,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                }}
              >
                Prove your humanity
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: 0,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                }}
              >
                Build with our APIs
              </Button>
            </Box>
            <Box
              component="img"
              src={StringImageFlip}
              alt="Main illustration"
              sx={{
                maxWidth: "100%",
                height: "auto",
                mt: 4,
              }}
            />
          </Box>
  
          {sections.map((section, index) => (
            <FeatureSection key={index} {...section} />
          ))}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
  
};

export default LandingPage;
