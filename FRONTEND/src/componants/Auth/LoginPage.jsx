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
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();


  const handleSubmit = async () => {
    if (!email || !password) {
      setError(t("Both email and password are required"));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        login(user, token);
        setSuccess(true);
        setError("");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("Login failed"));
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
              {t("Login to Your Account")}
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
               {t("Login successful! Redirecting...")}
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
                label={t("Email")}
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label={t("Password")}
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
                {t("Login")}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGoogleLogin}
                startIcon={<GoogleIcon />}
                sx={{
                  mt: 2,
                  padding: { xs: 1, sm: 1.5 },
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {t("Login with Google")}
              </Button>

              <Typography
                sx={{
                  mt: { xs: 1, sm: 2 },
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
               {t("Don't have an account?")}{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {t("Register")}
                </Link>
              </Typography>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Link to="/" style={{ textDecoration: "none", color: "primary.main" }}>
          <HomeIcon sx={{ fontSize: 40, position: "absolute", top: 20, left: 20 }} />
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
