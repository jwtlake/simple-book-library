import {Library, Book, Librarian} from './index.js'
var util = require('util');

//create new library (numbOfShelves, numbOfSlots)
var MyLibary = new Library(10,5);

//create a books (name, haveRead)
var book1 = new Book('How to javascript',true);
var book2 = new Book('How to javascript while being watched',false);

//put the book in the libary (Book, shelfNumb, rowNumber)
MyLibary.shelf(book1,1,5);
MyLibary.shelf(book2,2,1);

//output full array
console.log(util.inspect(MyLibary, {showHidden: false, depth: null}));