import { Box, Typography, Divider, TextField, useMediaQuery, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { useCV } from '../../../context/CVcontext';
import { useEffect, useState } from 'react';

const Personal = () => {
  const { formData, updateSection, personalFormValid, validatePersonalInfo } = useCV();
  const personalInfo = formData.personalInfo || {};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (e) => {

    const updatedInfo = {
      ...personalInfo,
      [e.target.name]: e.target.value,
    };

    updateSection('personalInfo', updatedInfo);

    validatePersonalInfo(updatedInfo);

  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: isMobile ? '90%' : '800px',
      margin: '0 auto',
      padding: '12px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Personal Information Section */}
      <Typography variant="h3" sx={{
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#333',
        textAlign: 'left',
        fontSize: '1.1rem'
      }}>
        Personal Information
      </Typography>

      {/* First and Last Name */}
      <Box sx={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <Box sx={{ width: '50%' }}>
          <Typography variant="subtitle1" sx={{
            marginBottom: '2px',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '0.85rem'
          }}>
            First Name
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            name="firstName"
            value={personalInfo.firstName || ''}
            onChange={handleChange}
            placeholder="John"
            required
            error={Boolean(personalFormValid.firstName)}
            helperText={personalFormValid.firstName}
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              },
            }}
          />
        </Box>

        <Box sx={{ width: '50%' }}>
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            marginBottom: '2px',
            textAlign: 'left',
            fontSize: '0.85rem'
          }}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            name="lastName"
            value={personalInfo.lastName || ''}
            onChange={handleChange}
            error={Boolean(personalFormValid.lastName)}
            helperText={personalFormValid.lastName}
            placeholder="Smith"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              },
            }}
          />
        </Box>
      </Box>

      {/* Professional Title */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          marginBottom: '2px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          Professional Title
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <WorkIcon sx={{ color: '#555', fontSize: '1rem' }} />
          <TextField
            fullWidth
            variant="standard"
            name="professionalTitle"
            value={personalInfo.professionalTitle || ''}
            onChange={handleChange}
            error={Boolean(personalFormValid.professionalTitle)}
            helperText={personalFormValid.professionalTitle}
            placeholder="Marketing Manager"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }
            }}
          />
        </Box>
      </Box>

      {/* Email */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          marginBottom: '2px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          Email
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EmailIcon sx={{ color: '#555', fontSize: '1rem' }} />
          <TextField
            fullWidth
            variant="standard"
            name="email"
            value={personalInfo.email || ''}
            onChange={handleChange}
            error={Boolean(personalFormValid.email)}
            helperText={personalFormValid.email}
            placeholder="john.smith@example.com"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }
            }}
          />
        </Box>
      </Box>

      {/* Phone */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          marginBottom: '2px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          Phone
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneIcon sx={{ color: '#555', fontSize: '1rem' }} />
          <TextField
            fullWidth
            variant="standard"
            name="phone"
            value={personalInfo.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }
            }}
          />
        </Box>
      </Box>

      {/* Location */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          marginBottom: '2px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          Location
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LocationOnIcon sx={{ color: '#555', fontSize: '1rem' }} />
          <TextField
            fullWidth
            variant="standard"
            name="location"
            value={personalInfo.location || ''}
            onChange={handleChange}
            placeholder="New York, NY"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                height: '26px',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }
            }}
          />
        </Box>
      </Box>

      {/* Professional Summary */}
      <Box>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold',
          marginBottom: '2px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          Professional Summary
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          variant="outlined"
          name="ProfessionalSummary"
          value={personalInfo.ProfessionalSummary || ''}
          onChange={handleChange}
          placeholder="Write your professional summary here..."
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              '& textarea': {
                padding: '0',
                fontSize: '0.85rem',
                minHeight: '60px'
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Personal;