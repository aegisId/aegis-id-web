import {
  Box,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";

interface ChainDataProps {
  protocols: {
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
  } | null;
  totalGas: number | null;
  transactions: number | null;
  age: Date | null;
  isloading: boolean;
  score: React.Dispatch<React.SetStateAction<number>>;
}

export const ChainData = ({
  protocols,
  totalGas,
  transactions,
  age,
  isloading,
  score,
}: ChainDataProps): JSX.Element => {
  // Calculate the score based on the presence of each value
  useEffect(() => {
    if (!isloading) {
      let totalScore = 0;
      if (protocols && Object.keys(protocols).length > 0) {
        totalScore += 5; 
      }
      if (totalGas !== null) {
        totalScore += 3; 
      }
      if (transactions !== null) {
        totalScore += 3;
      }
      if (age) {
        totalScore += 8;
      }

      score(totalScore);
    }
  }, [isloading, protocols, totalGas, transactions, age, score]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={3} justifyContent="center">
      {[
        {
          title: "Protocols",
          value: isloading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Skeleton variant="text" width={isMobile ? 150 : 200} />
            </Box>
          ) : protocols ? (
            Object.entries(protocols)
              .map(([key, value]) => `${value} (${capitalizeFirstLetter(key)})`)
              .join(", ")
          ) : (
            "N/A"
          ),
        },
        {
          title: "Total Gas",
          value: isloading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Skeleton variant="text" width={isMobile ? 100 : 150} />
            </Box>
          ) : totalGas ? (
            `${totalGas} APT`
          ) : (
            "N/A"
          ),
        },
        {
          title: "Transactions",
          value: isloading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Skeleton variant="text" width={isMobile ? 100 : 150} />
            </Box>
          ) : transactions ? (
            `${transactions}`
          ) : (
            "N/A"
          ),
        },
        {
          title: "Account Age",
          value: isloading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Skeleton variant="text" width={isMobile ? 150 : 200} />
            </Box>
          ) : age ? (
            age.toDateString()
          ) : (
            "N/A"
          ),
        },
      ].map((item, index) => (
        <Grid item xs={12} key={item.title}>
          <Box
            sx={{
              border: "1px solid #3a1e09",
              borderRadius: 0,
              p: isMobile ? 2 : 3,
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="#3a1e09"
              fontWeight="bold"
              mb={1}
              textAlign="center"
            >
              {item.value}
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "subtitle1"}
              color="#3a1e09"
              textAlign="center"
            >
              {item.title}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
