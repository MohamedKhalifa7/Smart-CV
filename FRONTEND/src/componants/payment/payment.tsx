import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { handlePaymentSuccess, startPaymentSession } from '../../redux/store/slices/paymentSlice';
import { useAuth } from "../../context/Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store/store';



const ProPaymentForm = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    paypalEmail: '',
  });
  
  type AppDispatch = typeof store.dispatch
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { user, login } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const temp: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!form.name.trim()) temp.name = 'Name is required';
      if (!form.cardNumber || form.cardNumber.length !== 16)
        temp.cardNumber = 'Card number must be 16 digits';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry))
        temp.expiry = 'Expiry must be in MM/YY format';
      if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4)
        temp.cvv = 'CVV must be 3 or 4 digits';
      if (!form.address.trim()) temp.address = 'Billing address is required';
    }

    if (paymentMethod === 'paypal') {
      if (!form.paypalEmail || !/\S+@\S+\.\S+/.test(form.paypalEmail))
        temp.paypalEmail = 'Enter a valid PayPal email';
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) return;
    if (!user?.userId) {
      setErrorMessage('User not found. Please login again.');
      setErrorSnackbarOpen(true);
      return;
    }
  
    setLoading(true);
  
    try {

      const paymentSessionAction = await dispatch(startPaymentSession(user.userId));
      
      if (startPaymentSession.fulfilled.match(paymentSessionAction)) {

        const paymentSuccessAction = await dispatch(handlePaymentSuccess(user.userId));
        
        if (handlePaymentSuccess.fulfilled.match(paymentSuccessAction)) {

          const { user: updatedUser, token: newToken } = paymentSuccessAction.payload;

          login(updatedUser, newToken);
          setDialogOpen(true);
          
        } 
        else {
          throw new Error(paymentSuccessAction.error?.message || 'Payment processing failed');
        }
      } else {
        throw new Error(paymentSessionAction.error?.message || 'Payment session failed');
      
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setErrorSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.location.href = '/';
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <Box sx={{ background: '#f5f5fa', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {/* Payment Form Section */}
          <Box sx={{ flex: 2, p: 4, backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Upgrade to Pro
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
              Complete your payment below to unlock all premium features.
            </Typography>

            <Tabs
              value={paymentMethod}
              onChange={(_, newValue) => setPaymentMethod(newValue)}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab
                value="card"
                label="Credit / Debit Card"
                icon={<CreditCardIcon />}
                iconPosition="start"
              />
              <Tab
                value="paypal"
                label="PayPal"
                icon={<AccountBalanceWalletIcon />}
                iconPosition="start"
              />
            </Tabs>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {paymentMethod === 'card' ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Cardholder Name"
                        name="name"
                        fullWidth
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Card Number"
                        name="cardNumber"
                        fullWidth
                        inputProps={{ maxLength: 16 }}
                        value={form.cardNumber}
                        onChange={handleChange}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="Expiry Date (MM/YY)"
                        name="expiry"
                        fullWidth
                        placeholder="08/29"
                        value={form.expiry}
                        onChange={handleChange}
                        error={!!errors.expiry}
                        helperText={errors.expiry}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        label="CVV"
                        name="cvv"
                        fullWidth
                        inputProps={{ maxLength: 4 }}
                        value={form.cvv}
                        onChange={handleChange}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Billing Address"
                        name="address"
                        fullWidth
                        value={form.address}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="PayPal Email"
                      name="paypalEmail"
                      type="email"
                      fullWidth
                      value={form.paypalEmail}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.paypalEmail}
                      helperText={errors.paypalEmail}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontWeight: 'bold',
                      borderRadius: 2,
                      transition: '0.3s',
                      ':hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={26} color="inherit" />
                    ) : (
                      'Pay $9.99 and Upgrade'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>


          <Box
            sx={{
              flex: 1,
              p: 4,
              background: 'linear-gradient(135deg, #a64bf4 0%, #c972f5 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Pro Plan
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              $9.99
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 3, color: "white", fontWeight: "bold" }}>
              /month
            </Typography>
            <Typography variant="body1" color='white'>
              ✔️ Unlimited Access
              <br />
              ✔️ Priority Support
              <br />
              ✔️ AI Features Unlocked
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>🎉 Payment Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Thank you for upgrading to Pro! Your account has been upgraded and all premium features are now available.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose} 
            color="secondary" 
            variant="contained"
            fullWidth
          >
            Continue to Home
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProPaymentForm;