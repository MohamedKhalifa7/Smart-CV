import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;

export const startPaymentSession = createAsyncThunk(
  "payment/startSession",
  async (userId) => {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${API_URL}/payment/create-checkout-session`,
      { userId },
      { 
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
);

export const handlePaymentSuccess = createAsyncThunk(
  "payment/success",
  async(userId)=>{
    const response = await axios.post(`${API_URL}/payment/payment-success`,{userId},{ withCredentials: true,})

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

export const createPaypalOrder = createAsyncThunk(
  "payment/createOrder",
  async()=>{
    const {data}=await axios.post("payment/create-order")
    return data;
  }
)

export const capturePaypalOrder = createAsyncThunk(
  "payment/captureOrder",
  async () =>{
    const {data} = await axios.post("payment/capture-order",{orderId,userId})
    return data;

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
      .addCase(createPaypalOrder.pending, (state) => { state.loading = true; })
      .addCase(createPaypalOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(createPaypalOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed";
      })
      .addCase(capturePaypalOrder.fulfilled, (state) => {
        state.success = true;
      });
  },
});

export default paymentSlice.reducer;
