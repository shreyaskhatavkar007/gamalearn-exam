import React, { useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip } from "@mui/material";
import type { FilterState } from "./AssessmentFilters";
import { mockAssessments, mockExaminees } from "../data/mockAssessments";
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import type { Examinee } from "../types/assessment";
import { convertDate } from "../utils/utils";

interface Props {
  filters: FilterState;
  onSync: () => void;
  setShowExamineeModal: (state: { examinees: Examinee[]; show: boolean }) => void;
}

const AssessmentsTable: React.FC<Props> = ({ filters, onSync, setShowExamineeModal }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const filteredData = useMemo(() => {
    return mockAssessments.filter((a) => {
      return (
        (!filters.area || a.area === filters.area) &&
        (!filters.program || a.program === filters.program) &&
        (!filters.course || a.course === filters.course) &&
        (!filters.status || a.status === filters.status)
      );
    });
  }, [filters]);

  const columns: GridColDef[] = [
    { field: "area", headerName: "Area", flex: 1 },
    { field: "program", headerName: "Program", flex: 1 },
    { field: "course", headerName: "Course", flex: 1.5 },
    { field: "name", headerName: "Assessment Name", flex: 2 },
    { field: "startDate", headerName: "Start Date", flex: 1.5, valueFormatter: (value) => value ? convertDate(value) : "" },
    { field: "endDate", headerName: "End Date", flex: 1.5, valueFormatter: (value) => value ? convertDate(value) : ""  },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const color = 
          params.value === "Not Available" ? "warning" : "success";
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
      field: "monitor",
      headerName: "Monitor Examinees",
      flex: 1.5,
      renderCell: (params) => (
        <Button
          startIcon={<PeopleSharpIcon />}
          onClick={() => setShowExamineeModal({
              show: true,
              examinees: mockExaminees.filter(a => a.assessmentId === params.row.id) || [],
          })}
          aria-label={`Monitor examinees for assessment ${params.row.name}`}
        >
          {mockExaminees.filter(a => a.assessmentId === params.row.id)?.length || 0}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1.2,
      renderCell: () => (
        <Button
          variant="contained"
          size="small"
          onClick={onSync}
          aria-label="Sync assessments"
        >
          Sync
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: 900, p: 2 }}>
      <DataGrid
        disableRowSelectionOnClick
        rows={filteredData}
        getRowHeight={() => 'auto'}
        columns={columns}
        localeText={{
          noRowsLabel: 'No Assessments found for selected filters',
        }}
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
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        aria-label="Assessments Table"
      />
    </Box>
    </Box>
  );
};

export default AssessmentsTable;
