import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import img1 from '../../../assets/1.jpg';
import classic from '../../../assets/classic.jpg';
import modern from '../../../assets/modern.jpg';
import linkedin from '../../../assets/linkedin.jpg';
export const cvTemplateAction= createAsyncThunk(
    'cvTemplate/getAll',

    //user id ti check if user pro or not
    // async (userId)=>{
    //     const response = await fetch(`http://localhost:3001/api/users/${userId}/cvTemplate`)
    //     const data = await response.json()
    //     return data;
    // }

    async(userid)=>{
        return [{title:'classic', id:1,img: classic ,pro:false, disc:'discription 1'},
        {title:'linkedin', id:2, img:linkedin ,pro:true,disc:'discription 2'},
        {title:'modern', id:3, img:modern ,pro:true,disc:'discription 3'},]
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