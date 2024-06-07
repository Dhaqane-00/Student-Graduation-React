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
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlotsComponent, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import { useGetResultsQuery } from 'store/api/fileApi';
import CustomPagination from './CustomPagination';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as XLSX from 'xlsx';

interface RowData {
  id: string;
  department: string;
  gpa: string;
  gender: string;
  mode: string;
  prediction: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 150 },
  { field: 'gpa', headerName: 'GPA', flex: 0.5, minWidth: 100 },
  { field: 'gender', headerName: 'Gender', flex: 0.5, minWidth: 100 },
  { field: 'mode', headerName: 'Mode', flex: 0.75, minWidth: 120 },
  { field: 'prediction', headerName: 'Prediction', flex: 0.75, minWidth: 150 },
];

const Table = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);
  const { data, isLoading, error, refetch } = useGetResultsQuery({}, { refetchOnMountOrArgChange: true });
  const { down } = useBreakpoints();
  const belowSmallScreen = down('sm');

  const rows = useMemo(() => {
    if (!data) return [];
    return data.results.map((item: { _id: string; Department: string; GPA: string; Gender: string; Mode: string; Prediction: string; }): RowData => ({
      id: item._id,
      department: item.Department,
      gpa: item.GPA,
      gender: item.Gender,
      mode: item.Mode,
      prediction: item.Prediction,
    }));
  }, [data]);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue: string) => {
      apiRef.current.setQuickFilterValues(
        searchValue.split(' ').filter((word: string) => word !== ''),
      );
    }, 250);
  }, [apiRef]);

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
    }, 5000); // Adjust the polling interval as per your requirement

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Stack bgcolor="background.paper" borderRadius={5} width={1} height={1}>
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
      <Stack height={1} id="table-content">
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
            height: 1,
            width: 1,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Table;
