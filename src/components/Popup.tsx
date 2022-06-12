import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Popup = ({
  onApplyChanges,
  onCancelChanges,
  open,
  title,
  saveButtonText,
  children
}: {
  onApplyChanges: any,
  onCancelChanges: any,
  open: any,
  title: string,
  saveButtonText: string
  children: React.ReactNode
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        {saveButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default Popup
