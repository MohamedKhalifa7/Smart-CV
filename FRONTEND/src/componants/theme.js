import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6a11cb',
      light: '#8e2de2',
      dark: '#4a00e0',
    },
    secondary: {
      main: '#8f94fb',
    },
    background: {
      default: '#f9f9ff',
      paper: '#ffffff',
      gray: '#eeeeee',
    },
    text: {
      primary: '#2d2d2d',
      secondary: '#555555',
      white: '#ffffff'
    },
    gradients: {
      purple: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
      purpleHover: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)'
    }
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#2d2d2d',
    },
    h5: {
      fontWeight: 600,
      color: '#2d2d2d',
    },
    h6: {
      fontWeight: 600,
      color: '#2d2d2d',
    },
    subtitle1: {
      color: '#555555',
      fontSize: '0.9rem'
    },
    body1: {
      color: '#555555',
      fontSize: '1rem'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2d2d2d',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '8px 16px'
        },
        contained: {
          background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)',
          }
        },
        outlined: {
          color: '#6a11cb',
          borderColor: '#6a11cb',
          '&:hover': {
            borderColor: '#6a11cb',
            backgroundColor: 'rgba(106, 17, 203, 0.08)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#ddd',
            },
            '&:hover fieldset': {
              borderColor: '#aaa',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '20px',
        },
      },
    },
  },
  customStyles: {
    gradientText: {
      background: 'linear-gradient(135deg, #6a11cb 10%,rgb(226, 45, 211) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      display: 'inline-block'
    }
  }
});