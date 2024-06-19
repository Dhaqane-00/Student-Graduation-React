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
  Department: string;
  Sex: string;
  Mode: string;
  Att_S1: number;
  Att_S2: number;
  Att_S3: number;
  Att_S4: number;
  Att_S5: number;
  Att_S6: number;
  Att_S7: number;
  Att_S8: number;

  Schollarship: number;

  GPA_S1: number;
  GPA_S2: number;
  GPA_S3: number;
  GPA_S4: number;
  GPA_S5: number;
  GPA_S6: number;
  GPA_S7: number;
  GPA_S8: number;

  
  No_ReExam_Subjects: number;
  Prediction: string;
}

const columns: GridColDef[] = [
  { field: 'Department', headerName: 'Department', flex: 1, minWidth: 250 },
  { field: 'Sex', headerName: 'Sex', flex: 0.5, minWidth: 90 },
  { field: 'Mode', headerName: 'Mode', flex: 0.5, minWidth: 90 },
  { field: 'Att_S1', headerName: 'Att-S1', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S2', headerName: 'Att-S2', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S3', headerName: 'Att-S3', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S4', headerName: 'Att-S4', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S5', headerName: 'Att-S5', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S6', headerName: 'Att-S6', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S7', headerName: 'Att-S7', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'Att_S8', headerName: 'Att-S8', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'T_Att', headerName: 'T-Att', flex: 0.5, minWidth: 150 },
  { field: 'Schollarship', headerName: 'Schollarship', type: 'number', flex: 0.5, minWidth: 90 },
  { field: 'No_ReExam_Subjects', headerName: 'No-Re-exam', type: 'number', flex: 0.5, minWidth: 150 },
  { field: 'GPA_S1', headerName: 'GPA S1', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S2', headerName: 'GPA S2', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S3', headerName: 'GPA S3', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S4', headerName: 'GPA S4', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S5', headerName: 'GPA S5', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S6', headerName: 'GPA S6', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S7', headerName: 'GPA S7', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'GPA_S8', headerName: 'GPA S8', type: 'number', flex: 0.5, minWidth: 80 },
  { field: 'CGPA', headerName: 'CGPA', flex: 0.5, minWidth: 80 },
  { field: 'Prediction', headerName: 'Prediction', flex: 0.75, minWidth: 150 },
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
        Department: item.Department,
        Sex: item.Sex,
        Mode: item.Mode,
        Att_S1: item['Att-S1'],
        Att_S2: item['Att-S2'],
        Att_S3: item['Att-S3'],
        Att_S4: item['Att-S4'],
        Att_S5: item['Att-S5'],
        Att_S6: item['Att-S6'],
        Att_S7: item['Att-S7'],
        Att_S8: item['Att-S8'],

        T_Att: calculateAverage([
          item['Att-S1'], item['Att-S2'], item['Att-S3'], item['Att-S4'], item['Att-S5'],
          item['Att-S6'], item['Att-S7'], item['Att-S8']
        ]),

        Schollarship: item.Schollarship || 0,
        No_ReExam_Subjects: item['NO-Re-exams'] || 0,

        GPA_S1: item['GPA-S1'],
        GPA_S2: item['GPA-S2'],
        GPA_S3: item['GPA-S3'],
        GPA_S4: item['GPA-S4'],
        GPA_S5: item['GPA-S5'],
        GPA_S6: item['GPA-S6'],
        GPA_S7: item['GPA-S7'],
        GPA_S8: item['GPA-S8'],


        CGPA: convertPercentageToGPA(totalCGpaPercentage),
        Prediction: item.Prediction,
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
