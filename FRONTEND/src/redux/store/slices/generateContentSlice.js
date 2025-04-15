import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const generateContentAction = createAsyncThunk(
    'generateContent/getSection',
    // api from backend
    // async ({jobTitle, industry, experience, section}) => {
    //     const response = await fetch(`https://api.example.com/${jobTitle}/${industry}/${experience}/${section}`);
    //     const data = await response.json();
    //     return data;
    // }

    async (data) => {
       
        return `${data.jobTitle}, ${data.industry}, ${data.experience}, ${data.section}, Generated content based on the provided parameters.`;
    }


)

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
                state.generateContent = action.payload;
            })
            .addCase(generateContentAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default generateContentSlice.reducer;