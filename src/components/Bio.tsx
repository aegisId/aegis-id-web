import { Box, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { Frame } from "./Frame";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import tick icon

interface BioProps {
  score: React.Dispatch<React.SetStateAction<number>>;
}

export const Bio: React.FC<BioProps> = ({ score }) => {
  const [mobileVerifed, setMobileVerifed] = useState(false);
  useEffect(() => {
    if(mobileVerifed){
      setKycOpen(false)
      score(5)
    }

  }, [mobileVerifed])
  const tasks = [
    {
      name: "Connect with Mobile Number",
      description: "Link your Mobile Number",
      points: 5,
    },
  ];
  const [isKycOpen, setKycOpen] = useState(false);

  const openKycModal = () => setKycOpen(true);
  const closeKycModal = () => setKycOpen(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {tasks.map((task, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="stretch"
          sx={{
            cursor: "pointer",
            "&:hover .task-box": {
              backgroundColor: "#fef6eb",
            },
          }}
          onClick={openKycModal}
        >
          <Grid item xs={2} sm={1}>
            <Box
              className="task-box"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
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
                    {mobileVerifed && task.name === "Connect with Mobile Number" ? "Verified" : `${task.points} Points`}
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
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
                border: "1px solid #3a1e09",
                transition: "background-color 0.3s",
              }}
            >
                {mobileVerifed && task.name === "Connect with Mobile Number" ? (
                  <CheckCircleIcon
                    sx={{
                      width: { xs: 20, sm: 24, md: 32 },
                      height: { xs: 20, sm: 24, md: 32 },
                    }}
                  />
                ) : (
                  <ArrowForwardIcon
                    sx={{
                      width: { xs: 20, sm: 24, md: 32 },
                      height: { xs: 20, sm: 24, md: 32 },
                    }}
                  />
                )}
            </Box>
          </Grid>
        </Grid>
      ))}

      {<Frame open={isKycOpen} onClose={closeKycModal} setMobileVerifed={setMobileVerifed} />}
    </Box>
  );
};
