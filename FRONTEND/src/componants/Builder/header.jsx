import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { theme } from '../theme';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCV } from '../../context/CVcontext';
import { useState } from 'react';

const Header = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const {formData,fetchUserCVs,validatePersonalInfo}=useCV();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handelSave = async () => {
    const isValid = validatePersonalInfo(formData.personalInfo);

    if (!isValid) {
      setError('Please fill in all required fields.');

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
        setError('Error saving CV');
        setTimeout(() => {
          setError('');
         }, 3000);
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
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            CV Builder
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
            Create your professional CV with our easy-to-use tools
          </Typography>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'center',
            width: isMobile ? '50%' : 'auto',
            mx: isMobile ? "auto" : 2,
            mt: isMobile ? 2 : 0,
            gap: isMobile ? 1 : 0,
          }}
        >
           {success && (
            <Alert severity="success" sx={{ mr: 2 }}>
              CV saved successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            onClick={handelSave}
            startIcon={<SaveIcon />}
            fullWidth={isMobile}
            sx={{
              mr: isMobile ? 0 : 2,
            }}
            variant="outlined"
          >
            Save
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            fullWidth={isMobile}
            variant="contained"
          >
            Download
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
