import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  duration?: number;
}

const ToastContainerComponent: React.FC<ToastProps> = ({
  open,
  onClose,
  message,
  severity = "success",
  duration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      aria-live="polite"
      aria-describedby="toast-message"
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{ width: "100%" }}
        role="alert"
        id="toast-message"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastContainerComponent;
