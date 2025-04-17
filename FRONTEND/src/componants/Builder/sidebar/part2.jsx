import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { savedCVsAction } from '../../../redux/store/slices/savedCVsSlice';
function Part2() {
    const dispatch = useDispatch();
    const savedCVs = useSelector((state) => state.savedCVs.savedCVs);
    //insert user id in the action
    useEffect(()=>{
        dispatch(savedCVsAction())
    },[])
    return (
        <Box
        sx={{
            py:2, px:2, 
            bgcolor:'white',
            borderRadius: 2,
            border: '1px solid #ccc',
            display:'flex',
            flexDirection:'column',
            alignItems:'start',
            gap: 2,
         //   boxShadow: 1,
            }}>

            <Typography variant='body1'>
                  My CVs
            </Typography>

            {/* coming from DB */}
            {savedCVs.map((cv, index)=>
                <Typography key={index} variant='body1' 
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'ceter'}}>
                    <TextSnippetIcon></TextSnippetIcon>
                      {cv}
                </Typography>
            )}
            {/* <Typography variant='body1' 
            sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'ceter'}}>
                <TextSnippetIcon></TextSnippetIcon>
                  Marketing CV
            </Typography>   */}

             {/* <Typography variant='body1'
              sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'ceter'}}>
                <TextSnippetIcon></TextSnippetIcon>
                  Frontend CV
            </Typography> */}

            <Button variant='outlined' sx={{mt:2}} fullWidth>+ New CV</Button>
        </Box>
    )
}

export default Part2
