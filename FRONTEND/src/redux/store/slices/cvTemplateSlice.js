import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import img1 from '../../../assets/1.jpg';
export const cvTemplateAction= createAsyncThunk(
    'cvTemplate/getAll',

    //user id ti check if user pro or not
    // async (userId)=>{
    //     const response = await fetch(`http://localhost:3001/api/users/${userId}/cvTemplate`)
    //     const data = await response.json()
    //     return data;
    // }

    async(userid)=>{
        return [{title:'template1', id:1,img: img1 ,pro:true, disc:'discription 1'},
        {title:'template2', id:2, img:img1 ,pro:false,disc:'discription 1'},]
    }

)

export const cvTemplateSlice = createSlice({
    name: 'cvTemplate',
    initialState:{
        cvTemplate: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(cvTemplateAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(cvTemplateAction.fulfilled,(state, action)=>{
            state.loading = false;
            state.cvTemplate = action.payload;
        })
        .addCase(cvTemplateAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default cvTemplateSlice.reducer;