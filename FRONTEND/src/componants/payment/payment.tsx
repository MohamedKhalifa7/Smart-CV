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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProPaymentForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/payment-success');
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upgrade to Pro
        </Typography>
        <Typography sx={{ mb: 3 }} variant="body1" gutterBottom>
          Select your preferred payment method to complete your Pro upgrade.
        </Typography>

        <Tabs
          value={paymentMethod}
          onChange={(_, newValue) => setPaymentMethod(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab value="card" label="Credit / Debit Card" />
          <Tab value="paypal" label="PayPal" />
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Billing Address"
                    name="address"
                    fullWidth
                    value={form.address}
                    onChange={handleChange}
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
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Pay $9.99 and Upgrade
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProPaymentForm;
