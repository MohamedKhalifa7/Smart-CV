import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const cvAnalyzeAction = createAsyncThunk(
    "cvAnalyze",
    async function featchAnalysisCV(file) {
      try {
        const formData = new FormData();
        formData.append("cv", file); // must match backend's multer field name
        console.log("Uploading file in thunk:", file);
        const response = await axios.post(
          "http://localhost:3001/api/ai/analyze",
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