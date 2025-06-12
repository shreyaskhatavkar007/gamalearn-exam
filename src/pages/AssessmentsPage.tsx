import { useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import AssessmentFilters, { type FilterState } from "../components/AssessmentFilters";
import AssessmentsTable from "../components/AssessmentsTable";
import { mockAssessments } from "../data/mockAssessments";
import type { Examinee } from "../types/assessment";
import ToastContainerComponent from "../components/ToastContainerComponent";

interface Props {
  setShowExamineeModal: (state: { examinees: Examinee[]; show: boolean }) => void;
}

const AssessmentsPage: React.FC<Props> = ({ setShowExamineeModal }) => {
  const initialFilters: FilterState = {
    area: "",
    program: "",
    course: "",
    status: "",
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleSync = () => {
    setSyncSuccess(true);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Downloaded Assessments
      </Typography>

      <Paper elevation={2} sx={{
        height: {
          md: "calc(100vh - 100px)"
        },
        display: 'flex',
        flexDirection: 'column', 
      }}>
        <Box sx={{ flexShrink: 0 }}>
          <AssessmentFilters filters={filters} onChange={setFilters} assessments={mockAssessments} clearFilters={() => setFilters(initialFilters)} />
          <Divider sx={{ bgcolor: 'grey.300', height: '1px', my: 1 }} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <AssessmentsTable filters={filters} onSync={handleSync} setShowExamineeModal={setShowExamineeModal} />
        </Box>
      </Paper>
      <ToastContainerComponent
        open={syncSuccess}
        onClose={() => setSyncSuccess(false)}
        message="Submissions synced successfully!"
      />
    </Box>
  );
};

export default AssessmentsPage;