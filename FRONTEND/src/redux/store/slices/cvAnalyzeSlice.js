import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;

export const cvAnalyzeAction = createAsyncThunk(
    "cvAnalyze",
    async function featchAnalysisCV(file) {
      try {
        const formData = new FormData();
        formData.append("cv", file);
        console.log("Uploading file in thunk:", file);
        const response = await axios.post(
          `${API_URL}/api/ai/analyze`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Response from server:", response.data);
  
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error("Error analyze file:", error);
        throw error;
      }
    }
  );
  
  

export const cvAnalyzeSlice = createSlice({
    name: "cvAnalyze",
    initialState: {
        cvAnalyze: null,
        loading: false,
        error: null,
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(cvAnalyzeAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cvAnalyzeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvAnalyze = action.payload;
            })
            .addCase(cvAnalyzeAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default cvAnalyzeSlice.reducer;