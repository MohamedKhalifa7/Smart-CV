import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const startPaymentSession = createAsyncThunk(
  "payment/startSession",
  async (userId)=>{
      const response = await axios.post(`http://localhost:3001/payment/create-checkout-session`,
        {userId},{ withCredentials: true,}
      );
      return response.data;
      
  }
);

export const handlePaymentSuccess = createAsyncThunk(
  "payment/success",
  async(userId)=>{
    const response = await axios.post(`http://localhost:3001/payment/payment-success`,{userId},{ withCredentials: true,})

    if(response.data.token){
      Cookies.set("token",response.data.token,{
        expires:1,
        secure:true,
        sameSite:"strict"
      })
    }
    return response.data
  }
)

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    url: null,
    error: null,
    success: false,
    proExpiresAt: null,
    user:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(startPaymentSession.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(startPaymentSession.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload.url;
        state.success = true;
      })
      .addCase(startPaymentSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(handlePaymentSuccess.fulfilled,(state,action)=>{
        state.success=true;
        state.proExpiresAt = action.payload.proExpiresAt;
        console.log("Pro expires at:", action.payload.proExpiresAt);  
      })
      .addCase(handlePaymentSuccess.rejected,(state,action)=>{
        state.error= action.payload
      })
  },
});

export default paymentSlice.reducer;
