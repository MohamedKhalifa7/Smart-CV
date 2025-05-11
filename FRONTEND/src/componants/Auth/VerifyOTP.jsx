import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/resend-otp`,
        { email }
      );

      if (response.status === 200) {
        setSuccess("A new OTP has been sent to your email.");
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      setSuccess("");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/verify-otp`,
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        setSuccess("OTP verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="img"
            src="Images/1.jpg"
            alt="OTP Verification Illustration"
            sx={{
              width: "100%",
              maxHeight: "550px",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>

        <Grid xs={12} sm={10} md={6}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "primary.main",
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Verify Your Email
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <FormControl
              sx={{
                width: "100%",
                gap: { xs: 1.5, sm: 2 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                disabled
                fullWidth
              />
              <TextField
                label="OTP"
                type="text"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerifyOtp}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  padding: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Verify OTP
              </Button>

              <Typography
                sx={{
                  mt: { xs: 1, sm: 2 },
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                Didn't receive the OTP?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </Button>
              </Typography>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VerifyOTP;
