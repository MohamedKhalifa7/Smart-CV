import { useCV } from "../../../context/CVcontext";
import { Box, Typography, TextField, Grid, Button, IconButton } from '@mui/material';
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Education</Typography>
      
      {educations.map((edu, index) => (
        <Box key={index} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institution"
                name="institution"
                value={edu.institution || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={edu.degree || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={edu.location || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Start Year"
                name="startYear"
                value={edu.startYear || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="End Year"
                name="endYear"
                value={edu.endYear || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={edu.description || ''}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => removeEducation(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addEducation}
        sx={{ mt: 2 }}
      >
        Add Education
      </Button>
    </Box>
  );
};

export default Education;