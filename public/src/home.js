function getTotalBooksCount(books) {
  //return total number of objects in the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //return total number of objects in the accounts array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //adding up each book's borrow count, excluding ones that are not returned
  return books.reduce((borrowed, { borrows }) => {
    if (!borrows[0].returned) {
      borrowed++;
    }
    return borrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  //create a new array for each book's genre
  const genreList = books.map((book) => book.genre);
  const genreObj = {};
  //adding all duplicate genres together with value of how many times it's been repeated
  genreList.forEach((e) => (genreObj[e] = genreObj[e] ? genreObj[e] + 1 : 1));
  //creating new array and adding in name key
  const genreCount = Object.keys(genreObj).map((e) => {
    return { name: e, count: genreObj[e] };
  });
  //sorting the array by highest count to lowest
  const sortedGenre = genreCount.sort((a, b) => (a.count > b.count ? -1 : 1));
  //keeping the first 5 items in the array
  const topFive = sortedGenre.slice(0, 5);

  return topFive;
}

function getMostPopularBooks(books) {
  //create array with all book's title
  const titleList = books.map((book) => book.title);
  //create array of how many times each book has been borrowed
  const borrowCount = books.map((book) => book.borrows.length);
  //create array by using the borrowCount and add in corresponding book title
  const borrowedRanking = Object.keys(titleList).map((e) => {
    return { name: titleList[e], count: borrowCount[e] };
  });
  //sorting the list by most borrowed to least
  const sortedRanking = borrowedRanking.sort((a, b) =>
    a.count > b.count ? -1 : 1
  );
  //keeping the top five items in array
  const topRanking = sortedRanking.slice(0, 5);

  return topRanking;
}

function getMostPopularAuthors(books, authors) {
  //creating array of author's ID
  const idList = books.map((book) => book.authorId);
  //creating array of book's borrow count
  const borrowCount = books.map((book) => book.borrows.length);
  //creating array with ID and borrow count above
  const authorList = Object.keys(idList).map((e) => {
    return { id: idList[e], count: borrowCount[e] };
  });
  //adding all counts of the same ID together
  const sortedList = authorList.reduce((entry, { id, count }) => {
    entry[id] = { id, count: (entry[id] ? entry[id].count : 0) + count };
    return entry;
  }, []);
  //sorting the above list by highest count to least, then keeping the first 5 items
  const sortedByCount = sortedList
    .sort((a, b) => (a.count > b.count ? -1 : 1))
    .slice(0, 5);
  //creating new array by replacing the ID with corresponding author name to match with count
  const finalList = sortedByCount.map((e) => {
    const match = Object.values(authors).find((el) => el.id === e.id);
    return { name: match.name.first + " " + match.name.last, count: e.count };
  });

  return finalList;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
