import { ReactElement, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import WebsiteVisitorsChart from './WebsiteVisitorsChart';

const WebsiteVisitors = (): ReactElement => {
  const theme = useTheme();

  const seriesData: PieDataItemOption[] = [
    { value: 6840, name: 'Direct' },
    { value: 3960, name: 'Organic' },
    { value: 2160, name: 'Paid' },
    { value: 5040, name: 'Social' },
  ];

  const legendData = [
    { name: 'Direct', icon: 'circle' },
    { name: 'Organic', icon: 'circle' },
    { name: 'Paid', icon: 'circle' },
    { name: 'Social', icon: 'circle' },
  ];

  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ];

  const chartRef = useRef<EChartsReactCore | null>(null);
  const onChartLegendSelectChanged = (name: string) => {
    console.log(chartRef.current?.getEchartsInstance().getOption());
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      console.log(instance.getOption());
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };
  const [visitorType, setVisitorType] = useState<any>({
    Direct: false,
    Organic: false,
    Paid: false,
    Social: false,
  });

  const toggleClicked = (name: string) => {
    setVisitorType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const totalVisitors = useMemo(
    () => seriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [],
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
        Website Visitors
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

export default WebsiteVisitors;
