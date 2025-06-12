import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack } from "@mui/material";
import type { Examinee } from "../types/assessment";
import type { FilterState } from "./ExamineesFilters";
import { convertDate } from "../utils/utils";

interface Props {
  filters: FilterState;
  examinees: Examinee[];
  openExamineeModal?: (examinee: Examinee) => void;
  handleResetTimer?: () => void;
  handleRestartSession?: () => void;
  handlePaperMode?: () => void;
}

const ExamineesTable: React.FC<Props> = ({ filters, examinees, openExamineeModal, handleResetTimer, handleRestartSession, handlePaperMode }) => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setLoadingTable(true);
    const fakeTimer = setTimeout(() => {
      setLoadingTable(false);
    }, 1500);
    return () => clearTimeout(fakeTimer);
  }, [filters]);

  const filtered = useMemo(() => {
    return examinees.filter((e) => {
      return (
        (!filters.area || e.area === filters.area) &&
        (!filters.group?.length || filters.group.includes(e.groupId)) &&
        (!filters.examinee || e.username.toLowerCase().includes(filters.examinee.toLowerCase())) &&
        (!filters.status || e.status === filters.status)
      );
    });
  }, [filters]);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          size="small"
          onClick={() => openExamineeModal?.(params.row)}
          aria-label={`Open details for ${params.value}`}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    {
      field: "loginTime",
      headerName: "Login",
      flex: 1,
      valueGetter: (v) => convertDate(v),
    },
    {
      field: "startTime",
      headerName: "Start",
      flex: 1,
      valueGetter: (v) => convertDate(v),
    },
    { field: "questionsSynced", headerName: "Qs Synced", width: 110 },
    { field: "timeElapsed", headerName: "Elapsed", width: 100 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const color =
          params.value === "Absent" ? "warning" :
          params.value === "In Progress" ? "info" :
          "success";
        return (
          <Chip
            label={params.value}
            color={color}
            role="status"
            aria-label={`Status: ${params.value}`}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <Stack direction="row" spacing={1}>
            {status === "Student Submission" && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleResetTimer}
                  aria-label="Reset Timer"
                >
                  Reset Timer
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleRestartSession}
                  aria-label="Restart Session"
                >
                  Restart Session
                </Button>
              </>
            )}
            {status === "Absent" && (
              <Button
                variant="outlined"
                size="small"
                onClick={handlePaperMode}
                aria-label="Switch to Paper Mode"
              >
                Switch to Paper Mode
              </Button>
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: 900, p: 2 }}>
        <DataGrid
          disableRowSelectionOnClick
          loading={loadingTable}
          rows={filtered}
          columns={columns}
          localeText={{
            noRowsLabel: 'No examinees found for selected filters',
          }}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
              padding: '8px',
              wordBreak: 'break-word',
              alignItems: 'center',
              display: 'flex',
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          aria-label="Examinees Table"
        />
      </Box>
    </Box>
  );
};

export default ExamineesTable;
