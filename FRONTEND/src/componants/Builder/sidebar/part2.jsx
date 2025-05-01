import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCV } from '../../../context/CVcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const Part2 = () => {
    const [myCvs, setMyCvs] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { t } = useTranslation();
    const { fetchUserCVs, setFormData } = useCV(); 
    const navigate = useNavigate(); // Add this

    useEffect(() => {
        const getCVs = async () => {
            try {
                const cvs = await fetchUserCVs();
                setMyCvs(cvs);
            } catch (error) {
                setError(t('errorFetchingCVs'));  
            }
        };
        getCVs();
    }, [t]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/cvbuilder/${id}`, { withCredentials: true });
            console.log('CV deleted successfully:', response.data);
            
            // Fetch updated CVs after deletion
            const updatedCvs = await fetchUserCVs();
            setMyCvs(updatedCvs);  // Update the state with the new list of CVs
            
            setSuccess(true); // Show success message after delete
            setError('');

            setTimeout(() => {
                setSuccess(false);
            }, 3000);  // Hide success alert after 3 seconds

        } catch (error) {
            setError(error.response ? error.response.data : t('errorDeletingCV'));  
            setSuccess(false);
        }
    };

    const handlePreview = (cv) => {
        setFormData(cv);      // 1. Update formData with the selected CV
        // navigate('/preview'); // 2. Navigate to the preview page
    };

    return (
        <Box
            sx={{
                py: 2, px: 2,
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 2,
            }}
        >
            <Typography variant='body1'>{t('myCVs')}</Typography> 

            {/* Alert messages */}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {t('cvDeletedSuccessfully')} 
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Display CVs */}
            {myCvs.map((cv, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                    onClick={() => handlePreview(cv)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextSnippetIcon />
                        <Typography variant='body1'>{cv.personalInfo.professionalTitle}</Typography>
                    </Box>

                    <Button
                        variant='outlined'
                        size='small'
                        color='error'
                        onClick={() => handleDelete(cv._id)}
                        sx={{ minWidth: 'auto', px: 1 }}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>
            ))}

            <Button variant='outlined'
             sx={{ mt: 2 }} 
             fullWidth
             onClick={() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    education: [],
                    experience: [],
                    skills: [], // <-- Important!
                    summary: '',
                });
             }}
            >
                {t('newCV')} 
            </Button>
        </Box>
    );
};

export default Part2;
