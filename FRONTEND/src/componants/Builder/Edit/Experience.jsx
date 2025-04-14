import { useCV } from '../../../context/CVcontext';
import { Box, Typography, TextField, Button, IconButton, Grid, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { use } from "react";

const Experience = () => {
  const { formData, updateArraySection, addArrayItem, removeArrayItem } = useCV();
  const experiences = formData.experience || [];

  const handleChange = (index, field, value) => {
    updateArraySection('experience', index, { [field]: value });
  };

  const addExperience = () => {
    addArrayItem('experience', {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Work Experience
      </Typography>
      
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              <WorkHistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Experience {index + 1}
            </Typography>
            <IconButton onClick={() => removeArrayItem('experience', index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={exp.jobTitle || ''}
                onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={exp.company || ''}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={exp.location || ''}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Start Date"
                placeholder="MM/YYYY"
                value={exp.startDate || ''}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="End Date"
                placeholder="MM/YYYY or Present"
                value={exp.endDate || ''}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={exp.description || ''}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                variant="outlined"
                placeholder="Describe your responsibilities and achievements..."
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addExperience}
        sx={{ mt: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
      >
        Add Experience
      </Button>
    </Box>
  );
};

export default Experience;