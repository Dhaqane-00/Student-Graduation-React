import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const Switch: Components<Omit<Theme, 'components'>>['MuiSwitch'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      width: theme.spacing(3.5),
      height: theme.spacing(2),
      margin: theme.spacing(0, 1),
      padding: 0,
      display: 'flex',
      ':active': {
        '& .MuiSwitch-thumb': {
          width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: theme.palette.common.white,
          transform: `translateX(9px)`,
        },
      },
    }),
    track: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 1,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
      boxSizing: 'border-box',
    }),
    thumb: ({ theme }) => ({
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: theme.shape.borderRadius * 0.75,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
      backgroundColor: 'currentcolor',
    }),
    switchBase: ({ theme }) => ({
      padding: 2,
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
      '&.Mui-Checked': {
        transform: `translateX(12px)`,
        color: theme.palette.common.white,
        ':hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      ':checked': {
        transform: `translateX(12px)`,
        color: theme.palette.common.white,
        ':hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    }),
    checked: ({ theme }) => ({
      transform: `translateX(12px)`,
      color: theme.palette.common.white,
      ':hover': {
        backgroundColor: theme.palette.primary.main,
      },
    }),
  },
};

export default Switch;
