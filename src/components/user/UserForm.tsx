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

const UserForm = ({
  row,
  onChange,
}: {
  row?: any,
  onChange?: any,
}) => (
  <>
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
  </>
);

export default UserForm
