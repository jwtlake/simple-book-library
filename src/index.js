/* Library Object */ 
export const Library = class Library {
	constructor(shelfNumb, slotNumb) {
		this.shelfs = [];
		this._makeShelfs(shelfNumb);
	}
	_makeShelfs(number){
		for(var i = 0; i < number; i++){
			var newShelf = new Shelf();
			this.shelfs.push(newShelf);
		}
	}
	shelf(book,shelfNumb,slotNumb){
	 var selectedShelf = this.shelfs[shelfNumb];
	 return selectedShelf._putBook(book,slotNumb);
	}
	unshelf(shelfNumb,slotNumb){
		return this.shelfs[shelf]._removeBook(slotNumb);
	}

}

/* Shelf Object */ 
export const Shelf = class Shelf {
	
	constructor() {
		this.slots = [];
	}
  		
	_putBook(book,slotNumb){
		//check if slot full
		var bookCheck = this.slots[slotNumb];
		if(bookCheck){
			return book; //give back book.. maybe dont need this.
		}else{
			this.slots[slotNumb] = book;
			return //success
		}
	}
	_removeBook(slotNumb){
		return this.slots[slotNumb];
	}
}

/* Book Object */ 
export const Book = class Book {
	constructor(name,haveRead) {
    this.name = name;
    this.haveRead = haveRead;
  }
}

/* Librarian Object */
export const Librarian = class Librarian {
  constructor() {
  }
  sort(){
    //categorize
    //alphabetize
  }
  lookup(bookName){

  }
}

export default {
  Library: Library,
  Shelf: Shelf,
  Book: Book,
  Librarian: Librarian
}