import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { ReactElement, useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import BuyersProfileChart from './DepartmentChart';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import { useGetDepartmentDataQuery } from 'store/api/fileApi'; // Adjust the path as per your project structure
import ContentLoader from 'react-content-loader';

const Department = (): ReactElement => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [buyerGenderType, setBuyerGenderType] = useState<any>({
    Male: false,
    Female: false,
    Others: false,
  });

  const toggleClicked = (name: string) => {
    setBuyerGenderType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget); // Fix: use currentTarget instead of target
  };



  // Fetch department data using custom hook
  const { data, error, isLoading } = useGetDepartmentDataQuery(null);

  const Shimmer = () => (
    <ContentLoader
      speed={2}
      width={isSmallScreen ? 350 : 1250}
      height={isSmallScreen ? 350 : 500}
      viewBox={`0 0 ${isSmallScreen ? 350 : 1250} ${isSmallScreen ? 350 : 500}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="20" rx="5" ry="5" width={isSmallScreen ? 300 : 1200} height="30" />
      <rect x="20" y="70" rx="5" ry="5" width="200" height="30" />
      <rect x="240" y="70" rx="5" ry="5" width="200" height="30" />
      <rect x="460" y="70" rx="5" ry="5" width="200" height="30" />
      <rect x="20" y="120" rx="5" ry="5" width={isSmallScreen ? 300 : 1200} height="300" />
    </ContentLoader>
  );

  if (isLoading) return <Shimmer />;
  if (error) return <Typography>Error fetching data</Typography>;

  // Process department data to display
  const departments = data?.department_summary || [];

  // Prepare data for chart
  const seriesData: PieDataItemOption[] = departments.map((dept: { total: any; _id: any; }) => ({
    value: dept.total,
    name: dept._id,
  }));

  // Generate a list of colors for the pie chart
  const colorPalette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.grey[500],
    '#8E44AD',
    '#2980B9',
    '#1ABC9C',
    '#27AE60',
    '#F39C12',
    '#D35400',
    '#C0392B',
  ];

  const pieChartColors = departments.map((_dept: any, index: number) => colorPalette[index % colorPalette.length]);

  // Function to get prediction count for a department
  const getPredictionCount = (department: any, prediction: string) => {
    const predictionData = department.predictions.find(
      (pred: any) => pred.Prediction === prediction
    );
    return predictionData ? predictionData.count : 0;
  };

  // Prepare legend data and colors for the chart
  const legendData = departments.map((dept: { _id: any; }, index: string | number) => {
    return ({
      name: dept._id,
      icon: 'circle',
      textStyle: {
        color: pieChartColors[index],
      },
    });
  });

  // Function to handle legend selection change
  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  return (
    <Stack
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 1,
        width: '100%',
        maxWidth: 1250,
        flex: '1 1 auto',
        overflow: 'auto',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" padding={2.5}>
        <Typography variant="subtitle1" color="text.primary">
          Department Students
        </Typography>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            bgcolor: open ? 'action.active' : 'transparent',
            padding: 1,
            width: 36,
            height: 36,
            ':hover': {
              bgcolor: 'action.active',
            },
          }}
        >
          <IconifyIcon icon="ph:dots-three-outline-fill" color="text.secondary" />
        </IconButton>
      </Stack>
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        alignItems={isSmallScreen ? 'flex-start' : 'center'}
        justifyContent="space-between"
        flex={1}
        gap={2}
        padding={(theme) => theme.spacing(0, 2.5, 2.5)}
      >
        <BuyersProfileChart
          chartRef={chartRef}
          seriesData={seriesData}
          legendData={legendData}
          colors={pieChartColors}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flex: '1 1 0%',
            width: isSmallScreen ? '100%' : 600,
            maxHeight: 500,
          }}
        />
        <Stack
          spacing={2}
          sx={{
            width: isSmallScreen ? '100%' : 'auto',
            flex: 1,
          }}
        >
          {departments.map((dept: any, index: string | number) => (
            <Button
              key={dept._id}
              variant="text"
              fullWidth
              onClick={() => {
                toggleClicked(dept._id);
                onChartLegendSelectChanged(dept._id);
              }}
              sx={{
                justifyContent: 'flex-start',
                padding: 0,
                pr: 1,
                borderRadius: 1,
                bgcolor: buyerGenderType[dept._id] ? 'action.focus' : 'background.paper',
                ':hover': {
                  bgcolor: 'action.active',
                },
              }}
              disableRipple
            >
              <Stack direction="row" alignItems="center" gap={1} width={1}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: buyerGenderType[dept._id]
                      ? 'action.disabled'
                      : pieChartColors[index],
                    borderRadius: 400,
                  }}
                />
                <Typography variant="body1" color="text.secondary" textAlign="left" flex={1}>
                  {dept._id}

                </Typography>
                <Divider ></Divider>
                <Typography variant="body1" color="text.primary">
                  Will Graduate: {getPredictionCount(dept, 'Will Graduate')}
                </Typography>
                <Divider ></Divider>
                <Typography variant="body1" color="text.primary">
                  Dropout: {getPredictionCount(dept, 'Dropout')}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Department;
