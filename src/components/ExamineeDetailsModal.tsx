import { Box, Button, Typography, Divider, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Examinee } from "../types/assessment";

interface Props {
  examineeDetails: Examinee;
  closeExamineeModal: () => void;
}

const ExamineeDetailsModal: React.FC<Props> = ({
  examineeDetails,
  closeExamineeModal,
}) => {
  return (
    <Box
      role="dialog"
      aria-labelledby="examinee-details-title"
      aria-describedby="examinee-details-description"
      sx={{
        maxWidth: "50vw",
        maxHeight: "90vh",
        bgcolor: "background.paper",
        m: "auto",
        mt: "5vh",
        borderRadius: 2,
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          bgcolor: "grey.200",
          p: 2,
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Typography id="examinee-details-title" fontWeight={600}>
          {examineeDetails?.fullName} - Examinee Details
        </Typography>
        <Button
          aria-label="Close Examinee Details Modal"
          onClick={closeExamineeModal
        }>
          <CloseIcon />
        </Button>
      </Box>

      <Box px={3} py={2} id="examinee-details-description" sx={{ overflowY: "auto", flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography>
            <strong>Username:</strong> {examineeDetails?.username}
          </Typography>
          <Typography>
            <strong>Login Time:</strong>{" "}
            {new Date(examineeDetails.loginTime).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Session Start:</strong>{" "}
            {new Date(examineeDetails.startTime).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Time Elapsed:</strong> {examineeDetails?.timeElapsed}
          </Typography>
          <Typography>
            <strong>Synced Questions:</strong> {examineeDetails?.questionsSynced}
          </Typography>
          <Typography>
            <strong>Status:</strong> {examineeDetails?.status}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Session Health
        </Typography>
        <Typography variant="body2">✓ Good connectivity</Typography>
        <Typography variant="body2">✓ Stable video stream</Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Login/Logout Timeline
        </Typography>
        <Typography variant="body2">
          – Logged in at {new Date(examineeDetails.loginTime).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2">– Still active</Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Technical Info
        </Typography>
        <Typography variant="body2">IP Address: 192.168.1.23</Typography>
        <Typography variant="body2">Device: Chrome on Windows 10</Typography>
        <Typography variant="body2">Location: Dubai, UAE</Typography>
      </Box>
    </Box>
  );
};

export default ExamineeDetailsModal;
