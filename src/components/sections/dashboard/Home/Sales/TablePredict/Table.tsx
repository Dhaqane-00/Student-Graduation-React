import React, { ChangeEvent, ReactElement, useMemo, useState, useEffect } from 'react';
import {
  Divider,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  debounce,
  IconButton,
  Box,
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlotsComponent, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import { useGetResultsQuery } from 'store/api/fileApi';
import CustomPagination from './CustomPagination';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { theme } from 'theme/theme';
import * as XLSX from 'xlsx';

interface RowData {
  id: string;
  department: string;
  gpaS1: number;
  gpaS2: number;
  gpaS3: number;
  gpaS4: number;
  gpaS5: number;
  gpaS6: number;
  gpaS7: number;
  gpaS8: number;
  gender: string;
  mode: string;
  attS1: number;
  attS2: number;
  attS3: number;
  attS4: number;
  attS5: number;
  attS6: number;
  attS7: number;
  attS8: number;
  discounts: number;
  noReExams: number;
  prediction: string;
}

const columns: GridColDef[] = [
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 250 },
  { field: 'gender', headerName: 'Gender', flex: 0.5, minWidth: 90 },
  { field: 'mode', headerName: 'Mode', flex: 0.5, minWidth: 90 },
  { field: 'attS1', headerName: 'Attendance S1', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS2', headerName: 'Attendance S2', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS3', headerName: 'Attendance S3', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS4', headerName: 'Attendance S4', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS5', headerName: 'Attendance S5', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS6', headerName: 'Attendance S6', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS7', headerName: 'Attendance S7', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'attS8', headerName: 'Attendance S8', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'totalAttendance', headerName: 'Total Attendance', flex: 0.5, minWidth: 150 },
  { field: 'discounts', headerName: 'Discounts', type: 'number', flex: 0.5, minWidth: 90 },
  { field: 'noReExams', headerName: 'No. of Re-exams', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'gpaS1', headerName: 'GPA S1', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS2', headerName: 'GPA S2', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS3', headerName: 'GPA S3', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS4', headerName: 'GPA S4', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS5', headerName: 'GPA S5', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS6', headerName: 'GPA S6', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS7', headerName: 'GPA S7', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'gpaS8', headerName: 'GPA S8', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'totalCGpa', headerName: 'CGPA', flex: 0.5, minWidth: 80 },
  { field: 'prediction', headerName: 'Prediction', flex: 0.75, minWidth: 150 },
];

const convertPercentageToGPA = (percentage) => {
  if (percentage >= 95) return 4.0;
  if (percentage >= 90) return 3.7;
  if (percentage >= 85) return 3.3;
  if (percentage >= 80) return 3.0;
  if (percentage >= 75) return 2.7;
  if (percentage >= 70) return 2.3;
  if (percentage >= 65) return 2.0;
  if (percentage >= 60) return 1.7;
  if (percentage >= 55) return 1.3;
  if (percentage >= 50) return 1.0;
  return 0.0;
};

const Table = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);
  const { data, isLoading, error, refetch } = useGetResultsQuery({}, { refetchOnMountOrArgChange: true });
  const { down } = useBreakpoints();
  const belowSmallScreen = down('sm');

  const calculateAverage = (values: number[]) => {
    const validValues = values.filter(value => !isNaN(value));
    return validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(2) : '0';
  };
  const rows = useMemo(() => {
    if (!data) return [];
    return data.results.map((item: any) => {
      const totalCGpaPercentage = calculateAverage([
        item['GPA-S1'], item['GPA-S2'], item['GPA-S3'], item['GPA-S4'], item['GPA-S5'],
        item['GPA-S6'], item['GPA-S7'], item['GPA-S8']
      ]);

      return {
        id: item._id,
        department: item.Department,
        gender: item.Sex,
        mode: item.Mode,
        attS1: item['Att-S1'],
        attS2: item['Att-S2'],
        attS3: item['Att-S3'],
        attS4: item['Att-S4'],
        attS5: item['Att-S5'],
        attS6: item['Att-S6'],
        attS7: item['Att-S7'],
        attS8: item['Att-S8'],
        totalAttendance: calculateAverage([
          item['Att-S1'], item['Att-S2'], item['Att-S3'], item['Att-S4'], item['Att-S5'],
          item['Att-S6'], item['Att-S7'], item['Att-S8']
        ]),

        gpaS1: item['GPA-S1'],
        gpaS2: item['GPA-S2'],
        gpaS3: item['GPA-S3'],
        gpaS4: item['GPA-S4'],
        gpaS5: item['GPA-S5'],
        gpaS6: item['GPA-S6'],
        gpaS7: item['GPA-S7'],
        gpaS8: item['GPA-S8'],
        discounts: item.Discounts || 0,
        noReExams: item['NO-Re-exams'] || 0,
        totalCGpa: convertPercentageToGPA(totalCGpaPercentage),
        prediction: item.Prediction,
      };
    });
  }, [data]);
  
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue: string) => {
      const filteredData = rows.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>) =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setFilteredRows(filteredData);
    }, 300);
  }, [rows]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Stack
      bgcolor="background.paper"
      borderRadius={10}
      width={1}
      height={1}
      boxShadow={theme.shadows[3]}
    >
      <Stack
        direction={belowSmallScreen ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Predict
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            variant="filled"
            placeholder="Search..."
            id="search-input"
            name="table-search-input"
            onChange={handleChange}
            value={search}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                  <IconifyIcon icon="mdi:search" width={1} height={1} />
                </InputAdornment>
              ),
            }}
            sx={{ width: belowSmallScreen ? '100%' : 'auto' }}
          />
          <IconButton onClick={handleDownload}>
            <IconifyIcon icon="mdi:download" width={24} height={24} color="black" />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
      <Box sx={{ overflowX: 'auto', height: '100%' }}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={filteredRows}
          getRowHeight={() => 70}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          pageSizeOptions={[5]}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
              expand: true,
            });
          }}
          slots={{
            loadingOverlay: LinearProgress as GridSlotsComponent['loadingOverlay'],
            pagination: CustomPagination,
            noRowsOverlay: () => <section>No rows available</section>,
          }}
          sx={{
            height: '100%',
            minWidth: '100%',
            '& .MuiDataGrid-row': {
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default Table;
