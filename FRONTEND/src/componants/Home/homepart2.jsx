import { Box, Typography, Card, CardContent, Grid, CardActionArea } from '@mui/material'
import React from 'react'
import PlagiarismIcon from '@mui/icons-material/PlagiarismOutlined';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTranslation } from 'react-i18next';

function Homepart2() {
  const { t } = useTranslation();

  const CVTools=[
    {
      title: t("CV Analysis"),
      description: t("cv_analysis.subtitle"),
      icon: <PlagiarismIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
   },
   {
    title: t("Smart Feedback"),
    description: t("cv_feedback.subtitle"),
    icon: <TaskIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: t("CV Builder"),
  description: t("cv_builder.subtitle"),
  icon: <BorderColorOutlinedIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: t("Keyword Optimization"),
  description: t("keyword_optimization.subtitle"),
  icon: <ElectricBoltIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: t("Performance Tracking"),
  description: t("performance_tracking.subtitle"),
  icon: <TrendingUpOutlinedIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: t("Export Options"),
  description: t('export_options.subtitle'),
  icon: <FileDownloadOutlinedIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 }
  ]
    return (
<Box>
    <Box className="header" sx={{display: "flex",
        flexDirection: "column", alignItems: "center",justifyContent:"center" , py:6,px:1}}>
        <Typography variant='h4'
        sx={{ background:
            "linear-gradient(to right, rgb(107, 36, 155), rgb(233, 155, 38), rgb(241, 123, 212))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            my:2,
        }}>
        {t('Powerful CV Tools')}
        </Typography>
        <Typography variant='body1' 
        sx={{color: "text.secondary", fontSize: "20px",my:1,
    
        }}>
        {t('home2.subtitle')}
</Typography>
    </Box>

<Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center", px: 2}}>  
{CVTools.map((tool,index)=>{
  return (
    
    <Grid  key={index}>
    <Card sx={{ maxWidth: 345 }} key={index} className="card">
    <CardActionArea sx={{p:2}}>
   
  { tool.icon}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tool.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: "18px" }}>
          {tool.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  </Grid>
  )
})}
    
    </Grid>
</Box>
    )
}

export default Homepart2        
