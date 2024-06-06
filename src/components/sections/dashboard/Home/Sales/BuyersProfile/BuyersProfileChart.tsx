import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import { EChartOption } from 'data/chart-data';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import { useMemo } from 'react';

type BuyersProfileChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: PieDataItemOption[];
  legendData?: any;
  colors?: string[];
  sx?: SxProps;
};

const BuyersProfileChart = ({
  chartRef,
  seriesData,
  legendData,
  colors,
  ...rest
}: BuyersProfileChartProps) => {
  const theme = useTheme();
  const chartOption = useMemo(() => {
    const option: EChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      legend: {
        show: false,
        data: legendData,
      },
      series: [
        {
          name: 'Buyers Profile',
          type: 'pie',
          radius: ['65%', '90%'],
          color: colors,
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
          data: seriesData,
        },
      ],
    };
    return option;
  }, [theme]);

  return <ReactEchart ref={chartRef} option={chartOption} echarts={echarts} {...rest} />;
};

export default BuyersProfileChart;
