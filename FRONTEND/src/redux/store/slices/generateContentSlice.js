import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// export const generateContentAction = createAsyncThunk(
//     'generateContent/getSection',
//     // api from backend
//     async (formData) => {
//         const { jobTitle, industry, experience, sectionName } = formData;
//         const response = await fetch('http://localhost:3001/api/ai/ai-writing-assist', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             jobTitle,
//             industry,
//             experience,
//             sectionName,
//           }),
//         });
    
//         if (!response.ok) {
//           throw new Error('Failed to generate content');
//         }
    
//         const data = await response.json();
//         console.log("API response:", data);
//         return data.generatedContent;
//       }
    

//     // async (data) => {
       
//     //     return `${data.jobTitle}, ${data.industry}, ${data.experience}, ${data.section}, Generated content based on the provided parameters.`;
//     // }


// )
const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;
  
export const generateContentAction = createAsyncThunk(
    "generateContent",
    async function fetchAIContent(data) {
        try {
          const response = await axios.post(`${API_URL}/api/ai/ai-writing-assist`, data,{withCredentials: true});  
          console.log('Response from server:', response.data); 
      
          if (response.status === 200) {

            console.log('Generated Content:', response.data.generatedContent);
            return response.data.generatedContent;
          }
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      }
      
  );
  

export const generateContentSlice = createSlice({
    name: 'generateContent',
    initialState: {
        generateContent: "",
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateContentAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateContentAction.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Fulfilled payload********:", action.payload);
                state.generateContent = action.payload;
            })
            .addCase(generateContentAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default generateContentSlice.reducer;