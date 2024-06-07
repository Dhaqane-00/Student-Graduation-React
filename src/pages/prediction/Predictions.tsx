import { ReactElement } from "react"
import { Box, Stack } from '@mui/material';
import FileUpload from "components/sections/dashboard/Home/Sales/Fileupload/FileUpload";
import { drawerWidth } from "layouts/main-layout";
import Table from "components/sections/dashboard/Home/Sales/TablePredict/Table";

function Predictions(): ReactElement {
  return (
    <Box
      component="main"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0 },
        pt: 4.375,
        pr: 1.875,
        pb: 1.875,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        spacing={3.75}
        sx={{
          width: '100%',
          maxWidth: 600, // Adjust as needed to fit your design
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '140%' }}>
          <FileUpload />
        </Box>
        <Box sx={{ width: '140%' }}>
          <Table/>
        </Box>
      </Stack>
    </Box>
  );
}

export default Predictions;

