import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const savedCVsAction= createAsyncThunk(
   'saveCVs/getAll',

//    api from backend
//    async (userId)=>{
//     const response = await fetch(`http://localhost:3001/api/users/${userId}/savedCVs`)
//     const data = await response.json()
//     return data;
//    }

async()=>{
    return ['frontend CV', 'backend CV']
}
);

export const savedCVsSlice = createSlice({
    name: 'savedCVs',
    initialState:{
        savedCVs: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(savedCVsAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(savedCVsAction.fulfilled,(state, action)=>{
            state.loading = false;
            state.savedCVs = action.payload;
        })
        .addCase(savedCVsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default savedCVsSlice.reducer;