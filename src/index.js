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
			return false;
		}
		
		// check for valid slot selection
		if(slotNumb < 0 || slotNumb > this.maxSlot) {
			if(this.logPassiveOutput)
				console.log(`Invalid slot selection! Please choose a slot number between 0 and ${this.maxSlot}`);
			return false;
		}
		// return valid
		return true;
	}
	
	shelf(book,shelfNumb,slotNumb) {
		if(this._isValidSelection(shelfNumb,slotNumb)) {
			const result = this.shelfs[shelfNumb]._putBook(book,slotNumb);
			if(result === true){
				if(this.logPassiveOutput) 
					console.log(`Book: ${book.name} added to shelf ${shelfNumb}, slot ${slotNumb}`)
				return true;
			}else{
				if(this.logPassiveOutput) 
					console.log(`shelf ${shelfNumb}, slot ${slotNumb} already has book ${result.name}`)
				return result; //return book in current slot
			}
		}else{
			return false;
		}
	}
	
	unshelf(shelfNumb,slotNumb) {
		if(this._isValidSelection(shelfNumb,slotNumb)) {
			const requestedBook = this.shelfs[shelfNumb]._removeBook(slotNumb);
			if(requestedBook){
				if(this.logPassiveOutput) 
					console.log(`Book: ${requestedBook.name} removed from shelf ${shelfNumb}, slot ${slotNumb}`);
				return requestedBook;
			}else{
				if(this.logPassiveOutput) 
					console.log(`shelf ${shelfNumb}, slot ${slotNumb} is empty`);
				return false;
			}
		}else{
			return false;
		}
	}

	getShelf() {
		return this.shelfs;
	}

	render() {
		// Note: Excluding if(this.logPassiveOutput) check in this case because this is an explicit request
		// header
		console.log('## Library');
		const slotHeaders = Array.apply(null, {length: (this.maxSlot + 1)}).map(Number.call, Number).join('  ');
		console.log(`SLOTS:   ${slotHeaders}`);
		
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
		const notEmpty = this.slots[slotNumb];
		if(notEmpty){
			return notEmpty;
		}else{
			this.slots[slotNumb] = book;
			return true;
		}
	}
	_removeBook(slotNumb) {
		const requestedBook = this.slots[slotNumb];
		if(requestedBook instanceof Book) {
			this.slots[slotNumb] = null; // clear slot
			return requestedBook;
		}else{
			return false;
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

// Suport for require syntax
export default {
	Library: Library,
	Shelf: Shelf,
	Book: Book
}