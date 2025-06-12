import React, { Component, type ReactNode } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          sx={
            { height: "100vh", position: "fixed", top: 0, left: 0, width: "100vw" }
          }
          alignItems="center"
          justifyContent="center"
        >
          <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: "center" }}>
            <ErrorOutlineIcon sx={{ fontSize: 50, color: "error.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Something went wrong.
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {this.state.error?.message || "An unexpected error occurred."}
            </Typography>
            <Button variant="contained" color="primary" onClick={this.handleReload}>
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;