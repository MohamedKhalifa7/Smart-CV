import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useFile } from '../../context/fileContext';
import { cvAnalyzeAction } from '../../redux/store/slices/cvAnalyzeSlice';
import CircularProgress from '@mui/material/CircularProgress';

function Suggestion() {
    const theme = useTheme();
    const [suggestions, setSuggestions] = useState([]);

    const dispatch =useDispatch();
    const analyzeData= useSelector((state) => state.cvAnalyze);
    const { uploadedFile } = useFile();

    const loading = useSelector((state) => state.cvAnalyze.loading);
    


    useEffect(()=>{
        if(uploadedFile){
            dispatch(cvAnalyzeAction(uploadedFile));
        }
    },[dispatch, uploadedFile]);

    useEffect(()=>{
        if(analyzeData?.cvAnalyze){
            setSuggestions(analyzeData.cvAnalyze.sectionsToImprove || []);
        }
    },[analyzeData]);
    return (
        <Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3 }}>
                        Improvement Suggestions
                    </Typography>
    
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <Box key={index} sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: 3,
                                p: 3,
                                mb: 2,
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
                                },
                            }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmojiObjectsOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                        {suggestion.section + " section"}
                                    </Typography>
                                </Box>
                                <Typography variant='body1' sx={{ mt: 2, ml: 4, color: 'text.secondary' }}>
                                    {suggestion.suggestion}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                            No suggestions available at the moment.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
    
}

export default Suggestion
