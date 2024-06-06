import { useTheme } from '@mui/material';
import { LineSeriesOption, PieSeriesOption, ComposeOption } from 'echarts';
import { LineChart, PieChart } from 'echarts/charts';
import {} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { useBreakpoints } from 'providers/BreakpointsProvider';

export type EChartOption = ComposeOption<LineSeriesOption | PieSeriesOption>;

echarts.use([LineChart, PieChart, LabelLayout]);

export const useChartData = () => {
  const { up } = useBreakpoints();
  const theme = useTheme();
  const revenueLineChartOptions = (): EChartOption => ({
    title: {
      text: 'Revenue',
      textStyle: {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.h5.fontFamily,
      },
      top: 30,
      left: 30,
    },
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
      left: 65,
      right: 32,
      top: 123,
      bottom: 87,
    },
    legend: {
      show: true,
      top: up('sm') ? 30 : 70,
      right: up('sm') ? 30 : 'auto',
      left: up('sm') ? 'auto' : 30,
      orient: 'horizontal',
      icon: 'pin',
      textStyle: {
        fontFamily: 'Poppins',
        fontSize: '0.75rem',
        fontWeight: 400,
        color: theme.palette.text.secondary,
      },
      itemGap: 20,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      valueFormatter: (value: any) => '$' + value.toFixed(0),
    },
    series: [
      {
        id: 1,
        data: [65, 210, 175, 140, 105, 20, 120, 20],
        type: 'line',
        smooth: true,
        color: theme.palette.secondary.main,
        name: 'Google ads',
        legendHoverLink: true,
        showSymbol: true,
        symbolSize: 12,
        lineStyle: {
          width: 5,
        },
      },
      {
        id: 2,
        data: [20, 125, 100, 30, 150, 300, 90, 180],
        type: 'line',
        smooth: true,
        color: theme.palette.primary.main,
        name: 'Facebook ads',
        legendHoverLink: true,
        showSymbol: false,
        symbolSize: 12,
        lineStyle: {
          width: 5,
        },
      },
    ],
  });

  const visitorsPieChartOptions = (): EChartOption => ({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
      data: [
        { name: 'Direct', icon: 'circle' },
        { name: 'Organic', icon: 'circle' },
        { name: 'Paid', icon: 'circle' },
        { name: 'Social', icon: 'circle' },
      ],
    },
    series: [
      {
        name: 'Website Visitors',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        startAngle: 0,
        itemStyle: {
          borderRadius: 10,
          borderColor: theme.palette.common.white,
          borderWidth: 2,
        },
        color: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
          theme.palette.error.main,
        ],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
            formatter: `{b}`,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 6840, name: 'Direct' },
          { value: 3960, name: 'Organic' },
          { value: 2160, name: 'Paid' },
          { value: 5040, name: 'Social' },
        ],
      },
    ],
  });

  const buyersChartOptions = (): EChartOption => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%',
    },
    legend: {
      show: false,
      data: [
        { name: 'Male', icon: 'circle' },
        { name: 'Female', icon: 'circle' },
        { name: 'Others', icon: 'circle' },
      ],
    },
    series: [
      {
        name: 'Buyers Profile',
        type: 'pie',
        radius: ['65%', '90%'],
        color: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.error.main],
        avoidLabelOverlap: true,
        startAngle: -30,
        clockwise: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
          },
          scaleSize: 0,
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 50, name: 'Male' },
          { value: 35, name: 'Female' },
          { value: 15, name: 'Others' },
        ],
      },
    ],
  });

  return { revenueLineChartOptions, visitorsPieChartOptions, buyersChartOptions };
};
