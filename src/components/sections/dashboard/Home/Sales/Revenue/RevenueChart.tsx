import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import { EChartOption } from 'data/chart-data';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineSeriesOption } from 'echarts';
// import { useMemo } from 'react';

type RevenueChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: LineSeriesOption[];
  legendData?: any;
  colors?: string[];
  sx?: SxProps;
};

const RevenueChart = ({ chartRef, seriesData, legendData, colors, ...rest }: RevenueChartProps) => {
  const theme = useTheme();

  // const chartOption = useMemo(() => {
  //   return option;
  // }, [theme]);
  const option: EChartOption = {
    // title: {
    //   text: 'Revenue',
    //   textStyle: {
    //     fontSize: theme.typography.h5.fontSize,
    //     fontWeight: theme.typography.h5.fontWeight,
    //     color: theme.palette.text.primary,
    //     fontFamily: theme.typography.h5.fontFamily,
    //   },
    //   top: 30,
    //   left: 30,
    // },
    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: theme.palette.divider,
          width: 1,
          type: 'dashed',
        },
      },
      axisLabel: {
        show: true,
        padding: 30,
        color: theme.palette.text.secondary,
        formatter: (value: any) => value.slice(0, 3),
        fontFamily: theme.typography.body1.fontFamily,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      max: 400,
      splitNumber: 4,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: theme.palette.text.secondary,
        align: 'center',
        padding: [0, 20, 0, 0],
        fontFamily: theme.typography.body1.fontFamily,
      },
      splitLine: {
        interval: 5,
        lineStyle: {
          color: theme.palette.divider,
          width: 1,
          type: 'dashed',
        },
      },
    },
    grid: {
      left: 60,
      right: 30,
      top: 30,
      bottom: 90,
    },
    legend: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      valueFormatter: (value: any) => '$' + value.toFixed(0),
    },
    series: seriesData,
  };

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default RevenueChart;
