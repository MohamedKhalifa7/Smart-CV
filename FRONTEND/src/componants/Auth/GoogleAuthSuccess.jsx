import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { CircularProgress, Typography, Box } from "@mui/material";

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const token = searchParams.get("token");
        const userParam = searchParams.get("user");

        console.log("Token:", token);
        console.log("User Param:", userParam);

        if (token && userParam) {
          const user = JSON.parse(decodeURIComponent(userParam));
          console.log("Decoded User:", user);
          await login(user, token);
          window.location.href = "/";
        } else {
          throw new Error("Invalid authentication data");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login", {
          replace: true,
          state: { error: "Authentication failed. Please try again." },
        });
      }
    };

    processAuth();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Processing authentication...
      </Typography>
    </Box>
  );
};

export default GoogleAuthSuccess;
