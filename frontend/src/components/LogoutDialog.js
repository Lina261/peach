import {
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutDialog(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const exit = () => {
    navigate("/", { replace: true });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Do you really want to leave PEACH ?"}
      </DialogTitle>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={exit}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
}
