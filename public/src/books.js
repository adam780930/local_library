function findAuthorById(authors, id) {
  //return the book objects that matches ID given
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  //return the book object that matches the book ID given
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //array of returned books
  const returned = books.filter((book) => book.borrows[0].returned);
  //array of not returned books
  const notReturned = books.filter ((book) => !book.borrows[0].returned);
  //putting the two arrays together
  return [notReturned, returned];
}

function getBorrowersForBook(book, accounts) {
 //destructure to get the borrows key to access the all borrow records for each book
 const { borrows } = book;
 //array to be returned at the end
 const borrowerList = [];
  //loop through borrows for each borrow of each book
  for (let e in borrows) {
    //looking for ID in the borrow list to match with the account's ID to find borrower
    const matchingBorrowerId = accounts.find((el) => el.id === borrows[e].id);
    //merging elements found to be returned for result
    borrowerList.push({ ...borrows[e], ...matchingBorrowerId });
  }
  //returning first 10 items of the array
  return borrowerList.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
