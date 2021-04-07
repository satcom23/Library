function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      if(obj[key] === undefined) return hash; 
      return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
    }, {});
}

/**
 * Helper function to get the size of an object
 * 
 * @param {*} obj 
 */
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};





function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter(function(book){ 
    const [recent] = book.borrows;return !recent.returned; 
  }).length; 
}

function getMostCommonGenres(books) {
const genres = groupByKey(books, 'genre');
let results = [];
for (const key in genres) {
  results.push({
    name: key,
    count: Object.size(genres[key]),
  })
}
    return results.sort((genreA, genreB) => genreB.count - genreA.count).slice(0, 5);
//console.log(results);
}



function getMostPopularBooks(books) {
  const borrows = books.map(book => ({name: book.title, count: book.borrows.length}));
  //console.log(topFive(borrows))
 return topFive(borrows);
};
// Helper function
// Returns the top five items in the array
function topFive(array) {
  let result = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return result;
}


    // define sparseArr
    //for loop go through books
      //accumulate books for author ids
      //if sparseArr[author.id]=undefined then 0 + book borrows
        // else sparseArr[author.id] += book borrows
    // use mapfunction to go through authors and make correct object using the author name
    // using sparseArr to find the amount of books for that author
    function getMostPopularAuthors(books, authors) {
    let returnArr = [];
     authors.forEach(author => {
       returnArr.push({name: `${author.name.first} ${author.name.last}`, count : 0 , id: author.id})
     })
     
     books.forEach((book) => {
       let foundAuthor = returnArr.find((author) => {
         
         return author.id === book.authorId} );
       foundAuthor.count += book.borrows.length;
     })
   
   return returnArr.sort((authorA, authorB) => authorB.count - authorA.count).slice(0,5).map(({id, ...rest}) => rest)
   }
  

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
