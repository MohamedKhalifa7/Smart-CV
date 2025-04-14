import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { theme } from '../theme';
import { ThemeProvider, useTheme } from '@mui/material/styles';

const Header = () => {
    const themee = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ 
        bgcolor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: 'white'
      }}>
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          alignItems: 'flex-start', 
          pt: 2, 
          pb: 1 
        }}>
          {/* Title and subtitle stacked */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography 
  variant="h4" 
  component="div" 
  sx={{ 
   color: themee.customStyles.gradientText,
   textAlign:"left"
  }}
>
  CV Builder
</Typography>
            <Typography variant="subtitle1" sx={{
                color: 'text.secondary',
              fontSize: '0.9rem',
              mt: 0.5 
            }}>
              Create your professional CV with our easy-to-use tools
            </Typography>
          </Box>
          
          {/* Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              startIcon={<SaveIcon />}
              sx={{ 
                mr: 2,
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(106, 17, 203, 0.08)'
                }
              }}
              variant="outlined"
            >
              Save
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              sx={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)',
                }
              }}
              variant="contained"
            >
              Download
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;