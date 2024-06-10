import { ReactElement } from 'react';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { caribbeanGreen, orange, downy, watermelon, black, smoke,blue, white, cream } from '../../../theme/colors';

import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/Just_logo.png';
import Image from 'components/base/Image';
import navItems from 'data/nav-items';
import pxToRem from 'theme/functions/px-to-rem';
import NavButton from './NavButton';

const Sidebar = (): ReactElement => {
  return (
    <Stack
      justifyContent="space-between"
      bgcolor="background.paper"
      height={1}
      boxShadow={(theme) => theme.shadows[3]}
      sx={{
        overflowY: 'overlay',
        margin: 3.75,
        borderRadius: 5,
        
      }}
    >
      <Link
        href="home"
        sx={{
          // position: 'fixed',
          zIndex: 5,
          pt: 5,
          px: pxToRem(10),
          // pb: 3.75,
          bgcolor: 'background.paper',
          borderRadius: 5,
        }}
      >
        <Image src={logo} width={1} />
      </Link>
      <Stack
        justifyContent="space-between"
        mt={5}
        height={1}
        sx={{
          overflowY: 'auto',
        }}
      >
        <List
          sx={{
            mx: 2.5,
            py: 1.25,
            flex: '1 1 auto',
          }}
        >
          {navItems.map((navItem, index) => (
            <NavButton key={index} navItem={navItem} Link={Link} />
          ))}
        </List>
        <List
          sx={{
            mx: 2.5,
          }}
        >
          <ListItem
            sx={{
              mx: 0,
              my: 2.5,
            }}
          >
            <ListItemButton
              LinkComponent={Link}
              href="/"
              sx={{
                backgroundColor: 'background.paper',
                color: watermelon[500],
                ':hover': {
                  // backgroundColor: watermelon[500],
                  color: watermelon[700],
                  opacity: 1.5,
                },
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon="ri:logout-circle-line" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
