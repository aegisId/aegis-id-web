import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  styled,
  Typography,
} from "@mui/material";
import logo from "../src/assets/logo.svg";
import logo_light from "../src/assets/logo_light.svg";

import list from "../src/assets/list.svg";
import frame from "../src/assets/Frame 17.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
    [theme.breakpoints.up('xs')]: {
      padding: "6px 12px",
      fontSize: theme.typography.pxToRem(14),
      lineHeight: 1.4,
    },
    [theme.breakpoints.up('sm')]: {
      padding: "8px 16px",
      fontSize: theme.typography.pxToRem(15),
      lineHeight: 1.45,
    },
    [theme.breakpoints.up('md')]: {
      padding: "9px 17px",
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1.5,
    },
    [theme.breakpoints.up('lg')]: {
      padding: "10px 20px",
      fontSize: theme.typography.pxToRem(18),
      lineHeight: 1.55,
    },
  }));
const ResponsiveLayout = (): JSX.Element => {
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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <img alt="Logo" src={logo} style={{ maxHeight: 40 }} />
          <CustomButton>Connect Wallet</CustomButton>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4} sx={{ my: 4 }}>
          {/* Profile Section */}
          <Grid item xs={12} md={3}>
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
              <img
                alt="Profile"
                src={frame}
                style={{ width: "100%", maxWidth: 240, height: "auto" }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#3a1e09", textAlign: "center" }}
              >
                Connect your wallet to see your profile
              </Typography>
            </Box>
          </Grid>

          {/* Stats and Actions */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Stats */}
              <Grid container spacing={2}>
                {["Humanity Score", "Verified", "Longest streak"].map(
                  (stat, index) => (
                    <Grid item xs={12} sm={4} key={stat}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 2,
                          borderRight:
                            index < 2
                              ? { xs: "none", sm: "1px solid #3a1e091a" }
                              : "none",
                        }}
                      >
                        <Typography variant="h4" sx={{ color: "#3a1e09" }}>
                          {index === 0 ? "0" : index === 1 ? "0/12" : "0 Days"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#3a1e09a8", textAlign: "center" }}
                        >
                          {stat}
                        </Typography>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {[
                  "Social Media",
                  "Biometrics and Liveliness",
                  "Import KYC",
                  "On-chain activity",
                ].map((action, index) => (
                  <Button
                    key={action}
                    variant={index === 0 ? "contained" : "outlined"}
                    sx={{
                      bgcolor: index === 0 ? "#3a1e09" : "transparent",
                      borderColor: "#3a1e09",
                      color: index === 0 ? "white" : "#3a1e09",
                      flex: { xs: "1 0 40%", sm: "1 0 auto" },
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </Box>

              {/* Task List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2, 3].map((item) => (
                  <Grid container spacing={2} key={item} alignItems="center">
                    <Grid item xs={2} sm={1}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          aspectRatio: "1/1",
                          border: "1px solid #3a1e09",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ color: "#3a1e09", fontWeight: "bold" }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={8} sm={10}>
                      <Box sx={{ p: 2, border: "1px solid #3a1e09" }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "#3a1e09", fontWeight: "bold" }}
                        >
                          Connect with X
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#3a1e09" }}>
                          Description Connect with X
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      {/* <Box sx={{p: 2, border: "1px solid #3a1e09", display: "flex", justifyContent: "center" }}>
                        <img
                          alt="Status"
                          src={arrow}
                          style={{ width: "100%", maxWidth: 56 }}
                        />
                      </Box> */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        width={{ xs: "100%", sm: 56, md: 72 }}
                        height={{ xs: 48, sm: 56, md: 72 }}
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        position="relative"
                        border={1}
                        borderColor="#3a1e09"
                        sx={{
                          aspectRatio: "1 / 1",
                          maxWidth: { xs: 56, sm: 72, md: "none" },
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
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      {/* <Box component="footer" sx={{ bgcolor: "#1b0b00", py: 4, mt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={4}>
              <img alt="Logo" src={logo_light} style={{ maxHeight: 40 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                <Link
                  href="https://www.figma.com/design/FA6i5TeFM7xiNkXlKS3CA1?node-id=3-121"
                  sx={{ color: "gray.100" }}
                >
                  About Us
                </Link>
                <Link
                  href="https://www.figma.com/design/FA6i5TeFM7xiNkXlKS3CA1?node-id=3-121"
                  sx={{ color: "gray.100" }}
                >
                  App
                </Link>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <img alt="Social Links" src={list} style={{ maxHeight: 40 }} />
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: "gray.700" }} />
          <Typography
            variant="body2"
            sx={{ color: "gray.300", textAlign: "center" }}
          >
            © Copyright 2024, All Rights Reserved
          </Typography>
        </Container>
      </Box> */}
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
          <Grid item xs={4}>
            <img alt="Container" src={logo_light} />
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Grid item>
              <Link
                href="https://www.figma.com/design/FA6i5TeFM7xiNkXlKS3CA1?node-id=3-121"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#F3F4F6",
                  fontFamily: "Manrope-Medium, Helvetica",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  mr: 5,
                }}
              >
                About Us
              </Link>
              <Link
                href="https://www.figma.com/design/FA6i5TeFM7xiNkXlKS3CA1?node-id=3-121"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#F3F4F6",
                  fontFamily: "Manrope-Medium, Helvetica",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                App
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <img alt="List" src={list} />
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
            }}
          >
            © Copyright 2024, All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
    </Box>
  );
};

export default ResponsiveLayout;