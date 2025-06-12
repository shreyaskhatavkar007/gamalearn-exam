import { lazy, Suspense, useState } from "react";
import { Box, Typography, Grid, Modal, Button, Divider, CircularProgress } from "@mui/material";
import { groups, mockAssessments } from "../data/mockAssessments";
import type { Examinee } from "../types/assessment";
import ExamineesFilters, { type FilterState } from "../components/ExamineesFilters";
import ExamineesTable from "../components/ExamineesTable";
import CloseIcon from '@mui/icons-material/Close';
import { convertDate } from "../utils/utils";
import ToastContainerComponent from "../components/ToastContainerComponent";
import { CommonDialog } from "../components/CommonDialog";

interface Props {
  examinees: Examinee[];
  closeMonitorExamModal: () => void;
  direction?: "ltr" | "rtl";
}

const ExamineeDetailsModal = lazy(() => import("../components/ExamineeDetailsModal"));

const MonitorExamineesPage: React.FC<Props> = ({ examinees, closeMonitorExamModal, direction }) => {
  const initialFilters: FilterState = {
    area: "",
    group: [],
    examinee: "",
    status: "",
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showExamineeModal, setShowExamineeModal] = useState<{ examineeDetails: Examinee; show: boolean }>({
    examineeDetails: {} as Examinee,
    show: false,
  });
  const assessmentId = examinees?.[0]?.assessmentId;
  const examData = mockAssessments.find((assessment) => assessment.id === assessmentId);

  const closeExamineeModal = () => setShowExamineeModal({ examineeDetails: {} as Examinee, show: false });
  const openExamineeModal = (examinee: Examinee) => {
    setShowExamineeModal({ examineeDetails: examinee, show: true });
  };
  const [resetTimer, setResetTimer] = useState(false);
  const [restartSession, setRestartSession] = useState(false);
  const [paperMode, setPaperMode] = useState(false);

  const handleResetTimer = () => {
    // API CALL
    setOpenDialog(true);
  };

  const handleRestartSession = () => {
    // API CALL
    setRestartSession(true);
  };

  const handlePaperMode = () => {
    // API CALL
    setPaperMode(true);
  };

  return (
    <Box
      dir={direction}
      sx={{
        maxWidth: "95vw",
        maxHeight: "95vh",
        bgcolor: "background.paper",
        m: "auto",
        mt: "5vh",
        borderRadius: 2,
        boxShadow: 24,
        overflowY: 'auto'
      }}
      role="dialog"
      aria-labelledby="monitor-examinees-title"
    >
      <Box 
        sx={{
          bgcolor: 'grey.200',
          p: 1,
          py: 0.1,
          display: 'flex',
          justifyContent: 'space-between',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          alignItems: 'center',
        }}
      >
        <Typography id="monitor-examinees-title">
          Monitoring Exam Submissions – Assessment #{assessmentId}
        </Typography>
        <Button
          onClick={closeMonitorExamModal}
          aria-label="Close monitoring exam modal"
        >
          <CloseIcon />
        </Button>
      </Box>

      <Box>
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid size={{ xs: 12, md: 6, sm: 6 }}>
            <Typography color="primary" variant="h6">
              <Box component="span" color="primary.main">
                Exam:&nbsp;
              </Box>
              <Box component="span" color="text.primary">
                {examData?.name || "N/A"}
              </Box>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 6 }}>
            <Typography color="primary" variant="h6">
              <Box component="span" color="primary.main">
                Exam Date:&nbsp;
              </Box>
              <Box component="span" color="text.primary">
                {`${convertDate(examData?.startDate || '')} - ${convertDate(examData?.endDate || '')}` || "N/A"}
              </Box>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 6 }}>
            <Typography color="primary" variant="h6">
              <Box component="span" color="primary.main">
                Exam Area:&nbsp;
              </Box>
              <Box component="span" color="text.primary">
                {examData?.area || "N/A"}
              </Box>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 6 }}>
            <Typography color="primary" variant="h6">
              <Box component="span" color="primary.main">
                Total Examinees:&nbsp;
              </Box>
              <Box component="span" color="text.primary">
                {examinees.length || 0}
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ bgcolor: 'grey.300', height: '1px', my: 1 }} />
        <ExamineesFilters
          filters={filters}
          onChange={setFilters}
          examinees={examinees}
          clearFilters={() => setFilters(initialFilters)}
          groups={groups}
        />
        <Divider sx={{ bgcolor: 'grey.300', height: '1px', my: 1 }} />
        <ExamineesTable
          filters={filters}
          examinees={examinees}
          openExamineeModal={openExamineeModal}
          handleResetTimer={handleResetTimer}
          handlePaperMode={handlePaperMode}
          handleRestartSession={handleRestartSession}
        />
      </Box>

      <Modal
        open={!!showExamineeModal?.show}
        onClose={closeExamineeModal}
        aria-labelledby="examinee-details-title"
        aria-describedby="examinee-details-description"
      >
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress aria-label="Loading examinee details" />
            </Box>
          }
        >
          <ExamineeDetailsModal
            examineeDetails={showExamineeModal?.examineeDetails}
            closeExamineeModal={closeExamineeModal}
          />
        </Suspense>
      </Modal>
      <ToastContainerComponent
        open={resetTimer}
        onClose={() => setResetTimer(false)}
        message="Timer reset successfully!"
        aria-live="polite"
      />
      <ToastContainerComponent
        open={restartSession}
        onClose={() => setRestartSession(false)}
        message="Session restarted successfully!"
        aria-live="polite"
      />
      <ToastContainerComponent
        open={paperMode}
        onClose={() => setPaperMode(false)}
        message="Switched to paper mode successfully!"
        aria-live="polite"
      />
      <CommonDialog
        open={openDialog}
        title="Reset Timer"
        content="Are you sure you want to reset the timer?"
        confirmText="Reset"
        cancelText="Cancel"
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          setResetTimer(true);
          setOpenDialog(false);
        }}
        aria-labelledby="reset-timer-dialog-title"
        aria-describedby="reset-timer-dialog-description"
      />
    </Box>
  );
};

export default MonitorExamineesPage;