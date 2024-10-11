import { Box, Container, Grid, Link, Typography } from "@mui/material";
import logo_light from "../assets/logo_light.svg";
import twitter from "../assets/twitter.svg";

export const  Footer = () => (
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