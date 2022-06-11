import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import MuiGrid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}: {
  row: any,
  onChange: any,
  onApplyChanges: any,
  onCancelChanges: any,
  open: any
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">User Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={12}>
          <FormGroup>
            <TextField
              required
              margin="normal"
              name="name"
              label="Name"
              value={row.name || ''}
              onChange={onChange}
            />

            <FormControl fullWidth required margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={row.role || ''}
                label="Role"
                onChange={(event: SelectChangeEvent) => {
                  const roleValue = event.target.value
                  return onChange({
                    target: { name: 'role', value: roleValue },
                  })
                }
                }
              >
                <MenuItem value={'admin'}>admin</MenuItem>
                <MenuItem value={'editor'}>editor</MenuItem>
                <MenuItem value={'user'}>user</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                renderInput={props => <TextField margin="normal" {...props} />}
                label="Joining Date"
                value={row.dateJoined}
                onChange={value => onChange({
                  target: { name: 'dateJoined', value },
                })}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>

          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default Popup
