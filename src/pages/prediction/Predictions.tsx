import { ReactElement } from "react";
import { Grid, Stack, useMediaQuery, useTheme, Box } from '@mui/material';
import FileUpload from "components/sections/dashboard/Home/Sales/Fileupload/FileUpload";
import { drawerWidth } from "layouts/main-layout";
import Table from "components/sections/dashboard/Home/Sales/TablePredict/Table";

function Predictions(): ReactElement {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid
      container
      component="main"
      spacing={4.75}
      gap={2}
      flexGrow={2}
      pt={isSmallScreen ? 5 : isMediumScreen ? 10 : 15.375}
      pr={isSmallScreen ? 1 : isMediumScreen ? 1.5 : 1.875}
      pb={isSmallScreen ? 1 : isMediumScreen ? 1.5 : 1.875}
      pl={isSmallScreen ? 1 : isMediumScreen ? 2 : { xs: 3, lg: 10 }}
      sx={{
        width: isLargeScreen ? `calc(100% - ${drawerWidth}px)` : '100%',
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={10}>
        <FileUpload />
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Box
          sx={{
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch', // for smooth scrolling on iOS
            scrollbarWidth: 'thin', // for Firefox
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#90caf9',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#42a5f5',
            },
          }}
        >
          <Table />
        </Box>
      </Grid>
      {isSmallScreen && (
        <Grid item xs={12}>
          <Stack
            direction='column'
            gap={3.75}
            height={1}
            width={1}
          >
            {/* Add any additional content specific for small screens */}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default Predictions;
