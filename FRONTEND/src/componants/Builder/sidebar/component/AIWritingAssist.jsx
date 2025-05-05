import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, CircularProgress, IconButton, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { generateContentAction } from '../../../../redux/store/slices/generateContentSlice'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect, useState } from 'react';

const generatedSection = ['Professional Summary', 'Work Experience', 'Skills', 'Education'];
const experienceLevel = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)'];
const industryOptions = [
  'Software',
  'Technology',
  'Information Technology',
  'Artificial Intelligence',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'E-commerce',
  'Construction',
  'Media',

];


function AIWritingAssistDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [formData, setFormData] = useState({
    jobTitle: '',
    sectionName: 'Professional Summary',
    industry: '',
    experience: 'Entry Level (0-2 years)',
  });

  const [contentVisible, setContentVisible] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  const dispatch = useDispatch();
  const contentGenerated = useSelector((state) => state.generateContent.generateContent);
  const loading = useSelector((state) => state.generateContent.loading);

  useEffect(() => {
    if (contentGenerated && contentGenerated.trim() !== '') {
      setEditableContent(contentGenerated);
      setContentVisible(true);
    }
  }, [contentGenerated]);

  useEffect(() => {
    setContentVisible(false);
  }, [formData]);

  const handleClose = () => {
    setFormData({
      jobTitle: '',
      sectionName: 'Professional Summary',
      industry: '',
      experience: 'Entry Level (0-2 years)',
    });
    setEditableContent('');
    setContentVisible(false);
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
    dispatch(generateContentAction(formData));
    setContentVisible(true);
    console.log('Form data:', formData);
    console.log('Generated content:', contentGenerated);
    console.log('Loading:', loading);
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>AI Writing Assistant</DialogTitle>
        <CloseIcon
          sx={{ cursor: 'pointer', color: '#555', marginRight: '10px' }}
          onClick={handleClose}
        />
      </Box>
      <List sx={{ pt: 0, px: 2, pb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            py: 3,
            gap: '30px',
          }}
        >
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
                name="sectionName"
                value={formData.sectionName}
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


              {/* <TextField
                fullWidth
                placeholder="e.g. Technology"
                variant="outlined"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              /> */}


<Autocomplete
  freeSolo
  options={industryOptions}
  value={formData.industry}
  onChange={(event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      industry: newValue || '',
    }));
  }}
  onInputChange={(event, newInputValue) => {
    setFormData((prev) => ({
      ...prev,
      industry: newInputValue,
    }));
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select or type industry"
      variant="outlined"
    />
  )}
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
          disabled={!isFormValid || loading}
          onClick={handleGenerate}
          sx={{ width: '50%', mx: 'auto', alignSelf: 'center', mb: 3 }}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
        >
           {loading ? "Generating..." : "Generate Content"}
        </Button>

        {contentVisible && (
          <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'end'}}>
          <TextField
            sx={{ mb: 2 }}
            multiline
            minRows={4}
            variant="outlined"
            fullWidth
            value={editableContent}
            onChange={(e) => {
              const value = e.target.value;
              setEditableContent(value);
              if (value.trim() === '') {
                setContentVisible(false);
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(editableContent);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
          />
          {/* <Button variant='contained' sx={{   alignSelf: 'right', mb: 3 }} onClick={()=>{}}>
              Insert into CV
        </Button> */}
          </Box>
        )}

        

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tips:
          </Typography>
          <ul style={{ marginLeft: '1.2rem', color: '#555', listStyleType: 'disc' }}>
            <li>Provide a clear job title and industry for better results.</li>
            <li style={{ marginTop: '8px', marginBottom: '8px' }}>
              Specify the section you want to generate for more targeted content.
            </li>
            <li>Use the experience level to tailor the content to your needs.</li>
          </ul>
        </Box>
      </List>
    </Dialog>
  );
}

//to be inserted in choose template dialog
AIWritingAssistDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default AIWritingAssistDialog;
