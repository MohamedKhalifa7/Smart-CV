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
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        login(response.data.user, response.data.token);
        setSuccess(true);
        setError("");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
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
            src="Images/2.jpg"
            alt="Login Illustration"
            sx={{
              width: "100%",
              maxHeight: "600px",
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
              Login to Your Account
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Login successful! Redirecting...
              </Alert>
            )}

            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                {error}
              </Typography>
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
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  padding: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGoogleLogin}
                sx={{
                  mt: 2,
                  padding: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Login with Google
              </Button>

              <Typography
                sx={{
                  mt: { xs: 1, sm: 2 },
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
