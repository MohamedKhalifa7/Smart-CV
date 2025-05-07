import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BorderLinearProgress } from './linearProgress'
import FullWidthTabs from './tabSections'
import { useDispatch, useSelector } from 'react-redux';
import { cvScoreAction } from '../../redux/store/slices/cvScoreSlice';
import { cvAnalyzeAction } from '../../redux/store/slices/cvAnalyzeSlice';
import { useFile } from '../../context/fileContext';
import CircularProgress from '@mui/material/CircularProgress';

function Header() {
    const [cvScore, setCvScore] = useState(0); 
    const dispatch = useDispatch();
    const analyzeData= useSelector((state) => state.cvAnalyze);
    const { uploadedFile } = useFile();

    useEffect(() => {
        console.log("Uploading file:*******", uploadedFile);
        if (uploadedFile) {
            dispatch(cvAnalyzeAction(uploadedFile));
        }
    }, [dispatch, uploadedFile]);
    
    useEffect(() => {
        console.log("Analyzed Data:", analyzeData); 
        if (analyzeData?.cvAnalyze?.atsScore) {
            setCvScore(analyzeData.cvAnalyze.atsScore);
        }
    }, [analyzeData]);
    

    const loading = useSelector((state) => state.cvAnalyze.loading);

    return (
        <Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant='h5' sx={{ my: 1 }}>
                        CV Analysis Results
                    </Typography>
    
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant='h6' sx={{ fontSize: 18, my: 2 }}>
                            CV Score
                        </Typography>
                        <Typography variant='h6' sx={{ fontSize: 18 }}>
                            {cvScore}/100
                        </Typography>
                    </Box>
    
                    <BorderLinearProgress variant="determinate" value={cvScore} />
    
                    
                </>
            )}
        </Box>
    );
    
}

export default Header
