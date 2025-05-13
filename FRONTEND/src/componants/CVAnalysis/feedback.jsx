import { Box, Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useFile } from '../../context/fileContext';
import { cvAnalyzeAction } from '../../redux/store/slices/cvAnalyzeSlice';
import CircularProgress from '@mui/material/CircularProgress';



function Feedback() {

const dispatch = useDispatch();
const analyzeData = useSelector((state) => state.cvAnalyze);
const { uploadedFile } = useFile();


const [good, setGood] = useState([]);
const [bad, setBad] = useState([]);
const [warning, setWarning] = useState([]);

const loading = useSelector((state) => state.cvAnalyze.loading);

// useEffect(()=>{
//  if(uploadedFile){
//     dispatch(cvAnalyzeAction(uploadedFile));
//  }
// },[dispatch, uploadedFile]);

useEffect(()=>{
    if(analyzeData?.cvAnalyze){
        setGood(analyzeData.cvAnalyze.positiveFeedback || []);
        setBad(analyzeData.cvAnalyze.negativeFeedback || []);
        setWarning(analyzeData.cvAnalyze.neutralFeedback || []);
    }
},[analyzeData]);

   

    const renderFeedbackSection = (title, items, severity) => (
        items.length > 0 && (
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: `${severity}.main` }}>
                    {title}
                </Typography>
                {items.map((item,index) => (
                    <Alert
                        key={`${severity}-${index}`}
                        severity={severity}
                        sx={{
                            mb: 1,
                            borderLeft: `5px solid`,
                            borderColor: `${severity}.main`,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        }}
                    >
                        {item}
                    </Alert>
                ))}
            </Box>
        )
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", p: 3, mt: 3, backgroundColor: "#fafafa", borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Feedback Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {renderFeedbackSection("✅ Strengths", good, "success")}
                    {renderFeedbackSection("⚠️ Warnings", warning, "warning")}
                    {renderFeedbackSection("❌ Issues", bad, "error")}
                </>
            )}
        </Box>
    );
    
}

export default Feedback;
