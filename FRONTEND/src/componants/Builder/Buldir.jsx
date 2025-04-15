import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Paper, Tabs, Tab, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { theme } from '../theme';
import Personal from './Edit/Personal';
import Experience from './Edit/Experience';
import Education from './Edit/Education';
import Skills from './Edit/Skills';
import Preview from './Preview';
import Header from './header';

const Builder = () => {
  const [editMode, setEditMode] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />

        <Box
          sx={{
            maxWidth: '100%',
            width: { xs: '100%', sm: '95%', md: '90%', lg: '1000px' },
            ml: 'auto', 
            mr: 0,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 4 },
          }}
        >
          {/* Edit/Preview Tabs */}
          <Paper
            sx={{
              mb: 3,
              bgcolor: 'background.gray',
              height: '30px',
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <Tabs
              value={editMode ? 'edit' : 'preview'}
              onChange={(e, newValue) => setEditMode(newValue === 'edit')}
              sx={{
                height: '100%',
                minHeight: 'unset',
                '& .MuiTabs-flexContainer': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '100%',
                },
                '& .MuiTab-root': {
                  fontWeight: 600,
                  flex: 1,
                  maxWidth: 'none',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  height: '100%',
                  minHeight: 'unset',
                  padding: 0,
                  margin: 0,
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab
                icon={<EditOutlinedIcon fontSize="small" />}
                iconPosition="start"
                label="Edit"
                value="edit"
              />
              <Tab
                icon={<VisibilityOutlinedIcon fontSize="small" />}
                iconPosition="start"
                label="Preview"
                value="preview"
              />
            </Tabs>
          </Paper>

          {editMode ? (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {/* Section Tabs */}
           
<Paper
  sx={{
    mb: 3,
    bgcolor: 'background.gray',
    height: '30px',
    overflow: 'hidden',
    width: { xs: '100%', sm: '60%' }, // Responsive width
    mx: 'auto', 
   
  }}
>
  <Tabs
    value={activeTab}
    onChange={handleTabChange}
    sx={{
      height: '100%',
      minHeight: 'unset',
      width: '100%',
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        height: '100%',
        width: '100%',
      },
      '& .MuiTab-root': {
        fontWeight: 600,
        textTransform: 'none',
        height: '100%',
        minHeight: 'unset',
        padding: 0,
        margin: 0,
        flex: 1,
        minWidth: 0,
        fontSize: '0.8rem',
        '&.Mui-selected': {
          color: 'primary.main',
          bgcolor: 'white',
          borderRadius: 2,
        },
      },
      '& .MuiTabs-indicator': {
        display: 'none',
      },
    }}
  >
    <Tab label="Personal" value="personal" />
    <Tab label="Experience" value="experience" />
    <Tab label="Education" value="education" />
    <Tab label="Skills" value="skills" />
  </Tabs>
</Paper>


              <Divider sx={{ mb: 3 }} />

              {/* Content Area */}
              <Box
                sx={{
                  p: { xs: 1, sm: 2 },
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                {activeTab === 'personal' && <Personal />}
                {activeTab === 'experience' && <Experience />}
                {activeTab === 'education' && <Education />}
                {activeTab === 'skills' && <Skills />}
              </Box>
            </Paper>
          ) : (
            <Preview />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Builder;
