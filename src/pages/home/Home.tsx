import Grid from '@mui/material/Unstable_Grid2';
import { ReactElement } from 'react';

import TotalStudent from 'components/sections/dashboard/Home/Sales/TotalStudentChart/TotalStudent';
import Department from 'components/sections/dashboard/Home/Sales/DepartmentChart/Department';
import Student from 'components/sections/dashboard/Home/Sales/StudentChart/Student';

import { drawerWidth } from 'layouts/main-layout';
import ModeStudent from 'components/sections/dashboard/Home/Sales/ModeStudentChart/ModeStudent';

const Home = (): ReactElement => {
  return (
    <Grid
      container
      component="main"
      columns={12}
      spacing={3.75}
      flexGrow={1}
      pt={4.375}
      pr={1.875}
      pb={1.875}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0 },
      }}
    >
      <Grid xs={12} md={8}>
        <Student />
      </Grid>
      <Grid xs={12} md={4}>
        <TotalStudent />
      </Grid>
      <Grid xs={12} md={4} lg={12}>
        <ModeStudent />
      </Grid>
      <Grid xs={12} md={4} lg={12}>
        <Department />
      </Grid>
    </Grid>
  );
};

export default Home;
