import {
  Box,
  Button,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useTranslation } from "react-i18next";

const HomePart1 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        // width: "100vw",
        overflowX: "hidden",
        bgcolor: "#fceff9",
      }}
    >
      <Box
        sx={{
          // maxWidth: "1440px", 
          // margin: "0 auto",
          px: { xs: 2, md: 4 },
          py: 6,
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {/* Background blob */}
        <Box
          component="svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "200px",
            height: "200px",
            zIndex: 0,
            opacity: 0.2,
            pointerEvents: "none", // 🛡️ prevents interaction
          }}
        >
          <path
            fill="#8e44ad"
            d="M49.3,-71.1C64.5,-62.4,77.1,-48.1,80.4,-32.4C83.6,-16.8,77.5,-0.8,72.5,13.6C67.4,28.1,63.4,41,54.6,51.6C45.9,62.1,32.3,70.3,17.3,73.5C2.2,76.6,-14.3,74.6,-28.9,68.2C-43.5,61.8,-56.3,51.1,-62.2,38.1C-68,25.1,-67,9.9,-66.4,-6.1C-65.9,-22.2,-65.7,-38.9,-57.9,-52.3C-50.1,-65.7,-34.7,-75.8,-18.1,-79.5C-1.6,-83.1,15.9,-80.3,49.3,-71.1Z"
            transform="translate(100 100)"
          />
        </Box>

        {/* Left content */}
        <Grow in timeout={1000}>
          <Box
            sx={{
              flex: "1 1 48%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              zIndex: 1,
              minWidth: { xs: "100%", md: "45%" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, rgb(107, 36, 155), rgb(233, 155, 38), rgb(241, 123, 212))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t('Craft the Perfect CV with AI')}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                fontSize: "20px",
              }}
            >
              {t("home1.subtitle")}
            </Typography>

            <List sx={{ padding: 0 }}>
              {[
                t("AI-powered CV analysis"),
                t("Professional templates"),
                t("Keyword optimization"),
                t("ATS compatibility check"),
                t("Grammar & spelling review"),
              ].map((feature, index) => (
                <Fade in timeout={500 + index * 200} key={feature}>
                  <ListItem
                    disablePadding
                    sx={{
                      mb: 1,
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateX(5px)",
                      },
                    }}
                  >
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
                          boxShadow: 1,
                        }}
                      >
                        <CheckIcon
                          sx={{ fontSize: 18, color: "primary.main" }}
                        />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        sx: { color: "black", fontWeight: 500,textAlign:"start" },
                      }}
                    />
                  </ListItem>
                </Fade>
              ))}
            </List>

            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                sx={{
                  width: "40%",
                  borderRadius: "30px",
                  mt: 2,
                  boxShadow: 3,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/getStart")}
              >
                {t("Get Started")}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: "40%",
                  borderRadius: "30px",
                  mt: 2,
                  color: "black",
                  borderColor: "#ccc",
                  boxShadow: 1,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    borderColor: "black",
                  },
                }}
                onClick={() => navigate("/getStart")}
              >
                Upload Your CV
              </Button>
            </Box>
          </Box>
        </Grow>

        {/* Right image */}
        <Fade in timeout={1200}>
          <Box
            sx={{
              flex: "1 1 48%",
              minWidth: { xs: "100%", md: "45%" },
              mt: { xs: 4, md: 10 },
              zIndex: 1,
            }}
          >
            <Tilt glareEnable={true} glareMaxOpacity={0.25} glareColor="#aaa">
              <Box
                component={motion.img}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                src="/home.jpg"
                alt="CV Preview"
                sx={{
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: 6,
                  objectFit: "cover",
                }}
              />
            </Tilt>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default HomePart1;
