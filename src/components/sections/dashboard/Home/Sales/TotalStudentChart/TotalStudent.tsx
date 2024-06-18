import { ReactElement, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import WebsiteVisitorsChart from './TotalStudentChart';
import { useGetSummaryChartDataQuery } from 'store/api/fileApi';

const TotalStudent = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [visitorType, setVisitorType] = useState<any>({
    Fulltime: false,
    Parttime: false,
  });

  // Fetch summary chart data
  const { data: summaryData, isLoading } = useGetSummaryChartDataQuery(null);

  // Extract totals from the summary data
  const totalFulltimeGraduated = summaryData?.summary_data?.find((item: { _id: string; }) => item._id === 'Will Graduate')
    ?.genders?.filter((gender: { Mode: string; }) => gender.Mode === 'Fulltime')
    ?.reduce((acc: any, curr: { count: any; }) => acc + curr.count, 0) || 0;

  const totalParttimeGraduated = summaryData?.summary_data?.find((item: { _id: string; }) => item._id === 'Will Graduate')
    ?.genders?.filter((gender: { Mode: string; }) => gender.Mode === 'Parttime')
    ?.reduce((acc: any, curr: { count: any; }) => acc + curr.count, 0) || 0;

  const totalFulltimeDropout = summaryData?.summary_data?.find((item: { _id: string; }) => item._id === 'Dropout')
    ?.genders?.filter((gender: { Mode: string; }) => gender.Mode === 'Fulltime')
    ?.reduce((acc: any, curr: { count: any; }) => acc + curr.count, 0) || 0;

  const totalParttimeDropout = summaryData?.summary_data?.find((item: { _id: string; }) => item._id === 'Dropout')
    ?.genders?.filter((gender: { Mode: string; }) => gender.Mode === 'Parttime')
    ?.reduce((acc: any, curr: { count: any; }) => acc + curr.count, 0) || 0;

  // Create seriesData for the pie chart
  const seriesData = [
    { value: totalFulltimeGraduated, name: 'Fulltime Graduated' },
    { value: totalParttimeGraduated, name: 'Parttime Graduated' },
    { value: totalFulltimeDropout, name: 'Fulltime Dropout' },
    { value: totalParttimeDropout, name: 'Parttime Dropout' },
  ];

  const legendData = [
    { name: 'Fulltime Graduated', icon: 'circle' },
    { name: 'Parttime Graduated', icon: 'circle' },
    { name: 'Fulltime Dropout', icon: 'circle' },
    { name: 'Parttime Dropout', icon: 'circle' },
  ];

  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ];

  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  const toggleClicked = (name: string) => {
    setVisitorType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const totalVisitors = useMemo(
    () => seriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [seriesData]
  );

  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 'min-content',
      }}
    >
      <Typography variant="subtitle1" color="text.primary" p={2.5}>
        Total Students
      </Typography>
      <WebsiteVisitorsChart
        chartRef={chartRef}
        seriesData={seriesData}
        colors={pieChartColors}
        legendData={legendData}
        sx={{ maxWidth: 222, maxHeight: 222, mx: 'auto' }}
      />
      <Stack spacing={1} divider={<Divider />} sx={{ p: 2.5 }}>
        {Array.isArray(seriesData) &&
          seriesData.map((dataItem, index) => (
            <Button
              key={dataItem.name}
              variant="text"
              fullWidth
              onClick={() => {
                toggleClicked(dataItem.name as string);
                onChartLegendSelectChanged(dataItem.name as string);
              }}
              sx={{
                justifyContent: 'flex-start',
                padding: 0,
                px: 1,
                borderRadius: 1,
                bgcolor: visitorType[`${dataItem.name}`] ? 'action.focus' : 'background.paper',
                ':hover': {
                  bgcolor: 'action.active',
                },
              }}
              disableRipple
            >
              <Stack direction="row" alignItems="center" gap={1} width={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: visitorType[`${dataItem.name}`]
                      ? 'action.disabled'
                      : pieChartColors[index],
                    borderRadius: 400,
                  }}
                ></Box>
                <Typography variant="body1" color="text.secondary" flex={1} textAlign={'left'}>
                  {dataItem.name}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {((parseInt(`${dataItem.value}`) / totalVisitors) * 100).toFixed(0)}%
                </Typography>
              </Stack>
            </Button>
          ))}
      </Stack>
    </Box>
  );
};

export default TotalStudent;
