import React from 'react';
import { Box, Container,Typography, Link, Divider, IconButton,Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import DescriptionIcon from '@mui/icons-material/Description';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", mt: 10, py: 6}}>
      <Container maxWidth="lg">
        <Grid container sx={{justifyContent:"center",flexDirection:{xs:"column",md:"row"},gap:"80px",alignItems:"center"}}>   
          <Grid>
            <Box display="flex" alignItems="center" mb={1}>
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">SmartCV</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              The AI-powered CV platform that helps you create, analyze, and improve your resume.
            </Typography>
          
            <Box display="flex" gap={1}>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
              <IconButton color="inherit"><LinkedInIcon /></IconButton>
              <IconButton href="https://github.com/MohamedKhalifa7/Smart-CV" color="inherit"><GitHubIcon /></IconButton>
            </Box>
          </Grid>

         
          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Features
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <Link href="/getStart" color="text.secondary" underline="none" display="block">CV Builder</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">CV Analyzer</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Templates</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Pro Features</Link>
            </Box>
          </Grid>

         
          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <Link href="#" color="text.secondary" underline="none" display="block">Blog</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">CV Tips</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Help Center</Link>
            </Box>
          </Grid>

         
          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <Link href="#" color="text.secondary" underline="none" display="block">About Us</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Privacy Policy</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Terms of Service</Link>
            <Link href="#" color="text.secondary" underline="none" display="block">Contact</Link>
            </Box>
          </Grid>
        </Grid>

        
        <Divider sx={{ mt: 4, mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
