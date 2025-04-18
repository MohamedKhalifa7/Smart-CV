import {Avatar, Button, Container, Link, Typography } from "@mui/material"
import React from "react";
import DescriptionIcon from '@mui/icons-material/Description';
const Error = () => {
    return (
        <Container  maxWidth="lg" sx={{display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center',minHeight:'80vh',gap:'30px'}}>
          <Avatar
        sx={{
          width: 100,
          height: 100,
          bgcolor: 'white',
          boxShadow: '0 0 20px #7d25d2'}}
      >
        <DescriptionIcon sx={{ color: '#7d25d2', fontSize: 60 }} />
      </Avatar>
        <Typography align="center" variant="h3" color="warning" sx={{fontWeight:"bold"}}><i className="bi bi-exclamation-diamond"></i>404</Typography>
        <Typography color="black" align="center" width="50%">Oops! The page you're looking for doesn't exist.</Typography>
        <Link underline="none" color="black" href="/">
        <Button fullWidth sx={{ mt: 1, background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
            Return to home
            </Button>
        </Link>
       
       
        </Container>
    );
}

export default Error;
