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
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

const ProPaymentForm = () => {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    paypalEmail: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let temp: any = {};

    if (paymentMethod === 'card') {
      if (!form.name) temp.name = 'Name is required';
      if (!form.cardNumber || form.cardNumber.length !== 16)
        temp.cardNumber = 'Card number must be 16 digits';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry))
        temp.expiry = 'Expiry must be in MM/YY format';
      if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4)
        temp.cvv = 'CVV must be 3 or 4 digits';
      if (!form.address) temp.address = 'Billing address is required';
    }

    if (paymentMethod === 'paypal') {
      if (!form.paypalEmail || !/\S+@\S+\.\S+/.test(form.paypalEmail))
        temp.paypalEmail = 'Enter a valid PayPal email';
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDialogOpen(true);
    }, 2000);
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
          {/* Form Section */}
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
                {paymentMethod === 'card' && (
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
                )}

                {paymentMethod === 'paypal' && (
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
                    {loading ? <CircularProgress size={26} color="inherit" /> : 'Pay $9.99 and Upgrade'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>

          {/* Summary Section */}
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
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 3 }}>
              /month
            </Typography>
            <Typography variant="body1">
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>🎉 Payment Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Thank you for upgrading to Pro!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProPaymentForm;
