// es6 imports also supported 
//import { Library, Book } from './lib/simple-book-library.js';

var simple = require('./lib/simple-book-library.js');

// create new library (numbOfShelves, numbOfSlots)
var MyLibary = new simple.Library(10,5);

// if you want to dissable passive console.logs on libary actions
//MyLibary.logPassiveOutput = false; 

//output libary
MyLibary.render();

// create a books (name)
var book1 = new simple.Book('A Game of Thrones');
var book2 = new simple.Book('A Clash of Kings');
var book3 = new simple.Book('A Storm of Swords');

//put the books in the libary (Book, shelfNumb, rowNumber)
MyLibary.shelf(book1,11,1) // out of bounds
MyLibary.shelf(book1,1,5) // out of bounds
MyLibary.shelf(book1,1,4); // valid
MyLibary.shelf(book2,2,1); // valid
MyLibary.shelf(book3,1,4); // occupied

//move book
var bookInHand = MyLibary.unshelf(1,4);
MyLibary.shelf(bookInHand,2,4);

//try again
MyLibary.shelf(book3,1,4); // valid

//output libary
MyLibary.render();
