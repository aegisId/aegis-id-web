import React, { useState } from "react";
import { Box, Typography, Button, Paper, Input, Dialog } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { sendOTP, verifyOTP } from "../utils/helper";

interface FrameProps {
  open: boolean;
  onClose: () => void;
  setMobileVerifed: React.Dispatch<React.SetStateAction<boolean>>}

export const Frame: React.FC<FrameProps> = ({ open, onClose,setMobileVerifed }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  // console.log("mobileVerifed:", mobileVerifed)

  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
      setIsOtpValid(value.length === 6);
    }
  };

  const handleSubmit = async () => {
    if (mobileNumber.length === 10) {
      let data = await sendOTP(mobileNumber);
      if (data) {
        setOtpVisible(true);
      }
    }
  };
  const handleVerify = async () => {
    if (otp.length === 6 && mobileNumber.length === 10) {
      const data = await verifyOTP(mobileNumber, otp);
      if (data) {
        setMobileVerifed(true);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper
        elevation={1}
        sx={{
          maxWidth: "624px",
          p: { xs: 2, sm: 4 },
          border: "1px solid #3a1e09",
          bgcolor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#3a1e09",
                fontWeight: "600",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              Connect with Mobile Number
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#3a1e09",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Enter your mobile number to receive an OTP.
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#3a1e09",
              fontWeight: "600",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            5 Points
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          p={1}
          width="100%"
          bgcolor="#f5860014"
          mt={2}
          borderRadius="4px"
        >
          <Box display="flex" alignItems="center" mr={2}>
            <ReactCountryFlag
              countryCode="IN"
              svg
              style={{ width: "24px", height: "16px", marginRight: "8px" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#3a1e09", fontWeight: "500", mr: 2 }}
            >
              +91
            </Typography>
          </Box>
          <Input
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            inputProps={{ maxLength: 10, pattern: "\\d*" }}
            sx={{
              flex: 1,
              border: "1px solid #3a1e09",
              p: 0.75,
              color: "#3a1e09",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
            disableUnderline
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              bgcolor: "#3a1e09",
              color: "white",
              textTransform: "none",
              borderRadius: 0,
            }}
            onClick={handleSubmit}
            disabled={mobileNumber.length !== 10}
          >
            Submit
          </Button>
        </Box>

        {otpVisible && (
          <Box
            display="flex"
            alignItems="center"
            p={1}
            width="100%"
            bgcolor="#f5860014"
            mt={2}
            borderRadius="4px"
          >
            <Typography
              variant="body2"
              sx={{ color: "#3a1e09", fontWeight: "500", mr: 2 }}
            >
              Enter OTP:
            </Typography>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ maxLength: 6, pattern: "\\d*" }}
              sx={{
                flex: 1,
                border: "1px solid #3a1e09",
                p: 0.75,
                color: "#3a1e09",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              disableUnderline
            />
          </Box>
        )}

        <Box display="flex" width="100%" mt={2}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 0,
              flex: 1,
              borderColor: "#3a1e09",
              color: "#3a1e09",
              textTransform: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              p: { xs: "6px 12px", sm: "8px 16px" },
            }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              bgcolor: isOtpValid ? "#3a1e09" : "#ccc",
              color: "white",
              textTransform: "none",
              ml: 2,
              borderRadius: 0,
              fontSize: { xs: "0.875rem", sm: "1rem" },
              p: { xs: "6px 12px", sm: "8px 16px" },
              "&:hover": { bgcolor: isOtpValid ? "#2c1608" : "#ccc" },
            }}
            disabled={!isOtpValid}
            onClick={handleVerify}
          >
            Verify
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};
