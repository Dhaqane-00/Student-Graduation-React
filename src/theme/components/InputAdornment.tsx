import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const InputAdornment: Components<Omit<Theme, 'components'>>['MuiInputAdornment'] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ theme }) => ({
      // width: theme.spacing(2.5),
      // height: theme.spacing(2.5),
      color: theme.palette.text.secondary,
      margin: 0,
    }),
  },
};

export default InputAdornment;
