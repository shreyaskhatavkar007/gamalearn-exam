import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import type { Examinee, RecursiveValue } from "../types/assessment";
import DropDownTreeSelect from "./DropdownTreeSelect/DropDownTreeSelect";

export interface FilterState {
  area: string;
  group: string[];
  examinee: string;
  status: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  examinees: Examinee[];
  groups: RecursiveValue[];
  clearFilters?: () => void;
}

export const SimulateError = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("This is a simulated error for testing ErrorBoundary.");
  }

  return (
    <Button
      size="small"
      color="error"
      onClick={() => setThrowError(true)}
    >
      Error Test
    </Button>
  );
};

const ExamineesFilters: React.FC<Props> = ({ filters, onChange, examinees, clearFilters, groups }) => {
    const [inputValue, setInputValue] = useState(filters.examinee);
    const uniqueAreas = Array.from(new Set(examinees.map((e) => e.area)));
    const uniqueStatus = Array.from(new Set(examinees.map((e) => e.status)));

    const [listId, setListId] = useState<string[]>([]);

    useEffect(() => {
      const handler = setTimeout(() => {
        handleAutocompleteChange(inputValue);
      }, 300);

    return () => clearTimeout(handler);
    }, [inputValue]);

    useEffect(() => {
      onChange({ ...filters, group: listId.length ? listId : [] });
    }, [listId]);

  const handleChange = (e: SelectChangeEvent) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAutocompleteChange = (
    value: string | null
  ) => {
    onChange({ ...filters, examinee: value || "" });
  };

  return (
    <>
      <Typography variant="h6" sx={{ p: 2, pb: 0, color: "primary.main" }}>
        Filters
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Area</InputLabel>
            <Select
              name="area"
              value={filters.area}
              label="Select Area"
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
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
            <DropDownTreeSelect data={groups} setListId={setListId} listId={listId} />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <Autocomplete
                size="small"
                sx={{ minWidth: 200 }}
                options={examinees.map((e) => e.username)}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                onChange={(_, newValue) => {
                  setInputValue(newValue || "");
                  handleAutocompleteChange(newValue);
                }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Search Examinee" />}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              label="Select Status"
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueStatus?.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: "flex", alignItems: "end" }}>
          <Button size="small" color="primary" onClick={() => {
            clearFilters?.();
            setInputValue("");
            setListId([]);
          }}>Reset Filters</Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: "flex", alignItems: "end", justifyContent: "flex-end" }}>
          <SimulateError />
        </Grid>
      </Grid>
    </>
  );
};

export default ExamineesFilters;