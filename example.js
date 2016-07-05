// es6 imports also supported 
//import { Library, Book } from './lib/simple-book-library.js';

var simple = require('./lib/simple-book-library.js');

// create new library (numbOfShelves, numbOfSlots)
var MyLibrary = new simple.Library(10,5);

// if you want to disable passive console.logs on library actions
//MyLibrary.logPassiveOutput = false; 

//output library
MyLibrary.render();

// create some books (name)
var book1 = new simple.Book('A Game of Thrones');
var book2 = new simple.Book('A Clash of Kings');
var book3 = new simple.Book('A Storm of Swords');

//put the books in the library (Book, shelfNumb, rowNumber)
MyLibrary.shelf(book1,11,1) // out of bounds
MyLibrary.shelf(book1,1,5) // out of bounds
MyLibrary.shelf(book1,1,4); // valid
MyLibrary.shelf(book2,2,1); // valid
MyLibrary.shelf(book3,1,4); // occupied

//move book
var bookInHand = MyLibrary.unshelf(1,4);
MyLibrary.shelf(bookInHand,2,4);

//try again
MyLibrary.shelf(book3,1,4); // valid

//output library
MyLibrary.render();

//Library.shelf() => returns:
//true -- If successful
//false -- If out of bounds request
//Book obj -- If book is present at location (existing 'blocking' book remains in place but is returned for reference)

//Library.unshelf() => returns:
//Book obj -- If successful (requested book is returned and the empty slot is replaced with a null value)
//false -- If out of bounds request
//false -- If no book is present)
