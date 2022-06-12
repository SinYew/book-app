import { Button, Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookState, bookUpdated, selectBooks } from "../../features/books/booksSlice";
import { bookBorrow, bookReturn, selectTransactions, TransactionState } from "../../features/books/transactionSlice";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import { UserState } from "../../features/users/usersSlice";
import Popup from "../Popup";
import BorrowReturnForm from "./BorrowReturnForm";

const BorrowReturn = () => {
  const books: BookState[] = useAppSelector(selectBooks);
  const transactions: TransactionState[] = useAppSelector(selectTransactions);
  const currentUser: UserState = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isbn, setIsbn] = useState("");

  const onBorrow = () => {
    setStatus("borrow");
    setOpen(true);
  };

  const onReturn = () => {
    setStatus("return");
    setOpen(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsbn(value);
  };

  const applyChanges = () => {
    const book = books.find((book: BookState) => book.isbn === isbn);

    if (book) {
      const borrowTransaction = transactions.find((transaction: TransactionState) => {
        return transaction.bookId === book.id && transaction.status === "borrow"
      });

      const returnTransaction = transactions.find((transaction: TransactionState) => {
        return transaction.bookId === book.id && transaction.userId === currentUser.id && transaction.status === "borrow"
      });

      if (status === "borrow") {
        if (borrowTransaction) {
          alert("this book is not available");
          return;
        }
        const startingId = transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 0;

        const newTransaction: TransactionState = {
          id: startingId,
          bookId: book.id,
          userId: currentUser.id,
          status: "borrow"
        }

        dispatch(bookBorrow(newTransaction));
        dispatch(bookUpdated({
          ...book,
          borrowAvailability: false,
          lastBorrower: currentUser.name
        }))
      } else {

        if (returnTransaction) {
          dispatch(bookReturn({
            id: returnTransaction.id,
            status: "return"
          }));

          dispatch(bookUpdated({
            ...book,
            borrowAvailability: true
          }))
        } else {
          alert("Invalid request");
        }

      }

      setOpen(false);

    } else {
      alert("this book does not exist");
    }

    setIsbn("");
  };

  const cancelChanges = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" sx={{ mr: 3 }} onClick={onBorrow}>Borrow</Button>
        <Button variant="contained" color="secondary" onClick={onReturn}>Return</Button>
      </Grid>

      <Popup
        title={"Book Details"}
        saveButtonText={status === "borrow" ? "Borrow" : "Return"}
        open={open}
        onApplyChanges={applyChanges}
        onCancelChanges={cancelChanges}
      >
        <BorrowReturnForm onChange={onChange}/>
      </Popup>
    </>
  )
};

export default BorrowReturn
