import { ReactElement, useRef } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { useGetSummaryChartDataQuery } from 'store/api/fileApi';
import * as echarts from 'echarts';
import { watermelon } from '../../../../../../theme/colors';
import ContentLoader from 'react-content-loader';

const Shimmer = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={460}
    viewBox="0 0 100% 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="20" rx="5" ry="5" width="70%" height="30" />
    <rect x="20" y="70" rx="5" ry="5" width="95%" height="300" />
    <rect x="20" y="390" rx="5" ry="5" width="45%" height="50" />
    <rect x="50%" y="390" rx="5" ry="5" width="45%" height="50" />
  </ContentLoader>
);

const Student = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);

  const barChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

  // Fetch summary data
  const { data, error, isLoading } = useGetSummaryChartDataQuery(null);

  let totalGraduation = 0;
  let totalDropout = 0;

  if (data) {
    const summaryData = data.summary_data;
    const graduationData = summaryData.find((item: any) => item._id === 'Will Graduate');
    const dropoutData = summaryData.find((item: any) => item._id === 'Dropout');

    totalGraduation = graduationData ? graduationData.total : 0;
    totalDropout = dropoutData ? dropoutData.total : 0;
  }

  const totalStudents = totalGraduation + totalDropout;
  const graduationPercentage = totalStudents ? ((totalGraduation / totalStudents) * 100).toFixed(2) : '0';
  const dropoutPercentage = totalStudents ? ((totalDropout / totalStudents) * 100).toFixed(2) : '0';

  const seriesData = [
    {
      name: 'Graduates',
      type: 'bar',
      data: [totalGraduation],
      itemStyle: {
        color: barChartColors[0],
      },
      barWidth: '50%',
    },
    {
      name: 'Dropouts',
      type: 'bar',
      data: [totalDropout],
      itemStyle: {
        color: watermelon[500],
      },
      barWidth: '50%',
    },
  ];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Graduates', 'Dropouts'],
    },
    xAxis: {
      type: 'category',
      data: ['Total'],
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };

  if (isLoading) return <Shimmer />;
  if (error) return <Typography>Error fetching data</Typography>;

  return (
    <Stack
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        minHeight: 460,
        height: 1,
        mx: 'auto',
      }}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ sm: 'center' }}
        gap={2}
        padding={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Student Graduation Rate
        </Typography>
      </Stack>
      <Box flex={1}>
        <EChartsReactCore
          ref={chartRef}
          echarts={echarts}
          option={option}
          style={{ height: '130%', width: '100%' }}
        />
      </Box>
      <Box padding={1.75} display="flex" justifyContent="space-around">
        <Box textAlign="center">
          <Typography variant="h6" color="text.primary">
            Total Graduates
          </Typography>
          <Typography variant="h4" color={barChartColors[0]}>
            {totalGraduation}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {graduationPercentage}%
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6" color="text.primary">
            Total Dropouts
          </Typography>
          <Typography variant="h4" color={barChartColors[1]}>
            {totalDropout}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {dropoutPercentage}%
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Student;
