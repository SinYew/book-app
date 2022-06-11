import { FormControl, InputLabel, MenuItem, } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { currentUserUpdated, selectCurrentUser } from "../../features/users/currentUserSlice";

const SelectUser = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  
  return (
    <FormControl required margin="normal" sx={{width:200}}>
      <InputLabel id="user-label">User</InputLabel>
      <Select
        labelId="user-label"
        id="user-select"
        label="User"
        value={currentUser.id}
        onChange={(event: SelectChangeEvent) => {
          const userId = event.target.value
          dispatch(currentUserUpdated({
            id: userId
          }))
        }}
      >
        <MenuItem value={'-wPwed35Pjz_aDjdVY11I'}>Alexis Hickle - admin</MenuItem>
        <MenuItem value={'D-ND0_jiP3LqlWrJsVIPq'}>Clare Durgan - editor</MenuItem>
        <MenuItem value={'HDZy46Vd6gpV-G0HQ2ZCQ'}>Tess Beatty - user</MenuItem>
      </Select>
    </FormControl>
  )

}

export default SelectUser
