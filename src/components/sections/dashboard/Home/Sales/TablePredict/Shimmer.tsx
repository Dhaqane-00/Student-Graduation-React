// components/Shimmer.tsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';

const Shimmer: React.FC = () => (
  <Box sx={{ p: 4, width: '250%', height: '200%' }}>
    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
    <Skeleton variant="rectangular"  height={400} sx={{ mt: 2 }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 1 }} />
  </Box>
);

export default Shimmer;
