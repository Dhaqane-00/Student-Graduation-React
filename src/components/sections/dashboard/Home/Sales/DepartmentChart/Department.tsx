import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { ReactElement, useRef, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import BuyersProfileChart from './DepartmentChart';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import { useGetDepartmentDataQuery } from 'store/api/fileApi'; // Adjust the path as per your project structure

const Department = (): ReactElement => {
  const theme = useTheme();
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch department data using custom hook
  const { data, error, isLoading } = useGetDepartmentDataQuery(null);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data: {}</Typography>;

  // Process department data to display
  const departments = data?.department_summary || [];

  // Prepare data for chart
  const seriesData: PieDataItemOption[] = departments.map((dept: { total: any; _id: any; }) => ({
    value: dept.total,
    name: dept._id,
  }));

  // Function to get prediction count for a department
  const getPredictionCount = (department: any, prediction: string) => {
    const predictionData = department.predictions.find(
      (pred: any) => pred.Prediction === prediction
    );
    return predictionData ? predictionData.count : 0;
  };

  // Prepare legend data and colors for the chart
  const legendData = [
    { name: 'Will Graduate', icon: 'circle' },
    { name: 'Dropout', icon: 'circle' },
  ];
  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    
  ];

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
        width:1250,
        flex: '1 1 auto',
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" component="p">
              Edit
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" component="p" color="error.main">
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </Stack>
      <Stack
        direction={{ xs: 'row', sm: 'column', md: 'row' }}
        alignItems="center"
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
            width: 177,
            maxHeight: 500,
          }}
        />
        <Stack
          spacing={2}
          sx={{
            width: { xs: 0.5, sm: 'auto', md: 'auto', lg: 'auto' },
            flex: 1,
          }}
        >
          {departments.map((dept: any) => (
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
                      : pieChartColors[0], // Assuming using the color for "Will Graduate"
                    borderRadius: 400,
                  }}
                />
                <Typography variant="body1" color="text.secondary" textAlign="left" flex={1}>
                  {dept._id}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Will Graduate: {getPredictionCount(dept, 'Will Graduate')}
                </Typography>
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
