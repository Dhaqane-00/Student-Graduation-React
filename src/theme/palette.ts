import { PaletteOptions } from '@mui/material';
import { caribbeanGreen, orange, downy, watermelon, black, smoke,blue, white, cream } from './colors';
import { green, red, yellow } from '@mui/material/colors';

const palette: PaletteOptions = {
  primary: {
    main: blue[700],
  },
  secondary: {
    main: green[600],
  },
  info: {
    main: downy[500],
  },
  success: {
    main: green[500],
  },
  error: {
    main: watermelon[500],
  },
  text: {
    primary: black[500],
    secondary: smoke[500],
    disabled: smoke[200],
  },
  action: {
    focus: smoke[100],
    hover: white[300],
    disabled: smoke[400],
    active: white[50],
  },
  background: {
    default: cream[500],
    paper: white[50],
  },
  divider: white[500],
  warning: {
    main: red[500],
  },
};

export default palette;
