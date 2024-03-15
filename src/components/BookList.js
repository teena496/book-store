import {
  Container,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UpdateBook from "./UpdateBook";
import AddBook from "./AddBook";

export default function BookList() {
  const rows = [
    createData(
      1,
      "A Brief History of Time",
      26,
      "Popular science",
      "A simple summary of A Brief History of Time goes all the way from the beginning of the universe to its end, explaining things like space and time, the expanding universe, the uncertainty principle, black holes, wormholes, and time travel along the way. It sold over 25 million copies."
    ),
    createData(
      2,
      "The Power of Positive Thinking",
      20,
      "Self-help",
      "In The Power of Positive Thinking, Norman Vincent Peale says there is no problem or obstacle you can't overcome with faith and a positive mindset. This self-help classic outlines the practical techniques of applied Christianity to help you take control of the events in your life rather than be directed by them."
    ),
    createData(
      3,
      "Atomic Habits",
      22,
      "self-help book",
      "Atomic Habits is a practical self-help book that helps readers change bad habits and develop good ones."
    ),
    createData(
      4,
      "Rich Dad Poor Dad",
      16,
      "Personal finance",
      "The book is based on Kiyosaki's personal experiences with his two fathers - his biological father (poor dad) and his best friend's father (rich dad). The book provides a guide to financial literacy and teaches readers about the importance of financial education, creating wealth, and achieving financial freedom."
    ),
    createData(
      5,
      "Sapiens: A Brief History of Humankind",
      34,
      "Non-fiction",
      "Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2014.[1][2] The book, focusing on Homo sapiens, surveys the history of humankind, starting from the Stone Age and going up to the twenty-first century. The account is situated within a framework that intersects the natural sciences with the social sciences."
    ),
  ];

  const [books, setBooks] = useState(rows);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [addPopupOpen, setAddPopupOpen] = useState(false);

  const [selectedRowId, setSelectedRowId] = useState(false);
  const columnNames = [
    { id: 1, name: "Book Name" },
    { id: 2, name: "Price($)" },
    { id: 3, name: "Category" },
    { id: 4, name: "Description" },
    { id: 5, name: "" },
    { id: 6, name: "" },
  ];

  function createData(id, name, price, category, description) {
    return { id, name, price, category, description };
  }

  const onDeleteBook = (id) => {
    setBooks(books.filter((x) => x.id !== id));
  };

  const onUpdateBook = (id) => {
    setUpdatePopupOpen(true);
    setSelectedRowId(id);
  };

  const handleUpdateClose = () => {
    setUpdatePopupOpen(false);
  };

  const onAddBook = () => {
    setAddPopupOpen(true);
  };

  const handleAddClose = () => {
    setAddPopupOpen(false);
  };

  const setUpdatedBooks = (updatedBook) => {
    let updatedBooks = books.map((book) => {
      if (book.id === updatedBook.id) {
        book.name = updatedBook.name;
        book.price = updatedBook.price;
        book.category = updatedBook.category;
        book.description = updatedBook.description;
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const setNewBook = (newBook) => {
    let length = books?.length;
    let id = (length && books[length - 1].id + 1) || 1;
    let newBookDetails = { id: id, ...newBook };
    books.push(newBookDetails);
  };

  return (
    <div>
      <Container sx={{ padding: "30px" }}>
        <Button variant="contained" onClick={() => onAddBook()}>
          + Add Book
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columnNames.map((column) => (
                  <TableCell
                    key={`columnname-${column.id}`}
                    data-testid={`columnname-${column.id}`}
                  >
                    <Typography variant="h6">{column.name}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onDeleteBook(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onUpdateBook(row.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  {row.id === selectedRowId && updatePopupOpen ? (
                    <Dialog open={updatePopupOpen} onClose={handleUpdateClose}>
                      <UpdateBook
                        id={row.id}
                        selectedBook={row}
                        handleClose={handleUpdateClose}
                        setUpdatedBooks={setUpdatedBooks}
                      />
                    </Dialog>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {addPopupOpen ? (
          <Dialog
            open={addPopupOpen}
            onClose={handleAddClose}
            slotProps={{
              backdrop: {
                style: { backgroundColor: "rgba(255,255,255,0.2)" },
              },
            }}
          >
            <AddBook handleClose={handleAddClose} setNewBook={setNewBook} />
          </Dialog>
        ) : null}
      </Container>
    </div>
  );
}
