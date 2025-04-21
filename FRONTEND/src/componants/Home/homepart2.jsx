import { Box, Typography, Card, CardContent, Grid, CardActionArea } from '@mui/material'
import React from 'react'
import PlagiarismIcon from '@mui/icons-material/PlagiarismOutlined';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Homepart2() {

  const CVTools=[
    {
      title: "CV Analysis",
      description: "Our AI analyses CV for grammar, spelling, ATS compatibility, and optimal keyword usage.",
      icon: <PlagiarismIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
   },
   {
    title: "Smart Feedback",
    description: "Get color-coded feedback highlighting your CV's strengths and areas for improvement.",
    icon: <TaskIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: "CV Builder",
  description: "Use our intuitive builder with professional templates and AI writing assistance.",
  icon: <BorderColorOutlinedIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: "Keyword Optimization",
  description: "Tailor your CV to specific job with our keyword optimization tool.",
  icon: <ElectricBoltIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: "Performance Tracking",
  description: "Track your CV's improvement over time with our scoring system.",
  icon: <TrendingUpOutlinedIcon sx={{ fontSize: "50px", marginTop: "20px", color: "primary.main" }} />,
 },
 {
  title: "Export Options",
  description: "Download CV in PDF or Word format, ready to send.",
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
        Powerful CV Tools
        </Typography>
        <Typography variant='body1' 
        sx={{color: "text.secondary", fontSize: "20px",my:1,
    
        }}>
Everything you need to create, analyze, and perfect your CV in one place

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
