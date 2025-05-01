import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const PaymentSessionSlice = createAsyncThunk(
  'payment/checkoutSession',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/payment/create-checkout-session', {
        userId,
      });
      return response.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Payment failed');
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState:{
    savedCVs: [],
    loading: false,
    error: null,
},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PaymentSessionSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PaymentSessionSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload;
      })
      .addCase(PaymentSessionSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
