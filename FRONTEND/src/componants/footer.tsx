import React from 'react';
import { Box, Container, Typography, Link, Divider, IconButton, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", mt: 10, py: 6 }}>
      <Container maxWidth="lg">
        <Grid container sx={{ justifyContent: "center", flexDirection: { xs: "column", md: "row" }, gap: "80px", alignItems: "center" }}>
          <Grid>
            <Box display="flex" alignItems="center" mb={1} sx={{ cursor: "pointer" }} onClick={() => navigate('/')}>
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">SmartCV</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {t("footer.subtitle")}
            </Typography>

            <Box display="flex" gap={1}>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
              <IconButton color="inherit"><LinkedInIcon /></IconButton>
              <IconButton href="https://github.com/MohamedKhalifa7/Smart-CV" color="inherit"><GitHubIcon /></IconButton>
            </Box>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t("Features")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link component={RouterLink} to="/getStart" color="text.secondary" underline="none">{t("CV Builder")}</Link>
              <Link component={RouterLink} to="/getStart" color="text.secondary" underline="none">{t("CV Analyzer")}</Link>
              <Link component={RouterLink} to="/templates" color="text.secondary" underline="none">{t("Templates")}</Link>
              <Link component={RouterLink} to="/Pro-Features" color="text.secondary" underline="none">{t("Pro Features")}</Link>
            </Box>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t("Resources")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link component={RouterLink} to="/blogs" color="text.secondary" underline="none">{t("Blog")}</Link>
              <Link component={RouterLink} to="/tips" color="text.secondary" underline="none">{t("CV Tips")}</Link>
              <Link component={RouterLink} to="/help" color="text.secondary" underline="none">{t("Help Center")}</Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {t("© 2025 All rights reserved.")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
