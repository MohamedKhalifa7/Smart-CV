import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Switch
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const pages = [
    { label: t('Home'), href: "/" },
    { label: t("Blogs"), href: "/Blogs" },
    { label: t("Tips"), href: "/Tips" }
  ];

  const userMenuItems = [
    { label: t("Profile"), href: "profile" },
    { label: t("Settings"), href: "settings" },
    { label: t("Logout"), action: () => handleLogout() },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'ar' : 'en');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo Desktop */}
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'black',
              textDecoration: 'none',
              fontWeight: "bold",
              fontSize: "20px",
              cursor: 'pointer'
            }}
          >
            <DescriptionIcon sx={{ color: "#7d25d2", mr: 1, fontSize: "30px" }} />
            Smart-CV
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => { handleCloseNavMenu(); navigate(page.href); }}>
                  <Typography textAlign="center" sx={{ color: 'black' }}>{page.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/getStart'); }}>
                <Button fullWidth sx={{ mt: 1, background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
                 { t("Get Started")}
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
            Smart-CV
          </Typography>

          {/* Desktop Navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              gap: "40px",
              justifyContent: isRTL ? "start" : "end",
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center"
            }}
          >
            {/* Language Switch */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Typography sx={{ fontSize: "14px", mx: 1 }}>{isRTL ? 'ع' : 'En'}</Typography>
              <Switch
                checked={currentLang === 'ar'}
                onChange={toggleLanguage}
                color="primary"
              />
            </Box>

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

            <Button
              onClick={() => navigate('/getStart')}
              sx={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)',
                color: "white",
                fontSize: "12px",
                marginInlineEnd: 2
              }}
            >
              {t("Get Started")}
            </Button>
          </Box>

          {/* User Avatar */}
          <Box sx={{ flexGrow: 0, marginLeft: "20px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (item.href) navigate(`/${item.href}`);
                    if (item.action) item.action();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
