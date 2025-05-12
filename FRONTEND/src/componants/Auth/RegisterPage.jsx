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
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

    const { t } = useTranslation();
    const currentLang = i18n.language;

  const validateFields = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = t("First name is required");
    }

    if (!lastName) {
      errors.lastName = t("Last name is required");
    }

    if (!email) {
      errors.email = t("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = t("Password is required");
    } else if (password.length < 8) {
      errors.password = t("Password must be at least 8 characters long");
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    const API_URL = import.meta.env.MODE === "development" 
      ? import.meta.env.VITE_API_URL_LOCAL 
      : import.meta.env.VITE_API_URL_PRODUCTION;

    const formData = { firstName, lastName, email, password };
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        setTimeout(() => navigate("/verify-otp", { state: { email } }), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || t("Registration failed"));
      setSuccess(false);
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
            alt="Register Illustration"
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
              width: "90%",
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
              {t("Register New Account")}
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {t("Registration successful! Redirecting...")}
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
                label={t("First Name")}
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
                required
                fullWidth
              />
              <TextField
                label={t("Last Name")}
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
                fullWidth
              />
              <TextField
                label={t("Email")}
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                required
                fullWidth
              />
              <TextField
                label={t("Password")}
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
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
                {t("Register")}
              </Button>

              <Typography
                sx={{
                  mt: { xs: 1, sm: 2 },
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                {t("Already a member?")}{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {t("Login")}
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

export default RegisterPage;
