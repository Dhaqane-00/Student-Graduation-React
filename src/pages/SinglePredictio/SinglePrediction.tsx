import React, { ReactElement } from "react";
import { Box, Stack, Typography } from '@mui/material';
import { drawerWidth } from "layouts/main-layout";
import PredictSingle from "components/sections/dashboard/Home/Sales/PredictSingle/PredictSingle";

function SinglePrediction(): ReactElement {
  return (
    <Box
      component="main"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 40 },
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
          width: '940%',
          maxWidth: 800,
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            borderRadius: 10,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            p: 3.75,
            backgroundColor: '#FFFFFF',
            width: '100%',
          }}
        >
          <PredictSingle />
        </Box>
      </Stack>
    </Box>
  );
}

export default SinglePrediction;
