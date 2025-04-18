import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { theme } from '../theme';
import { ThemeProvider, useTheme } from '@mui/material/styles';

const Header = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
      <AppBar position="static" sx={{ 
        bgcolor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: 'white'
      }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            pt: 2,
            pb: 1,
          }}
        >
          {/* Title and subtitle */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : 'auto' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: muiTheme.customStyles.gradientText,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              CV Builder
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontSize: '0.9rem',
                mt: 0.5,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              Create your professional CV with our easy-to-use tools
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: 'center',
              width: isMobile ? '50%' : 'auto',
              mx: isMobile ? "auto" : 2,
              mt: isMobile ? 2 : 0,
              gap: isMobile ? 1 : 0,
            }}
          >
            <Button
              startIcon={<SaveIcon />}
              fullWidth={isMobile}
              sx={{
                mr: isMobile ? 0 : 2,
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
              fullWidth={isMobile}
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
  );
};

export default Header;
