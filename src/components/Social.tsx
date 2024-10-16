import { useEffect, useRef, useState } from "react";
import { useTwitterAuth } from "../hooks/useTwitterAuth";
import { proveAndVerify } from "../utils/verify";
import { Box, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import tick icon

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useNotification from "../hooks/useNotification";
import { useTelegramAuth } from "../hooks/useTelegramAuth";

interface SocialProps {
  score: React.Dispatch<React.SetStateAction<number>>;
}

export const Social: React.FC<SocialProps> = ({ score }) => {

  const [isVerified, setIsVerified] = useState(false); // State for verification

  const { userId, handleAuth } = useTwitterAuth();
  const { handleTelegramAuth } = useTelegramAuth();
  const hasRunEffect = useRef(false);

  const { connected, account, signTransaction } = useWallet();
  const { showWarning, NotificationComponent, showSuccessHash } = useNotification();

  const tasks = [
    { name: "Connect with X", description: "Link your X account", points: 7 },
    {
      name: "Connect with Telegram",
      description: "Link your Telegram account",
      points: 8,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (userId && account && signTransaction && !hasRunEffect.current) {
        hasRunEffect.current = true;
        const data = await proveAndVerify(userId, account, signTransaction);
        if(data.success){ 
          setIsVerified(true);
          score(5)
          showSuccessHash("Transaction successful with hash: ",`https://explorer.aptoslabs.com/txn/${data.hash}?network=testnet`);
        }
      }
    };
  
    fetchData();
  }, [account, signTransaction, userId]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId && account && signTransaction && !hasRunEffect.current) {
        hasRunEffect.current = true;
        const data = await proveAndVerify(userId, account, signTransaction);
        if(data.success){ 
          setIsVerified(true);
          score(5)
          showSuccessHash("Transaction successful with hash: ",data.hash);
        }
      }
    };
  
    fetchData();
  }, [account, signTransaction, userId]);

  const handleTaskClick = async (task: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: any;
    description?: string;
    points?: number;
  }) => {
    if (connected) {
      if (task.name === "Connect with X") {
        if (!userId) {
          await handleAuth();
        }
      } else if (task.name === "Connect with Telegram") {
        await handleTelegramAuth();
      }
    } else {
      showWarning("Connect a wallet to continue!");
    }
  };

  // return (
  //   <>
  //     {NotificationComponent}
  //     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  //       {tasks.map((task, index) => (
  //         <Grid
  //           container
  //           spacing={2}
  //           key={index}
  //           alignItems="stretch"
  //           sx={{
  //             cursor: "pointer",
  //             "&:hover .task-box": {
  //               backgroundColor: "#fef6eb",
  //             },
  //           }}
  //           onClick={() => handleTaskClick(task)}
  //         >
  //           <Grid item xs={2} sm={1}>
  //             <Box
  //               className="task-box"
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 width: "100%",
  //                 height: "100%",
  //                 border: "1px solid #3a1e09",
  //                 transition: "background-color 0.3s",
  //               }}
  //             >
  //               <Typography
  //                 variant="body1"
  //                 sx={{ color: "#3a1e09", fontWeight: "bold" }}
  //               >
  //                 {index + 1}
  //               </Typography>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={8} sm={10}>
  //             <Box
  //               className="task-box"
  //               sx={{
  //                 p: 2,
  //                 border: "1px solid #3a1e09",
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "center",
  //                 transition: "background-color 0.3s",
  //               }}
  //             >
  //               <Box>
  //                 <Typography
  //                   variant="body1"
  //                   sx={{ color: "#3a1e09", fontWeight: "bold" }}
  //                 >
  //                   {task.name}
  //                 </Typography>
  //                 <Typography variant="body2" sx={{ color: "#3a1e09" }}>
  //                   {task.description}
  //                 </Typography>
  //               </Box>
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   alignItems: "flex-end",
  //                 }}
  //               >
  //                 <Typography
  //                   variant="body1"
  //                   sx={{ color: "#3a1e09", fontWeight: "bold" }}
  //                 >
  //                   {task.points} Points
  //                 </Typography>
  //               </Box>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={2} sm={1}>
  //             <Box
  //               className="task-box"
  //               sx={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 width: { xs: "100%", sm: 56, md: 72 },
  //                 height: "100%",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 gap: 1,
  //                 position: "relative",
  //                 border: "1px solid #3a1e09",
  //                 transition: "background-color 0.3s",
  //               }}
  //             >
  //               <ArrowForwardIcon
  //                 sx={{
  //                   width: { xs: 20, sm: 24, md: 32 },
  //                   height: { xs: 20, sm: 24, md: 32 },
  //                 }}
  //               />
  //             </Box>
  //           </Grid>
  //         </Grid>
  //       ))}
  //     </Box>
  //   </>
  // );

  return (
    <>
      {NotificationComponent}
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
                    {isVerified && task.name === "Connect with X" ? "Verified" : task.description} {/* Update description if verified */}
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
                    {isVerified && task.name === "Connect with X" ? "Verified" : `${task.points} Points`}
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
                {isVerified && task.name === "Connect with X" ? (
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
      </Box>
    </>
  );
};
