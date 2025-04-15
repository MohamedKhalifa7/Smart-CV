import { useCV } from "../../../context/CVcontext";
import { Box, Typography, TextField, Button, IconButton, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Education = () => {
  const { formData, updateSection } = useCV();
  const educations = formData.education || [{}];

  const handleChange = (index, e) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [e.target.name]: e.target.value,
    };
    updateSection('education', updatedEducations);
  };

  const addEducation = () => {
    updateSection('education', [...educations, {}]);
  };

  const removeEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    updateSection('education', updatedEducations);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
      {/* Header row with title and add button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>
          Education
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
          sx={{
            bgcolor: '#4e54c8',
            color: 'white',
            '&:hover': {
              bgcolor: '#3f46a5'
            },
            fontSize: '0.85rem',
            padding: '6px 12px'
          }}
        >
          Add Education
        </Button>
      </Stack>

      {/* Education container */}
      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 2 }}>
        {educations.map((edu, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                Education {index + 1}
              </Typography>

              <IconButton onClick={() => removeEducation(index)} sx={{ color: '#ff4444' }}>
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* First row: Institution and Degree side by side */}
            <Box sx={{ display: 'flex', gap: '12px', mb: 2 }}>
              <Box sx={{ width: '50%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Institution
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="institution"
                  value={edu.institution || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="University Name"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInput-input': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '4px 8px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: '50%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Degree
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Bachelor's in Computer Science"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInput-input': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '4px 8px',
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Second row: Location, Start Year, and End Year side by side */}
            <Box sx={{ display: 'flex', gap: '12px', mb: 2 }}>
              <Box sx={{ width: '50%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Location
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="location"
                  value={edu.location || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="New York, NY"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInput-input': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '4px 8px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: '25%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Start Year
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="startYear"
                  value={edu.startYear || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2018"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInput-input': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '4px 8px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: '25%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  End Year
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="endYear"
                  value={edu.endYear || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2022"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInput-input': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '4px 8px',
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Third row: Description takes full width */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                Description (Optional)
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                name="description"
                value={edu.description || ''}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your education experience here..."
                multiline
                rows={3}
                InputProps={{ disableUnderline: true }}
                sx={{
                  '& .MuiInput-input': {
                    border: '1px solid #ddd',
                    height: '30px',
                    padding: '8px',
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>

            {/* Divider to separate education sections */}
            {index < educations.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Education;
