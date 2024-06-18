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
  totalGpa: string;
  gender: string;
  mode: string;
  totalAttendance: string;
  discounts: number;
  noReExams: number;
  prediction: string;
}

const columns: GridColDef[] = [
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 250 },
  { field: 'discounts', headerName: 'Discounts', type: 'number', flex: 0.5, minWidth: 90 },
  { field: 'noReExams', headerName: 'No. of Re-exams', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'gender', headerName: 'Gender', flex: 0.5, minWidth: 90 },
  { field: 'mode', headerName: 'Mode', flex: 0.5, minWidth: 90 },
  { field: 'totalGpa', headerName: 'GPA', flex: 0.5, minWidth: 80 },
  { field: 'totalAttendance', headerName: 'Total Attendance', flex: 0.5, minWidth: 150 },
  { field: 'prediction', headerName: 'Prediction', flex: 0.75, minWidth: 150 },
];

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
    return data.results.map((item: any) => ({
      id: item._id,
      department: item.Department,
      totalGpa: calculateAverage([
        item['GPA-S1'], item['GPA-S2'], item['GPA-S3'], item['GPA-S4'], item['GPA-S5'],
        item['GPA-S6'], item['GPA-S7'], item['GPA-S8']
      ]),
      gender: item.Sex,
      mode: item.Mode,
      totalAttendance: calculateAverage([
        item['Att-S1'], item['Att-S2'], item['Att-S3'], item['Att-S4'], item['Att-S5'],
        item['Att-S6'], item['Att-S7'], item['Att-S8']
      ]),
      discounts: item.Discounts || 0,
      noReExams: item['NO-Re-exams'] || 0,
      prediction: item.Prediction,
    }));
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
