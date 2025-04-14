import { Box, Typography, Divider, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { useCV } from '../../../context/CVcontext';

const Personal = () => {
  const { formData, updateSection } = useCV();
  const personal = formData.personal || {};

  const handleChange = (e) => {
    updateSection('personal', {
      ...personal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '12px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Personal Information Section */}
      <Typography variant="h6" sx={{ 
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
          <Typography variant="body2" sx={{ 
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
            value={personal.firstName || ''}
            onChange={handleChange}
            placeholder="John"
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
          <Typography variant="body2" sx={{ 
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
            value={personal.lastName || ''}
            onChange={handleChange}
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
        <Typography variant="body2" sx={{ 
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
            value={personal.professionalTitle || ''}
            onChange={handleChange}
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
        <Typography variant="body2" sx={{ 
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
            value={personal.email || ''}
            onChange={handleChange}
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
        <Typography variant="body2" sx={{ 
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
            value={personal.phone || ''}
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
        <Typography variant="body2" sx={{ 
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
            value={personal.location || ''}
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
        <Typography variant="body2" sx={{ 
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
          name="summary"
          value={personal.summary || ''}
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