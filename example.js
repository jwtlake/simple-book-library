// import { Library, Book } from './lib/simple-book-library.js';
var simple = require('./lib/simple-book-library.js');

var util = require('util');

//create new library (numbOfShelves, numbOfSlots)
var MyLibary = new simple.Library(10,5);

//create a books (name)
var book1 = new simple.Book('How to javascript');
var book2 = new simple.Book('How to javascript while being watched');
var book3 = new simple.Book('Another Book');

//put the book in the libary (Book, shelfNumb, rowNumber)
MyLibary.shelf(book1,1,4);
MyLibary.shelf(book2,2,1);
MyLibary.shelf(book3,1,4);

// console.log(MyLibary.shelfs[1].getSlots());

const result = MyLibary.shelfs[1]._removeBook(4);
console.log(MyLibary.shelfs[1].slots[4])
console.log(result)

//output full array
// MyLibary.render();
// console.log(util.inspect(MyLibary, {showHidden: false, depth: null}));