import { Box, Grid, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";

interface OnChainProps {
    transactions: number | null;
    age: Date | null;
    totalGas: number | null;
    loading: boolean;
  }
  
 export const OnChain = ({
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