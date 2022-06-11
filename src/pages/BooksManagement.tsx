import { ChangeSet, Column, DataTypeProvider, EditingState, FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, Sorting, SortingState } from '@devexpress/dx-react-grid';
import { Grid as DxGrid, PagingPanel, Table, TableEditColumn, TableEditRow, TableFilterRow, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Chip, Grid, Paper } from '@mui/material';
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Popup from '../components/book/Popup';
import PopupEditing from '../components/PopupEditing';
import { bookAdded, bookDeleted, BookState, bookUpdated, selectBooks } from '../features/books/booksSlice';
import { selectCurrentUser } from '../features/users/currentUserSlice';

const BooksManagement = () => {
  const books = useAppSelector(selectBooks);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [columns] = useState<Column[]>([
    { name: 'id', title: 'Id' },
    { name: 'title', title: 'Title' },
    { name: 'genre', title: 'Genre' },
    { name: 'author', title: 'Author' },
    { name: 'yearPublished', title: 'Published' },
    { name: 'borrowAvailability', title: 'Availability' },
    { name: 'lastBorrower', title: 'Last Borrower' },
    { name: 'description', title: 'Description' }
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: 'title', wordWrapEnabled: true },
    { columnName: 'genre', wordWrapEnabled: true },
    { columnName: 'author', wordWrapEnabled: true },
    { columnName: 'lastBorrower', wordWrapEnabled: true },
    { columnName: 'description', wordWrapEnabled: true, width: 200 }
  ]);

  const [booleanColumns] = useState(['borrowAvailability']);
  const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'id', direction: 'desc' }]);
  const [editingRowIds, setEditingRowIds] = useState<Array<number | string>>([]);

  const isAdmin = () => currentUser?.role === "admin" ? true : false;
  const isEditor = () => currentUser?.role === "editor" ? true : false;
  const getRowId = (row: BookState) => row.id;

  const BooleanFormatter = ({ value }: { value: boolean }) => <Chip label={value ? 'Yes' : 'No'} color={value ? 'success' : 'error'} />;

  const BooleanTypeProvider = (props: any) => (
    <DataTypeProvider
      formatterComponent={BooleanFormatter}
      {...props}
    />
  );

  const commitChanges = (changes: ChangeSet) => {
    const { added, changed, deleted } = changes;

    if (added) {
      const { title, description, genre, author, yearPublished } = added[0];
      const formattedDate = yearPublished && yearPublished.isValid() ? yearPublished.format("YYYY") : new Date().getFullYear().toString();
      const startingAddedId = books.length > 0 ? books[books.length - 1].id + 1 : 0;

      const newBook: BookState = {
        id: startingAddedId,
        title,
        description,
        genre,
        author,
        yearPublished: formattedDate,
        borrowAvailability: true,
        lastBorrower: ""
      }

      if (title && genre && author) {
        dispatch(bookAdded(newBook));
      }
    }

    if (changed) {
      const existingBook = books.find((book: BookState) => book.id === editingRowIds[0])
      let updatingBook;

      if (existingBook) {
        const editedBook = changed[existingBook.id];

        if (editedBook) {
          const { yearPublished } = editedBook;

          if (yearPublished && yearPublished.isValid()) {
            editedBook.yearPublished = yearPublished.format("YYYY")
          } else {
            editedBook.yearPublished = existingBook.yearPublished
          }

          updatingBook = {
            ...existingBook,
            ...editedBook
          }

          dispatch(bookUpdated(updatingBook));
        }

      }
    }

    if (deleted) {
      dispatch(bookDeleted({ id: deleted[0] }));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DxGrid
            rows={books}
            columns={columns}
            getRowId={getRowId}
          >
            <BooleanTypeProvider
              for={booleanColumns}
            />

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

            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow showSortingControls />

            <TableEditRow />
            {
              isEditor() || isAdmin() ?
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

export default BooksManagement
