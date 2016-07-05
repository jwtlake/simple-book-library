// import { Library, Book } from './lib/simple-book-library.js';
var simple = require('./lib/simple-book-library.js');

var util = require('util');

//create new library (numbOfShelves, numbOfSlots)
var MyLibary = new simple.Library(10,5);

//create a books (name, haveRead)
var book1 = new simple.Book('How to javascript',true);
var book2 = new simple.Book('How to javascript while being watched',false);

//put the book in the libary (Book, shelfNumb, rowNumber)
MyLibary.shelf(book1,1,4);
MyLibary.shelf(book2,2,1);

//output full array
MyLibary.render();
console.log(util.inspect(MyLibary, {showHidden: false, depth: null}));