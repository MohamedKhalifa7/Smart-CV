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
import Header from './Header';
import Part1 from './sidebar/part1';
import Part2 from './sidebar/part2';
import SideBar from './sidebar/sideBar';

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          minHeight: '100vh',
}}>

<Box  sx={{
          width:'20%',
          my:3,
          minWidth: '220px',
         }}>
       <SideBar >

       </SideBar>
       </Box>
        <Box sx={{ 
          maxWidth: 'lg', 
          ml: 'auto', 
          mr: 0,
          p: 3,
          flexGrow: 1,
        }}>
          {/* Edit/Preview Tabs */}
          <Paper sx={{ 
            mb: 3, 
            bgcolor: "background.gray",
            height: "30px",
            overflow: "hidden"
          }}>
            <Tabs
              value={editMode ? 'edit' : 'preview'}
              onChange={(e, newValue) => setEditMode(newValue === 'edit')}
              sx={{
                height: "100%",
                minHeight: "unset",
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
                  height: '100%',
                  minHeight: "unset",
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
            <Paper sx={{ 
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {/* Content Tabs */}
              <Paper sx={{ 
                mb: 3,
                bgcolor: "background.gray",
                height: "30px",
                overflow: "hidden",
                width: "50%",
                mx :"auto"
              }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  sx={{
                    height: "100%",
                    minHeight: "unset",
                    width: "100%",
                    '& .MuiTabs-flexContainer': {
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                    },
                    '& .MuiTab-root': { 
                      fontWeight: 600,
                      textTransform: 'none',
                      height: '100%',
                      minHeight: "unset",
                      padding: 0,
                      margin: 0,
                      flex: 1, 
                      minWidth: 0, 
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
              <Paper sx={{ 
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {activeTab === 'personal' && <Personal />}
                {activeTab === 'experience' && <Experience />}
                {activeTab === 'education' && <Education />}
                {activeTab === 'skills' && <Skills />}
              </Paper>
            </Paper>
          ) : (
            <Preview />
          )}
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Builder;