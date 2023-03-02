function getTotalBooksCount(books) {
  //return total number of objects in the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //return total number of objects in the accounts array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //return total number of objects in the books array with is returned set to false
  return books.reduce((borrowed, { borrows }) => {
    if (!borrows[0].returned) {
      borrowed++;
    }
    return borrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreList = books.map((book) => book.genre);
  const genreObj = {};
  genreList.forEach((e) => (genreObj[e] = genreObj[e] ? genreObj[e] + 1 : 1));
  const genreCount = Object.keys(genreObj).map((e) => {
    return { name: e, count: genreObj[e] };
  });
  const sortedGenre = genreCount.sort((a, b) => (a.count > b.count ? -1 : 1));
  const topFive = sortedGenre.slice(0, 5);

  return topFive;
}

function getMostPopularBooks(books) {
  const titleList = books.map((book) => book.title);
  const borrowCount = books.map((book) => book.borrows.length);
  const borrowedRanking = Object.keys(titleList).map((e) => {
    return { name: titleList[e], count: borrowCount[e] };
  });
  const sortedRanking = borrowedRanking.sort((a, b) =>
    a.count > b.count ? -1 : 1
  );
  const topRanking = sortedRanking.slice(0, 5);

  return topRanking;
}

function getMostPopularAuthors(books, authors) {
  const idList = books.map((book) => book.authorId);
  const borrowCount = books.map((book) => book.borrows.length);
  const authorList = Object.keys(idList).map((e) => {
    return { id: idList[e], count: borrowCount[e] };
  });

  const sortedList = authorList.reduce((entry, { id, count }) => {
    entry[id] = { id, count: (entry[id] ? entry[id].count : 0) + count };
    return entry;
  }, []);

  const sortedByCount = sortedList
    .sort((a, b) => (a.count > b.count ? -1 : 1))
    .slice(0, 5);

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
