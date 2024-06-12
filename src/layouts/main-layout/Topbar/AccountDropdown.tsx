import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from 'assets/profile/profile.jpg';

const AccountDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};
  console.log(user);
  const { name, image } = user;
  

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate('/Profile');
    setAnchorEl(null);
  
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/'); // Redirect to the home page
  };

  return (
    <>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          gap: 1.875,
        }}
      >
        <Avatar alt={name} src={image || profile} sx={{ width: 45, height: 45 }} />
        <Typography variant="body1" component="p" color="text.primary">
          {name || 'User'}
        </Typography>
        <IconifyIcon icon="ion:caret-down-outline" width={24} height={24} color="text.primary" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="ion:home-sharp" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <IconifyIcon icon="mdi:account-outline" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:settings" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          disableRipple
          disableTouchRipple
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ri:logout-circle-line" color="error.main" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
