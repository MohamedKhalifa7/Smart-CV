  import * as React from 'react';
  import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,Avatar, Button, Tooltip, MenuItem, Link} from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import DescriptionIcon from '@mui/icons-material/Description';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';



  function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

       // Logout Handler
       const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3001/auth/logout',{},{withCredentials:true}); 
          navigate('/login');
        } catch (error) {
          console.error('Logout failed', error);  
        }
      };

    const pages = [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/Blogs" },
      { label: "Tips", href: "/Tips" }
    ];
    
    const userMenuItems = [
      { label: "Profile",href:"profile"},
      { label: "Settings",href:"settings"},
      { label: "Logout",action: () => {handleLogout()}},
    ]

 

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
      <AppBar position="static" sx={{backgroundColor: "#f5f5f5"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'black', textDecoration: 'none' }}
            >
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              Smart-CV
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} sx={{color:"black"}}>
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
                {/*Mobile Navbar */}
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Link href={page.href} underline="none" color="black">
                      {page.label}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button fullWidth sx={{ mt: 1, background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: 'white' }}>
                    Get Started
                  </Button>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <DescriptionIcon sx={{ color: "#7d25d2", mr: 1 }} />
              Smart-CV
            </Typography>

            {/*Desktop Navbar */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: "40px", justifyContent: "end", alignItems: "center" }}>
              {pages.map((page) => (
                <Link key={page.label} href={page.href} sx={{ color: "black", textDecoration: "none" }}>
                  {page.label}
                </Link>
              ))}
                <Link href="/getStart">
              <Button sx={{ background: 'linear-gradient(135deg, #5a0db5 0%, #7d25d2 100%)', color: "white", fontSize: "12px" }}>
              Get Started
              </Button>
                </Link>
            </Box>
            {/*User Avatar*/}
            <Box sx={{ flexGrow: 0,marginLeft:"20px" }}>
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
                  <MenuItem key={item.label} onClick={() => {
                    handleCloseUserMenu();
                    item.action?.();
                  }}>
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
