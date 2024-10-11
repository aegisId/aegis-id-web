import {
    Box,
    Typography,
    Button,
    ThemeProvider,
    createTheme,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  const ComingSoon = () => {
    const customTheme = createTheme({
      palette: {
        primary: {
          main: "#3A1E09",
        },
      },
    });
    return (
      <ThemeProvider theme={customTheme}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          textAlign="center"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <Typography variant="h4" gutterBottom>
          404 | This page could not be found.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{
              ml: 2,
              borderRadius: 0,
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            Go Home
          </Button>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default ComingSoon;
  