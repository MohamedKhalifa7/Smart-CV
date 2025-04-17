import { useState } from 'react';
import { useCV } from '../../../context/CVcontext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Skills = () => {
  const { formData, updateSection } = useCV();
  const [input, setInput] = useState('');
  const skills = formData.skills?.skills || [];
  
  // Responsive check for mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      updateSection('skills', {
        ...formData.skills,
        skills: [...skills, input.trim()],
      });
      setInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSection('skills', {
      ...formData.skills,
      skills: skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: isMobile ? '90%' : '800px', 
      margin: '0 auto', 
      padding: isMobile ? '8px' : '12px',
      borderRadius: '8px',
    }}>
      {/* Header */}
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold', 
        color: '#333', 
        fontSize: isMobile ? '1rem' : '1.1rem',
        mb: 2
      }}>
        Skills
      </Typography>

      {/* Add Skills Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 'bold', 
          fontSize: '0.85rem',
          mb: 1
        }}>
          Add Skills
        </Typography>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="e.g. Project Management"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiInput-input': {
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.85rem',
                padding: '4px 8px'
              }
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addSkill}
            sx={{
              bgcolor: '#4e54c8',
              color: 'white',
              '&:hover': { bgcolor: '#3f46a5' },
              fontSize: '0.8rem',
              padding: '4px 12px',
              width: '80px'
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>

      {/* Your Skills Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold', 
          fontSize: '0.85rem',
          mb: 1
        }}>
          Your Skills
        </Typography>
        <Box sx={{
          minHeight: '40px',
          border: skills.length ? 'none' : '1px dashed #ddd',
          borderRadius: '8px',
          padding: skills.length ? '0' : '8px',
          backgroundColor: skills.length ? 'transparent' : '#f9f9f9'
        }}>
          {skills.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill(skill)}
                  deleteIcon={<DeleteIcon style={{ fontSize: '0.85rem' }} />}
                  sx={{
                    fontSize: '0.85rem',
                    '& .MuiChip-deleteIcon': { color: '#ff4444' },
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
              No skills added yet
            </Typography>
          )}
        </Box>
      </Box>

      {/* Languages Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold', 
          fontSize: '0.85rem',
          mb: 1
        }}>
          Languages (Optional)
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          placeholder="List languages you know, e.g.: English (Native), Spanish (Intermediate), French (Basic)"
          value={formData.skills?.languages || ''}
          onChange={(e) =>
            updateSection('skills', {
              ...formData.skills,
              languages: e.target.value,
            })
          }
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInput-input': {
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '0.85rem',
              padding: '4px 8px'
            }
          }}
        />
      </Box>

      {/* Certifications Section */}
      <Box>
        <Typography variant="subtitle1" sx={{
          fontWeight: 'bold', 
          fontSize: '0.85rem',
          mb: 1
        }}>
          Certifications (Optional)
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          placeholder="List relevant certifications, e.g.: Google Analytics Certification (2022), HubSpot Inbound Marketing (2021)"
          value={formData.skills?.certifications || ''}
          onChange={(e) =>
            updateSection('skills', {
              ...formData.skills,
              certifications: e.target.value,
            })
          }
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInput-input': {
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '0.85rem',
              padding: '4px 8px'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Skills;
  