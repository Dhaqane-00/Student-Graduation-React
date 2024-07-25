import { MouseEventHandler, ReactElement } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { drawerWidth } from 'layouts/main-layout';

import { useLocation } from 'react-router-dom';
import capitalizePathname from 'helpers/capitalize-pathname';
import AccountDropdown from './AccountDropdown';
import { theme } from 'theme/theme';
import {black} from '../../../theme/colors';

// import LanguageDropdown from './LanguageDropdown';

interface TopbarProps {
  handleDrawerToggle: MouseEventHandler;
}

const Topbar = ({ handleDrawerToggle }: TopbarProps): ReactElement => {
  let { pathname } = useLocation();
  const title = capitalizePathname(pathname);

  return (
    <AppBar
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px + 1px)` },
        ml: { lg: `${drawerWidth}px` },
        boxShadow:theme.shadows[3]
        
      }}
    >
      <Toolbar
        sx={{
          p: 1.5,
        }}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, ml: 0, display: { lg: 'none' }, bgcolor: 'inherit', color: black[900]  }}
        >
          <IconifyIcon icon="mdi:menu" />
        </IconButton>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            gap: { sm: 3.125, md: 6.25 },
            alignItems: 'center',
            flex: '1 1 auto',
          }}
        >
          <Typography variant="h5" component="h5">
            {pathname === '/home' ? 'Dashboard' : title}
          </Typography>
          {/* <Typography variant="h5" component="h5">
            {pathname === '/SinglePrediction' ? 'Single Pediction' : title}
          </Typography> */}
          {/* <TextField
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                  <IconifyIcon icon="mdi:search" width={1} height={1} />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ maxWidth: 330 }}
          /> */}
        </Box>
        {/* <IconButton
          color="inherit"
          sx={{ display: { xs: 'flex', lg: 'none' }, mr: 'auto', bgcolor: 'inherit' }}
        >
          <IconifyIcon icon="mdi:search" width={24} height={24} />
        </IconButton> */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          {/* <LanguageDropdown /> */}
          {/* <IconButton color="inherit" centerRipple sx={{ bgcolor: 'inherit' }}>
            <Badge badgeContent={1} color="primary">
              <IconifyIcon icon="carbon:notification-filled" width={24} height={24} />
            </Badge>
          </IconButton> */}
          <AccountDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
