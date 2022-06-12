import FormGroup from "@mui/material/FormGroup";
import MuiGrid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

const BorrowReturnForm = ({
  onChange,
}: {
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
            onChange={onChange}
          />
        </FormGroup>
      </MuiGrid>
    </MuiGrid>
  </>
);

export default BorrowReturnForm
