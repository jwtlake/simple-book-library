// default config settings
export let config = {
	defaultShelfNumber: 8,
	defaultSlotNumber: 10,
	logPassiveOutput: true
}

/* Library Object */ 
export const Library = class Library {

	constructor(shelfNumb = config.defaultShelfNumber, slotNumb = config.defaultSlotNumber) {
		
		this.shelfs = [];
		this.maxShelf = (shelfNumb - 1);
		this.maxSlot = (slotNumb - 1);
		this.logPassiveOutput = config.logPassiveOutput;
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
		if(shelfNumb < 0 || shelfNumb > this.maxShelf) {
			if(this.logPassiveOutput)
				console.log(`Invalid shelf selection! Please choose a shelf number between 0 and ${this.maxShelf}`);
			return false; // return invalid
		}
		
		// check for valid slot selection
		if(slotNumb < 0 || slotNumb > this.maxSlot) {
			if(this.logPassiveOutput)
				console.log(`Invalid slot selection! Please choose a slot number between 0 and ${this.maxSlot}`);
			return false; // return invalid
		}
		return true; // return valid
	}
	
	shelf(book,shelfNumb,slotNumb) {
		
		// verify location exists
		if(this._isValidSelection(shelfNumb,slotNumb)) {
			// try to place book at location
			const result = this.shelfs[shelfNumb]._putBook(book,slotNumb);
			if(result === true){
				if(this.logPassiveOutput) 
					console.log(`Book: ${book.name} added to shelf ${shelfNumb}, slot ${slotNumb}`)
				return true; // success: book added
			}else{
				if(this.logPassiveOutput) 
					console.log(`shelf ${shelfNumb}, slot ${slotNumb} already has book ${result.name}`)
				return result; // fail: return the 'blocking' book in requested slot
			}
		}else{
			return false; // fail: invalid request
		}
	}
	
	unshelf(shelfNumb,slotNumb) {

		// verify location exists
		if(this._isValidSelection(shelfNumb,slotNumb)) {
			
			// try retrieve book from location
			const requestedBook = this.shelfs[shelfNumb]._removeBook(slotNumb);
			if(requestedBook){
				if(this.logPassiveOutput) 
					console.log(`Book: ${requestedBook.name} removed from shelf ${shelfNumb}, slot ${slotNumb}`);
				return requestedBook; // success: return requested book
			}else{
				if(this.logPassiveOutput) 
					console.log(`shelf ${shelfNumb}, slot ${slotNumb} is empty`);
				return false; // fail: no book at location
			}
		}else{
			return false; // fail: invalid request
		}
	}

	getShelf() {
		return this.shelfs;
	}

	render() {
		// Note: Excluding if(this.logPassiveOutput) check in this case because this is an explicit request to print
		// header
		console.log(''); //extra space
		console.log('## Library');
		const slotHeaders = Array.apply(null, {length: (this.maxSlot + 1)}).map(Number.call, Number).join('  ');
		console.log(`SLOTS:   ${slotHeaders}`); //if numb of slots is over 10 the spacing will be off. There are some external cli logging libraries that have table objects that might be useful.
		
		// body
		for (let [index, selectedShelf] of this.shelfs.entries()) {
			const shelfContents = selectedShelf.getSlots().map(book => {
				if(book){return 'B';}
				else{return '_';}
			}).join('  ');
			console.log(`SHELF ${index}: ${shelfContents}`);
		}
		console.log(''); //extra space
	}
}

/* Shelf Object */ 
export const Shelf = class Shelf {
	
	constructor(slotNumb = config.defaultSlotNumber) {
		this.slots = [];
		this._createSlots(slotNumb);
	}

	_createSlots(slotNumb) {
		for(let i = 0; i < slotNumb; i++){
			this.slots.push(null);
		}
	}
		
	_putBook(book,slotNumb) {
		// make sure there isn't a book already at this location
		const notEmpty = this.slots[slotNumb];
		if(notEmpty){
			return notEmpty; // fail: return the book that is already in this location
		}else{
			this.slots[slotNumb] = book; // add book
			return true; // success: book added
		}
	}
	_removeBook(slotNumb) {
		// make sure there is a book at this location
		const requestedBook = this.slots[slotNumb];
		if(requestedBook instanceof Book) {
			this.slots[slotNumb] = null; // clear slot
			return requestedBook; // success: return requested book
		}else{
			return false; // fail: no book at that location
		}
	}

	getSlots() {
		return this.slots;
	}
}

/* Book Object */ 
export const Book = class Book {
	constructor(name = 'Unnamed Book') {
		this.name = name;
	}
}

// Support for require syntax
export default {
	Library: Library,
	Shelf: Shelf,
	Book: Book
}