import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
export const cvScoreAction= createAsyncThunk(
    'cvScore/get',
    // async (userId)=>{
    //     const response = await fetch(`http://localhost:3001/api/users/${userId}/svScore`)
    //     const data = await response.json()
    //     return data;
    // }


    async()=>{
        return 82;
    }


)

export const cvScoreSlice = createSlice({
    name: 'cvScore',
    initialState:{
        cvScore: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(cvScoreAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(cvScoreAction.fulfilled,(state, action)=>{
            state.loading = false;
            state.svScore = action.payload;
        })
        .addCase(cvScoreAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default cvScoreSlice.reducer;
