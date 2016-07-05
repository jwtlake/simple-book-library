/* Library Object */ 
export const Library = class Library {

	constructor(shelfNumb = 8, slotNumb = 10) {
		this.shelfs = [];
		this.maxShelf = (this.shelfNumb - 1);
		this.maxSlot = (this.slotNumb - 1);
		this._createShelfs(shelfNumb, slotNumb);
	}
	
	_createShelfs(shelfNumb, slotNumb) {
		// create shelfs
		for(var i = 0; i < shelfNumb; i++) {
			var newShelf = new Shelf(slotNumb);
			this.shelfs.push(newShelf);
		}
	}

	_isValidSelection(shelfNumb,slotNumb) {
		
		// check for valid shelf selection
		if(shelfNumb <= 0 || shelfNumb > this.maxShelf){
			console.log(`Invalid shelf selection! Please choose a shelf number between 0 and ${this.maxShelf}`);
			return false;
		}
		
		// check for valid slot selection
		if(slotNumb <= 0 || slotNumb > this.maxSlot){
			console.log(`Invalid slot selection! Please choose a slot number between 0 and ${this.maxSlot}`);
			return false;
		}
		// return valid
		return true;
	}
	
	shelf(book,shelfNumb,slotNumb) {
		if(this._isValidSelection) {
	 		return this.shelfs[shelfNumb]._putBook(book,slotNumb);
		}else{
			return false;
		}
	}
	
	unshelf(shelfNumb,slotNumb) {
		if(this._isValidSelection) {
	 		return this.shelfs[shelfNumb]._removeBook(slotNumb);
		}else{
			return false;
		}
	}

	getShelf() {
		return this.shelfs;
	}

	render() {
		// header
		console.log('## Library');
		console.log();
		const slotHeaders = Array.apply(null, {length: this.maxSlot}).map(Number.call, Number).join(' ');
		console.log(`SLOTS:    ${slotHeaders}`);
		
		// body
		for (let [index, selectedShelf] of this.shelfs.entries()) {
			const shelfContents = selectedShelf.getSlots().map(book => {
				if(book){return 'B';}
				else{return '_';}
			}).join('  ');
			console.log(`SHELF ${index}: ${shelfContents}`);
		}
	}
}

/* Shelf Object */ 
export const Shelf = class Shelf {
	
	constructor(slotNumb) {
		this.slots = [];
		this._createSlots(slotNumb);
	}

	_createSlots(slotNumb) {
		for(let i = 0; i < slotNumb; i++){
			this.slots.push(null);
		}
	}
  		
	_putBook(book,slotNumb) {
		//check if slot full
		const isBook = this.slots[slotNumb];
		if(!isBook){
			return false;
		}else{
			this.slots[slotNumb] = book;
			return true;
		}
	}
	_removeBook(slotNumb) {
		const bookToRemove = this.slots[slotNumb];
		if(!bookToRemove){
			console.log('There is no book at this location.');
			return false;
		}else{
			this.slots[slotNumb] = null;
			return bookToRemove
		}
	}

	getSlots() {
		return this.slots;
	}
}

/* Book Object */ 
export const Book = class Book {
	constructor(name,haveRead) {
    this.name = name;
    this.haveRead = haveRead;
  }
}

export default {
  Library: Library,
  Shelf: Shelf,
  Book: Book
}