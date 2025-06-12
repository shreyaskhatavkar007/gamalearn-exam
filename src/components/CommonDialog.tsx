import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type CommonDialogProps = {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  disableBackdropClick?: boolean;
};

export const CommonDialog: React.FC<CommonDialogProps> = ({
  open,
  title,
  content,
  confirmText = "OK",
  cancelText = "Cancel",
  onClose,
  onConfirm,
  disableBackdropClick = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (disableBackdropClick && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
        onClose();
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent dividers>
        {typeof content === "string" ? (
          <Typography>{content}</Typography>
        ) : (
          content
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant="contained" color="primary">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
