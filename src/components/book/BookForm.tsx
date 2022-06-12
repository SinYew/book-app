import FormGroup from "@mui/material/FormGroup";
import MuiGrid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BookForm = ({
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
            name="isbn"
            label="ISBN"
            value={row.isbn || ''}
            onChange={onChange}
          />
          <TextField
            required
            margin="normal"
            name="title"
            label="Title"
            value={row.title || ''}
            onChange={onChange}
          />
          <TextField
            required
            margin="normal"
            name="author"
            label="Author"
            value={row.author || ''}
            onChange={onChange}
          />
        </FormGroup>
      </MuiGrid>

      <MuiGrid item xs={6}>
        <FormGroup>
          <TextField
            required
            margin="normal"
            name="genre"
            label="Genre"
            value={row.genre || ''}
            onChange={onChange}
          />
        </FormGroup>
      </MuiGrid>

      <MuiGrid item xs={6}>
        <FormGroup>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              renderInput={props => <TextField margin="normal" {...props} />}
              views={['year']}
              label="Published"
              value={row.yearPublished}
              onChange={value => onChange({
                target: { name: 'yearPublished', value },
              })}
              inputFormat="YYYY"
            />
          </LocalizationProvider>
        </FormGroup>
      </MuiGrid>

      <MuiGrid item xs={12}>
        <FormGroup>
          <TextField
            multiline
            rows={4}
            margin="normal"
            name="description"
            label="Description"
            value={row.description || ''}
            onChange={onChange}
          />
        </FormGroup>
      </MuiGrid>
    </MuiGrid>
  </>
);

export default BookForm
