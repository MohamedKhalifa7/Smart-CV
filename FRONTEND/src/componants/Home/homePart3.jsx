import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../context/Auth/AuthContext";

function HomePart3() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const { user } = useAuth();
  const isPro = user?.role === 'pro user';
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleClickPro = () => {
    navigate("/payment-check")
  }

  const handleClickFree = () => {
    navigate("/getStart")
  }

  const availFree = [
    t('CV Analysis'),
    t('2 CV Templates'),
    t('Export to PDF'),
    t('Store up to 2 CVs'),
    t('ATS Compatibility Check'),
  ];

  const notFree = [
    t('Grammar & Spelling Check'),
    t('Auto-correction'),
    t('AI Content Generator'),
    t('AI Open Chat Assistant'),
    t('Unlimited CVs'),
  ];

  const availPro = [
    t('CV Analysis'),
    t('All CV Templates'),
    t('Export to PDF'),
    t('Unlimited CV Storage'),
    t('ATS Compatibility Check'),
    t('Grammar & Spelling Check'),
    t('Auto-correction'),
    t('AI Content Generator'),
    t('AI Open Chat Assistant'),
    t('Unlimited CVs'),
  ];

  return (
    <Box>
      <Box className="header" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        px: 1
      }}>
        <Typography variant='h4' sx={{
          background: "linear-gradient(to right, rgb(107, 36, 155), rgb(233, 155, 38), rgb(241, 123, 212))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          my: 1,
        }}>
          {t("Choose Your Plan")}
        </Typography>
        <Typography variant='body2' sx={{
          color: "text.secondary",
          fontSize: "16px",
          my: 1,
        }}>
          {t("Flexible options to match your CV needs")}
        </Typography>
      </Box>

      <Box className="plans" sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        px: 2
      }}>
        {/* Free Plan */}
        <Box className='free' sx={{ border: "1px solid #ccc", mt: 4, borderRadius: "10px", width: isMobile ? "90%" : "35%" }}>
          <Box className='planName' sx={{ px: "24px", pt: "36px", pb: "20px" }}>
            <Typography variant='h6'>{t("Free")}</Typography>
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>
              ${t("0")}<span style={{ fontSize: "18px", fontWeight: "normal" }}>/{t("month")}</span>
            </Typography>
            <Typography variant='body2' sx={{ color: "text.secondary", fontSize: "16px", my: 1 }}>
              {t("Essential CV tools for everyone")}
            </Typography>
          </Box>

          <Box className='features' sx={{ px: "24px", pb: "16px" }}>
            {availFree.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", my: 1 }}>
                <DoneIcon sx={{ color: "green", fontSize: "22px" }} />
                <Typography variant='body2' sx={{ fontSize: "16px", ml: 1 }}>{item}</Typography>
              </Box>
            ))}

            {notFree.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", my: 2.79 }}>
                <CloseOutlinedIcon sx={{ fontSize: "22px", color: "#bbb" }} />
                <Typography variant='body2' sx={{ fontSize: "16px", ml: 1, color: "#bbb" }}>{item}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: "20px" }}>
            <Button variant="outlined" disabled={isPro} sx={{ width: "75%" }} onClick={handleClickFree}>
              {t("Get Started Free")}
            </Button>
          </Box>
        </Box>

        {/* Pro Plan */}
        <Box className='pro' sx={{ border: "1px solid", mt: 4, borderColor: "primary.main", borderRadius: "10px", width: isMobile ? "90%" : "35%" }}>
          <Box className='planName' sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            px: "24px",
            pt: "36px",
            pb: "20px"
          }}>
            <Typography variant='h6' sx={{ color: "white" }}>{t("Pro")}</Typography>
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>
              ${t("9.99")}<span style={{ fontSize: "18px", fontWeight: "normal" }}>/{t("month")}</span>
            </Typography>
            <Typography variant='body2' sx={{ color: "white", fontSize: "16px", my: 1 }}>
              {t("Advanced tools for serious job seekers")}
            </Typography>
          </Box>

          <Box className='features' sx={{ px: "24px", pb: "16px" }}>
            {availPro.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <DoneIcon sx={{ color: "green", fontSize: "22px" }} />
                <Typography variant='body2' sx={{ fontSize: "16px", ml: 1 }}>{item}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: "20px" }}>
            <Button variant="contained" sx={{ width: "75%", color: "white !important" }} onClick={handleClickPro} disabled={isPro}>
              {!isPro ? t("Upgrade to Pro") : t("already upgraded")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePart3;
