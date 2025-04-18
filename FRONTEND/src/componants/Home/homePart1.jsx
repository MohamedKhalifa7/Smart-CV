import {
    Box,
    Button,
    Typography,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import CheckIcon from '@mui/icons-material/Check';
  
  const HomePart1 = () => {
    const navigate = useNavigate();
    const muitheme = useTheme();
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "4px",
          flexWrap: "wrap", 
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "48%" }, 
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              paddingTop: "20px",
              fontWeight: "bold",
              background:
                "linear-gradient(to right, rgb(107, 36, 155), rgb(233, 155, 38), rgb(241, 123, 212))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Craft the Perfect CV with AI
          </Typography>
  
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "left",
              color: "text.secondary",
              fontSize: "20px",
            }}
          >
            Build, analyze, and optimize your resume with our AI-powered tools.
            Get real-time feedback and land more interviews.
          </Typography>
  
         <Box > <List  sx={{ padding: 0,gap: 4 }}>
            {[
              "AI-powered CV analysis",
              "Professional templates",
              "Keyword optimization",
              "ATS compatibility check",
              "Grammar & spelling review",
            ].map((feature) => (
              <ListItem key={feature} disablePadding sx={{
                mb:  1, 
              }}>
                <ListItemIcon>
                <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#e0e0e0", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon
            sx={{ fontSize: 18, color: "primary.main" }}
          />
        </Box>
                </ListItemIcon>
                <ListItemText primary={feature}    primaryTypographyProps={{ sx: { color: "black" } }} />
              </ListItem>
            ))}
          </List></Box>
  
        <Box sx={{ display: "flex", gap: 2 }}>
        <Button
            variant="contained"
            display="inline"

            sx={{ width: "20%", borderRadius: "30px", mt: 2 }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/getStart")}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "30%", borderRadius: "30px", mt: 2,color:"balck",  borderColor: "background.gray" }}
            onClick={() => navigate("/getStart")}
          >
            Upload Your CV
          </Button>
            </Box>
        </Box>
  
        <Box
          component="img"
          src="/home.jpg"
          alt="CV Preview"
          sx={{
            width: { xs: "100%", md: "48%" },
            borderRadius: "16px",
            boxShadow: 3,
            mt: { xs: 4, md: 10 },
          }}
        />
      </Box>
    );
  };
  
  export default HomePart1;
  