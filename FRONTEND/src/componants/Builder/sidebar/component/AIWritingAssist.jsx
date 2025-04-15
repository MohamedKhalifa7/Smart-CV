import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';

const generatedSection = ['Professional Summary', 'Work Experience', 'Skills', 'Education'];
const experienceLevel = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)'];

function AIWritingAssistDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [formData, setFormData] = React.useState({
    jobTitle: '',
    section: 'Professional Summary',
    industry: '',
    experience: 'Entry Level (0-2 years)',
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = () => {
    // submit logic from back
    console.log('Generating content for:', formData);
    onClose(formData);
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
      <DialogTitle>AI Writing Assistant</DialogTitle>
      <CloseIcon 
      sx={{cursor: 'pointer', color: '#555', marginRight: '10px'}}
      onClick={() => onClose(formData)}></CloseIcon>
      </Box>
      <List sx={{ pt: 0, px: 2, pb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 3, gap: '30px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 5 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Job Title
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Frontend Developer"
                variant="outlined"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Section to Generate
              </Typography>
              <TextField
                fullWidth
                select
                name="section"
                value={formData.section}
                onChange={handleChange}
              >
                {generatedSection.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 5 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Industry
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Technology"
                variant="outlined"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Experience Level
              </Typography>
              <TextField
                fullWidth
                select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                {experienceLevel.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Box>

        <Button
          disabled={!isFormValid}
          onClick={handleGenerate}
          sx={{ width: '50%', mx: 'auto', alignSelf: 'center', mb: 3 }}
          variant="contained"
          startIcon={<AutoFixHighIcon />}
        >
          Generate Content
        </Button>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tips:
          </Typography>
          <ul style={{ marginLeft: '1.2rem', color: '#555', listStyleType: 'disc' }}>
            <li>Provide a clear job title and industry for better results.</li>
            <li style={{ marginTop: '8px', marginBottom: '8px' }}>Specify the section you want to generate for more targeted content.</li>
            <li>Use the experience level to tailor the content to your needs.</li>
          </ul>
        </Box>
      </List>
    </Dialog>
  );
}

AIWritingAssistDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default AIWritingAssistDialog;
