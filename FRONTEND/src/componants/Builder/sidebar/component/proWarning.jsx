import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Divider,
    Slide
  } from '@mui/material';
  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import StarRoundedIcon from '@mui/icons-material/StarRounded';
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  function ProWarning({ openPaymentDialog, setOpenPaymentDialog }) {
    const navigate = useNavigate();
  
    const handleNavigateToPayment = () => {
      setOpenPaymentDialog(false);
      navigate('/payment-check');
    };
  
    return (
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            px: 2,
            py: 1.5,
            position: 'relative',
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <StarRoundedIcon sx={{ fontSize: 50, color: '#FFD700' }} />
        </Box>
  
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 22,
            color: '#333',
          }}
        >
          Unlock Pro Features
        </DialogTitle>
  
        <DialogContent>
          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 1, color: '#555', fontSize: 16 }}
          >
            Access premium tools and elevate your experience with our exclusive Pro features.
          </Typography>
        </DialogContent>
  
        <Divider sx={{ my: 1.5 }} />
  
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => setOpenPaymentDialog(false)}
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 500,
              mr: 2,
            }}
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleNavigateToPayment}
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #FFD700, #FFC107)',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'linear-gradient(to right, #FFC107, #FFB300)',
              },
            }}
          >
            Upgrade Now
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default ProWarning;
  