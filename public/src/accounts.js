function findAccountById(accounts, id) {
  //return the account object that the matches ID given
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  //returns the account object in order sorted by last name
  return accounts.sort((account1, account2) =>
    account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  //loop through book list to see if the account has checked out the each book, then add up the total of all borrows
  const id = account.id;
  return books.reduce((totalBorrows, { borrows }) => {
    if (borrows.some((history) => history.id === id)) {
      totalBorrows++;
    }
    return totalBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //filter method to locate books that are not yet been returned and its borrower
  const BooksNotReturned = books.filter(
    (book) =>
      book.borrows[0].id === account.id && book.borrows[0].returned === false
  );
  //map method to create a new list of above list by adding author name to the object by using author id
  const showNotReturnedList = BooksNotReturned.map((book) => {
    book["author"] = authors.find((author) => author.id === book.authorId);
    return book;
  });
  
  return showNotReturnedList;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
