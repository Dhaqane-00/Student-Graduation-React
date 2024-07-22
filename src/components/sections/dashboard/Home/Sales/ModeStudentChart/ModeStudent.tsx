import { ReactElement, useRef } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { useGetShollershipChartDataQuery } from 'store/api/fileApi';
import * as echarts from 'echarts';
import ContentLoader from 'react-content-loader';

const Shimmer = () => (
  <ContentLoader
    speed={2}
    width={1250}
    height={500}
    viewBox="0 0 1250 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="20" rx="5" ry="5" width="400" height="30" />
    <rect x="20" y="70" rx="5" ry="5" width="1200" height="400" />
  </ContentLoader>
);

const ModeStudent = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);

  const pieChartColors = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.secondary.light,
    theme.palette.primary.light,
  ];

  // Fetch scholarship summary data
  const { data, error, isLoading } = useGetShollershipChartDataQuery(null);
  console.log(data);

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


  const seriesData = [
    {
      name: 'Graduates with Scholarship',
      value: withScholarshipGraduation,
      itemStyle: {
        color: pieChartColors[0],
      },
    },
    {
      name: 'Dropouts with Scholarship',
      value: withScholarshipDropout,
      itemStyle: {
        color: pieChartColors[1],
      },
    },
    {
      name: 'Graduates without Scholarship',
      value: withoutScholarshipGraduation,
      itemStyle: {
        color: pieChartColors[2],
      },
    },
    {
      name: 'Dropouts without Scholarship',
      value: withoutScholarshipDropout,
      itemStyle: {
        color: pieChartColors[3],
      },
    },
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: 'Students',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
        },
      },
    ],
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
          Scholarship Graduates and Dropouts
        </Typography>
      </Stack>
      <Box flex={1}>
        <EChartsReactCore
          ref={chartRef}
          echarts={echarts}
          option={option}
          style={{ height: '110%', width: '100%' }}
        />
      </Box>
    </Stack>
  );
};

export default ModeStudent;
