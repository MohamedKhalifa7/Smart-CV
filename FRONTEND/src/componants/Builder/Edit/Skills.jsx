import { useState } from 'react';
import { useCV } from '../../../context/CVcontext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Skills = () => {
  const { formData, updateSection } = useCV();
  const [input, setInput] = useState('');
  const skills = formData.skills?.skills || [];

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Skills</Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          label="Add Skill"
          placeholder="e.g. Project Management"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addSkill}
        >
          Add
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => removeSkill(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <TextField
        fullWidth
        label="Languages (Optional)"
        placeholder="e.g.: English (Native), Spanish (Intermediate)"
        value={formData.skills?.languages || ''}
        onChange={(e) =>
          updateSection('skills', {
            ...formData.skills,
            languages: e.target.value,
          })
        }
        margin="normal"
        multiline
        rows={2}
      />

      <TextField
        fullWidth
        label="Certifications (Optional)"
        placeholder="e.g.: Google Analytics Certification (2022)"
        value={formData.skills?.certifications || ''}
        onChange={(e) =>
          updateSection('skills', {
            ...formData.skills,
            certifications: e.target.value,
          })
        }
        margin="normal"
        multiline
        rows={2}
      />
    </Box>
  );
};

export default Skills;