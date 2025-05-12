import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Switch,
  Popover,
  Avatar,
  Icon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/Auth/AuthContext';
import ProWarning from './proWarning';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElPro, setAnchorElPro] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, updateUserFromPayment } = useAuth();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';
  const paymentState = useSelector((state: any) => state.payment);

  useEffect(() => {
    if (paymentState.success && paymentState.user) {
      updateUserFromPayment(paymentState.user, Cookies.get("token") || '');
      console.log("User updated after payment:", paymentState.user);
    }
  }, [paymentState.success, paymentState.user, updateUserFromPayment]);

  const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL_PRODUCTION;

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleProClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPro(event.currentTarget);
  };

  const handleProClose = () => {
    setAnchorElPro(null);
  };

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'ar' : 'en');
  };

  const pages = [
    { label: t('Home'), href: "/" },
    { label: t("Blogs"), href: "/Blogs" },
    { label: t("Tips"), href: "/tips" }
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          {/* Logo for desktop */}
      <Box
  onClick={() => navigate('/')}
  sx={{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    cursor: 'pointer',
  }}
>
  <img 
    src="Images/logo.png" 
    alt="Logo" 
    style={{ width: 60, height: 60, marginRight: 8 }} 
  />
  <Typography
    variant="h6"
    noWrap
    sx={{
      color: '',
      textDecoration: 'none',
      fontWeight: "bold",
      fontSize: "22px"
    }}
  >
    SMART CV
  </Typography>
</Box>


          {/* Mobile menu button and logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              onClick={() => navigate('/')}
              sx={{
                ml: 2,
                display: 'flex',
                flexGrow: 1,
                color: 'black',
                textDecoration: 'none',
                cursor: 'pointer',
                alignItems: 'center'
              }}
            >
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              Smart-CV
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Menu
            id="mobile-menu"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
               {isAuthenticated && (
              <MenuItem>
                <Avatar sx={{ bgcolor: 'primary.main', marginInlineEnd: 1 }}>
                  {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </Avatar>
                {user?.firstName || user?.email?.split("@")[0]}
              </MenuItem>
            )}
            {pages.map((page) => (
              <MenuItem key={page.label} onClick={() => { handleCloseNavMenu(); navigate(page.href); }}>
                <Typography textAlign="center" sx={{ color: 'black' }}>{page.label}</Typography>
              </MenuItem>
            ))}
         
            <MenuItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: "14px", mx: 1 }}>{isRTL ? 'ع' : 'En'}</Typography>
                <Switch checked={currentLang === 'ar'} onChange={toggleLanguage} color="primary" />
              </Box>
            </MenuItem>
            {!isAuthenticated && (
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/login'); }}>
                <Button fullWidth sx={{ background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
                  {t("LogIn")}
                </Button>
              </MenuItem>
            )}
            {user?.role === "normal user" && (
              <MenuItem onClick={() => { handleCloseNavMenu(); setOpenPaymentDialog(true); }}>
                <Button fullWidth sx={{ background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
                  {t("Go Pro")}
                </Button>
              </MenuItem>
            )}
            {user?.role === "pro user" && (
              <MenuItem onClick={handleProClick}>
                <Button fullWidth sx={{ background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
                  {t("Pro")}
                </Button>
              </MenuItem>
            )}
            {isAuthenticated && (
              <MenuItem onClick={() => { 
                handleCloseNavMenu(); 
                navigate('/settings');
              }}>
                <SettingsIcon sx={{ mr: 1 }} />
                {t("Settings")}
              </MenuItem>
            )}
            {isAuthenticated && (
              <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                <LogoutOutlinedIcon sx={{ mr: 1 }} />
                {t("Logout")}
              </MenuItem>
            )}
          </Menu>

         {/* Desktop menu items */}
<Box
  sx={{
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
    flexDirection: "row reverse",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "40px"
  }}
>

  {pages.map((page) => (
    <Typography
      key={page.label}
      onClick={() => navigate(page.href)}
      sx={{
        color: "black",
        textDecoration: "none",
        cursor: "pointer",
        fontWeight: 500
      }}
    >
      {page.label}
    </Typography>
  ))}

  {!isAuthenticated && (
    <Button
      onClick={() => navigate('/login')}
      sx={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
        color: "white",
        fontSize: "12px"
      }}
    >
      {t("LogIn")}
    </Button>
  )}

  {user?.role === "normal user" && (
    <Button
      onClick={() => setOpenPaymentDialog(true)}
      sx={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
        color: "white",
        fontSize: "12px"
      }}
    >
      {t("Go Pro")}
    </Button>
  )}
{!isAuthenticated && ( <MenuItem>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontSize: "14px", mx: 1 }}>
                {currentLang === 'ar' ? 'ع' : 'En'}
              </Typography>
              <Switch
                checked={currentLang === 'ar'}
                onChange={() => { toggleLanguage(); handleUserClose(); }}
                color="primary"
              />
            </Box>
          </MenuItem>)}
  {user?.role === "pro user" && (
    <>
      <Button
        onClick={handleProClick}
        sx={{
          background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
          color: "white",
          fontSize: "12px",
        }}
      >
        {t("Pro")}
      </Button>
      <Popover
        open={Boolean(anchorElPro)}
        anchorEl={anchorElPro}
        onClose={handleProClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 250, background: "#fff", borderRadius: "10px", boxShadow: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#6a11cb" }}>
            {t("Pro Account Details")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#444" }}>
            <strong>{t("User")}:</strong> {user?.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "#444" }}>
            <strong>{t("Plan")}:</strong> {user?.role}
          </Typography>
          <Typography variant="body2" sx={{ color: "#444" }}>
            <strong>{t("Expires at")}:</strong> {user?.proExpiresAt ? new Date(user.proExpiresAt).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      </Popover>
    </>
  )}
  {isAuthenticated && (
    <>
      <IconButton onClick={handleUserClick} sx={{ p: 0,marginInlineEnd: 2 }}>
        <Avatar>
          {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        open={Boolean(anchorElUser)}
        anchorEl={anchorElUser}
        onClose={handleUserClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 1.5 }}
      >
        <Box sx={{ p: 2, minWidth: 100 }}>
           {user?.firstName || user?.email?.split("@")[0]}
        <MenuItem>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontSize: "14px", mx: 1 }}>
                {currentLang === 'ar' ? 'ع' : 'En'}
              </Typography>
              <Switch
                checked={currentLang === 'ar'}
                onChange={() => { toggleLanguage(); handleUserClose(); }}
                color="primary"
              />
            </Box>
          </MenuItem>
          <MenuItem onClick={() => { 
            handleUserClose(); 
            navigate('/settings');
          }}>
            <SettingsIcon sx={{ mr: 1 }} />
            {t("Settings")}
          </MenuItem>
          <MenuItem onClick={() => { handleLogout(); handleUserClose(); }}>
            <LogoutOutlinedIcon sx={{ mr: 1 }} />
            {t("Logout")}
          </MenuItem>
        </Box>
      </Popover>
    </>
  )}
</Box>

        </Toolbar>
      </Container>
      <ProWarning openPaymentDialog={openPaymentDialog} setOpenPaymentDialog={setOpenPaymentDialog} />
    </AppBar>
  );
}

export default Navbar;
