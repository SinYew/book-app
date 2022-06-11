import React, { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUsers, userAdded, userUpdated, userDeleted, UserState } from '../features/users/usersSlice';
import { Grid as DxGrid, PagingPanel, Table, TableEditColumn, TableEditRow, TableFilterRow, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { ChangeSet, Column, EditingState, FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, Sorting, SortingState } from '@devexpress/dx-react-grid';
import { selectCurrentUser } from '../features/users/currentUserSlice';
import PopupEditing from '../components/PopupEditing';
import Popup from '../components/user/Popup';

const UsersManagement = () => {
  const users = useAppSelector(selectUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const isAdmin = () => currentUser?.role === "admin" ? true : false;

  const [columns] = useState<Column[]>([
    { name: 'id', title: 'Id' },
    { name: 'name', title: 'Name' },
    { name: 'role', title: 'Role' },
    { name: 'dateJoined', title: 'Date Joined' },
  ]);

  const getRowId = (row: UserState) => row.id;

  const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'name', direction: 'asc' }]);
  const [editingRowIds, setEditingRowIds] = useState<Array<number | string>>([]);


  const commitChanges = (changes: ChangeSet) => {
    const { added, changed, deleted } = changes;

    if (added) {
      const { name, role, dateJoined } = added[0];
      const formattedDate = dateJoined && dateJoined.isValid() ? dateJoined.format("YYYY-MM-DD") : new Date().toLocaleDateString('en-CA');

      if (name && role) {
        dispatch(userAdded(name, role, formattedDate));
      }
    }

    if (changed) {
      const existingUser = users.find((user: UserState) => user.id === editingRowIds[0])
      let updatingUser;
      if (existingUser) {
        const editedUser = changed[existingUser.id];

        if( editedUser ) {
          const { dateJoined } = editedUser;
        
          if (dateJoined && dateJoined.isValid()) {
            editedUser.dateJoined = dateJoined.format("YYYY-MM-DD")
          } else {
            editedUser.dateJoined = existingUser.dateJoined
          }
  
          updatingUser = {
            ...existingUser,
            ...editedUser
          }

          dispatch(userUpdated(updatingUser));
        }
      }
    }

    if (deleted) {
      dispatch(userDeleted({ id: deleted[0] }));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DxGrid
            rows={users}
            columns={columns}
            getRowId={getRowId}
          >
            <FilteringState defaultFilters={[]} />
            <IntegratedFiltering />

            <SortingState
              sorting={sorting}
              onSortingChange={setSorting}
            />
            <IntegratedSorting />

            <PagingState
              defaultCurrentPage={0}
              pageSize={5}
            />
            <IntegratedPaging />

            <EditingState
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={setEditingRowIds}
              onCommitChanges={commitChanges}
            />

            <Table />
            <TableHeaderRow showSortingControls />
            <TableEditRow />
            {
              isAdmin() ? 
              <TableEditColumn
                showAddCommand
                showEditCommand
                showDeleteCommand
              /> : <></>
            }
            <TableFilterRow />
            <PagingPanel />

            <PopupEditing popupComponent={Popup} />
          </DxGrid>
        </Paper>
      </Grid>
    </>
  )
}

export default UsersManagement
