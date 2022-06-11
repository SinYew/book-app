import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const BorrowReturnPopup = ({
    onChange,
    onApplyChanges,
    onCancelChanges,
    open,
    status
}: {
    onChange: any,
    onApplyChanges: any,
    onCancelChanges: any,
    open: any,
    status: any
}) => (
    <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Book Details</DialogTitle>
        <DialogContent>
            <FormGroup>
                <TextField
                    required
                    margin="normal"
                    name="isbn"
                    label="ISBN"
                    onChange={onChange}
                />
            </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancelChanges} color="secondary">
                Cancel
            </Button>
            <Button onClick={onApplyChanges} color="primary">
                {status === "borrow" ? "Borrow" : "Return"}
            </Button>
        </DialogActions>
    </Dialog>
);

export default BorrowReturnPopup
