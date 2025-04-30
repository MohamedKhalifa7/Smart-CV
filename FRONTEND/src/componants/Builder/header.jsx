import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { theme } from '../theme';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCV } from '../../context/CVcontext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UpdateIcon from '@mui/icons-material/Update';
import { useTemplate } from '../../context/choosenTempContext';

const Header = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const {formData,fetchUserCVs,validatePersonalInfo}=useCV();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

    const { choosenTemp } = useTemplate();
  

  const {exportCV}=useCV()

  const handleDownload = () => {
    exportCV(formData._id, choosenTemp); 
  };

  const handelSave = async () => {
    const isValid = validatePersonalInfo(formData.personalInfo);

    if (!isValid) {
      setError(t('Please fill in all required fields.'));

      setTimeout(() => {
       setError('');
      }, 3000);

      setSuccess(false);
      return;
    }
   try {

      const response = await axios.post('http://localhost:3001/cvbuilder/save', formData, {
        withCredentials: true,
      });

      fetchUserCVs(); // Refresh the CVs list
      setSuccess(true);
      setError('');

      setTimeout(() => {
        setSuccess(false);
      }, 3000);  // Hide success alert after 3 seconds
      
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError(error.response.data.message); 
        setTimeout(() => {
          setError('');
         }, 10000);
      } else {
        setError(t('Error saving CV'));
        setTimeout(() => {
          setError('');
         }, 3000);
      }
    }
  };

  const handleEdit = async () => {
    const isValid = validatePersonalInfo(formData.personalInfo);
  
    if (!isValid) {
      setError(t('Please fill in all required fields.'));
      setTimeout(() => setError(''), 3000);
      setSuccess(false);
      return;
    }
  
    if (!formData._id) {
      setError(t('CV ID is missing.'));
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:3001/cvbuilder/${formData._id}`, formData, {
        withCredentials: true,
      });
  
      fetchUserCVs();
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update error:", error);
      if (error.response && error.response.status === 403) {
        setError(error.response.data.message);
        setTimeout(() => setError(''), 10000);
      } else {
        setError(t('Error updating CV'));
        setTimeout(() => setError(''), 3000);
      }
    }
  };
  
  

  return (
    <AppBar position="static" sx={{ 
      bgcolor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      color: 'white'
    }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          pt: 2,
          pb: 1,
        }}
      >
        {/* Title and subtitle */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : 'auto' }}>
          <Typography
            variant="h4"
            onClick={() => navigate('/')}
            component="div"
            sx={{
              color: muiTheme.customStyles.gradientText,
              textAlign: isMobile ? 'center' : 'start'
            }}
          >
            {t("CV Builder")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              mt: 0.5,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {t("Create your professional CV with our easy-to-use tools")}
          </Typography>
        </Box>

        {/* Buttons */}
        <Box
  sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    justifyContent: 'center',
    width: isMobile ? '90%' : 'auto',
    mx: isMobile ? "auto" : 2,
    mt: isMobile ? 2 : 0,
    gap: 2, // Add consistent spacing between buttons
    flexWrap: 'wrap' // optional: wrap on smaller screens
  }}
>
  {success && (
    <Alert severity="success" sx={{ width: '100%' }}>
      {t("CV saved successfully!")}
    </Alert>
  )}
  {error && (
    <Alert severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  )}

{formData && formData._id && (
  <Button
    onClick={handleEdit}
    startIcon={<UpdateIcon sx={{ marginInlineEnd: 1 }} />}
    fullWidth={isMobile}
    variant="outlined"
  >
    {t('Update')}
  </Button>
)}


  <Button
    onClick={handelSave}
    startIcon={<SaveIcon sx={{ marginInlineEnd: 1 }} />}
    fullWidth={isMobile}
    variant="outlined"
  >
    {t('Save')}
  </Button>

  <Button
    startIcon={<DownloadIcon sx={{ marginInlineEnd: 1 }} />}
    fullWidth={isMobile}
    variant="contained"
    onClick={handleDownload}
  >
    {t("Download")}
  </Button>
</Box>


      </Toolbar>
    </AppBar>
  );
};

export default Header;
