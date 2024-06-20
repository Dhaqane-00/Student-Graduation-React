import { ReactElement, useRef } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { useGetShollershipChartDataQuery } from 'store/api/fileApi';
import * as echarts from 'echarts';

const ModeStudent = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);

  const barChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

  // Fetch scholarship summary data
  const { data, error, isLoading } = useGetShollershipChartDataQuery(null);

  let withScholarshipGraduation = 0;
  let withScholarshipDropout = 0;
  let withoutScholarshipGraduation = 0;
  let withoutScholarshipDropout = 0;

  if (data) {
    const withScholarshipData = data.with_scholarship_summary;
    const withoutScholarshipData = data.without_scholarship_summary;

    const withGraduationData = withScholarshipData.find((item: any) => item._id === 'Will Graduate');
    const withDropoutData = withScholarshipData.find((item: any) => item._id === 'Dropout');
    const withoutGraduationData = withoutScholarshipData.find((item: any) => item._id === 'Will Graduate');
    const withoutDropoutData = withoutScholarshipData.find((item: any) => item._id === 'Dropout');

    withScholarshipGraduation = withGraduationData ? withGraduationData.count : 0;
    withScholarshipDropout = withDropoutData ? withDropoutData.count : 0;
    withoutScholarshipGraduation = withoutGraduationData ? withoutGraduationData.count : 0;
    withoutScholarshipDropout = withoutDropoutData ? withoutDropoutData.count : 0;
  }

  const totalWithScholarship = withScholarshipGraduation + withScholarshipDropout;
  const totalWithoutScholarship = withoutScholarshipGraduation + withoutScholarshipDropout;

  const withGraduationPercentage = totalWithScholarship ? ((withScholarshipGraduation / totalWithScholarship) * 100).toFixed(2) : '0';
  const withDropoutPercentage = totalWithScholarship ? ((withScholarshipDropout / totalWithScholarship) * 100).toFixed(2) : '0';
  const withoutGraduationPercentage = totalWithoutScholarship ? ((withoutScholarshipGraduation / totalWithoutScholarship) * 100).toFixed(2) : '0';
  const withoutDropoutPercentage = totalWithoutScholarship ? ((withoutScholarshipDropout / totalWithoutScholarship) * 100).toFixed(2) : '0';

  const hasWithoutScholarshipData = withoutScholarshipGraduation > 0 || withoutScholarshipDropout > 0;

  const seriesData = [
    {
      name: 'Graduates with Scholarship',
      type: 'bar',
      data: [withScholarshipGraduation],
      itemStyle: {
        color: barChartColors[0],
      },
      barWidth: '30%',
    },
    {
      name: 'Dropouts with Scholarship',
      type: 'bar',
      data: [withScholarshipDropout],
      itemStyle: {
        color: barChartColors[1],
      },
      barWidth: '30%',
    },
    ...(hasWithoutScholarshipData ? [
      {
        name: 'Graduates without Scholarship',
        type: 'bar',
        data: [withoutScholarshipGraduation],
        itemStyle: {
          color: barChartColors[0],
        },
        barWidth: '30%',
      },
      {
        name: 'Dropouts without Scholarship',
        type: 'bar',
        data: [withoutScholarshipDropout],
        itemStyle: {
          color: barChartColors[1],
        },
        barWidth: '30%',
      }
    ] : [])
  ];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: hasWithoutScholarshipData 
        ? ['Graduates with Scholarship', 'Dropouts with Scholarship', 'Graduates without Scholarship', 'Dropouts without Scholarship']
        : ['Graduates with Scholarship', 'Dropouts with Scholarship'],
    },
    xAxis: {
      type: 'category',
      data: ['With Scholarship', ...(hasWithoutScholarshipData ? ['Without Scholarship'] : [])],
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };

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
          Scholarship Graduates and Dropouts
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
            Graduates with Scholarship
          </Typography>
          <Typography variant="h4" color={barChartColors[0]}>
            {withScholarshipGraduation}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {withGraduationPercentage}%
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6" color="text.primary">
            Dropouts with Scholarship
          </Typography>
          <Typography variant="h4" color={barChartColors[1]}>
            {withScholarshipDropout}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {withDropoutPercentage}%
          </Typography>
        </Box>
        {hasWithoutScholarshipData && (
          <>
            <Box textAlign="center">
              <Typography variant="h6" color="text.primary">
                Graduates without Scholarship
              </Typography>
              <Typography variant="h4" color={barChartColors[0]}>
                {withoutScholarshipGraduation}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {withoutGraduationPercentage}%
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" color="text.primary">
                Dropouts without Scholarship
              </Typography>
              <Typography variant="h4" color={barChartColors[1]}>
                {withoutScholarshipDropout}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {withoutDropoutPercentage}%
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default ModeStudent;
