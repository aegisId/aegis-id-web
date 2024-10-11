import { Box, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const ImportKyc = () => {
    const tasks = [
      { name: "Connect with Mobile Number", description: "Link your Mobile Number", points: 5 },
    ];
  
  
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