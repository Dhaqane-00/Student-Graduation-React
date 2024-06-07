import { ReactElement } from "react"
import { Grid, Stack, useMediaQuery } from '@mui/material';
import FileUpload from "components/sections/dashboard/Home/Sales/Fileupload/FileUpload";
import { drawerWidth } from "layouts/main-layout";
import Table from "components/sections/dashboard/Home/Sales/TablePredict/Table";

function Predictions(): ReactElement {
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Adjust breakpoint according to your needs

  return (
    <Grid
      container
      component="main"
      columns={{ xs: 1, md: 2, lg: 3 }}
      spacing={4.75}
      gap={3.75}
      flexGrow={2}
      pt={15.375}
      pr={1.875}
      pb={1.875}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3, lg: 10 },
      }}
    >
      <Grid item xs={12} md={12} lg={2}>
        <FileUpload />
      </Grid>
      <Grid item xs={12} md={12} lg={2}>
        <Table />
      </Grid>
      {isSmallScreen && (
        <Grid item xs={12} md={12} lg={2}>
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
