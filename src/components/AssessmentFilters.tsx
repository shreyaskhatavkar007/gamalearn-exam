import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import type { Assessment } from "../types/assessment";

export interface FilterState {
  area: string;
  program: string;
  course: string;
  status: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  assessments: Assessment[];
  clearFilters?: () => void;
}

const AssessmentFilters: React.FC<Props> = ({ filters, onChange, assessments, clearFilters }) => {
  const handleChange = (e: SelectChangeEvent) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };
  const uniqueAreas = Array.from(new Set(assessments.map((e) => e.area)));
  const uniqueCourses = Array.from(new Set(assessments.map((e) => e.course)));
  const uniqueStatus = Array.from(new Set(assessments.map((e) => e.status)));

  return (
    <>
      <Typography variant="h6" sx={{ p: 2, pb: 0, color: "primary.main" }}>
        Filters
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="area-select-label">Select Area</InputLabel>
            <Select
              name="area"
              value={filters.area}
              label="Select Area"
              onChange={handleChange}
              aria-labelledby="area-select-label"
            >
              <MenuItem value="">None</MenuItem>
              {uniqueAreas?.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="program-select-label">Select Program</InputLabel>
            <Select
              name="program"
              value={filters.program}
              label="Select Program"
              onChange={handleChange}
              aria-labelledby="program-select-label"
            >
              <MenuItem value="">None</MenuItem>
              {assessments?.map((assessment) => (
                <MenuItem key={assessment.id} value={assessment.program}>
                  {assessment.program}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              name="course"
              value={filters.course}
              label="Select Course"
              onChange={handleChange}
              aria-labelledby="course-select-label"
            >
              <MenuItem value="">None</MenuItem>
              {uniqueCourses?.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Select Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              label="Select Status"
              onChange={handleChange}
              aria-labelledby="status-select-label"
            >
              <MenuItem value="">None</MenuItem>
              {uniqueStatus?.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex", alignItems: "end" }}>
          <Button
            size="small"
            color="primary"
            onClick={clearFilters}
            aria-label="Reset Filters"
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AssessmentFilters;