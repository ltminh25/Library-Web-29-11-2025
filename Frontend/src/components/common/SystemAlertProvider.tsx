import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { AlertColor } from "@mui/material";
import SnackbarAlert from "./SnackbarAlert";

type ShowMessage = (message: string, severity?: AlertColor) => void;

interface SystemAlertContextType {
  showMessage: ShowMessage;
}

const SystemAlertContext = createContext<SystemAlertContextType | undefined>(undefined);

/**
 * Replace native window.alert (shows "localhost:5173 says") with a styled snackbar.
 * Also exposes a hook to trigger messages without touching window.alert directly.
 */
export const SystemAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const originalAlert = useRef<typeof window.alert>(window.alert);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const showMessage: ShowMessage = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message: String(message ?? ""),
      severity,
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    originalAlert.current = window.alert;
    window.alert = (msg?: any) => showMessage(String(msg ?? ""), "info");
    return () => {
      if (originalAlert.current) {
        window.alert = originalAlert.current;
      }
    };
  }, []);

  return (
    <SystemAlertContext.Provider value={{ showMessage }}>
      {children}
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleClose}
        autoHideDuration={3500}
      />
    </SystemAlertContext.Provider>
  );
};

export const useSystemAlert = (): SystemAlertContextType => {
  const ctx = useContext(SystemAlertContext);
  if (!ctx) throw new Error("useSystemAlert must be used inside SystemAlertProvider");
  return ctx;
};
