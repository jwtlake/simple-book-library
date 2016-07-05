import { expect } from 'chai';
import { Library, Shelf, Book, config} from '../lib/simple-book-library.js';

describe('A Library', () => {
	
	describe('has shelfs', () => {
		
		it('which is an array', () => {
			const libraryHasShelfs = new Library();
			const isArray = Array.isArray(libraryHasShelfs.shelfs);

			expect(isArray).to.equal(true);
		});

		it('and is created with described length', () => {
			const libraryWith10_6 = new Library(10,6);
			const libraryWith12_10 = new Library(12,10);
		
			expect(libraryWith10_6.shelfs.length).to.equal(10);
			expect(libraryWith12_10.shelfs.length).to.equal(12);
		});

		it('and is created with default length if no value is provided', () => {
			const myLibrary = new Library();
			const expectedShelves = config.defaultShelfNumber;
			const expectedSlots = config.defaultSlotNumber;
		
			expect(myLibrary.shelfs.length).to.equal(expectedShelves);
			expect(myLibrary.shelfs[0].slots.length).to.equal(expectedSlots);
		});
	});

	// shelf(book,shelfNumb,slotNumb)
	describe('can shelf books', () => {
		it('and will return true when successful', () => {
			const myLibrary = new Library(5,5);
			const book1 = new Book('Book 1');
			const addBookOutcome = myLibrary.shelf(book1,0,0);

			expect(addBookOutcome).to.equal(true);
			expect(myLibrary.shelfs[0].slots[0]).to.be.deep.eql(book1);
		});

		it('and will return the current slot\'s book if the slot is already occupied', () => {
			const myLibrary = new Library(5,5);
			const book1 = new Book('Book 1');
			const book2 = new Book('Book 2');

			const addBookOutcomeFirst = myLibrary.shelf(book1,0,0);
			const addBookOutcomeSecond = myLibrary.shelf(book2,0,0);

			expect(addBookOutcomeSecond).to.be.deep.eql(book1);
			expect(myLibrary.shelfs[0].slots[0]).to.be.deep.eql(book1);
		});
	});

	// unshelf(shelfNumb,slotNumb)
	describe('can unshelf books', () => {
		it('and will return the selected book when successful', () => {
			const myLibrary = new Library(5,5);
			const book1 = new Book('Book 1');
			myLibrary.shelf(book1,0,0);

			const removeOutcome = myLibrary.unshelf(0,0);

			expect(removeOutcome).to.be.deep.eql(book1);
			expect(myLibrary.shelfs[0].slots[0]).to.eql(null);
		});

		it('and will return false when the slot is empty', () => {
			const myLibrary = new Library(5,5);
			const removeOutcome = myLibrary.unshelf(0,0);

			expect(removeOutcome).to.eql(false);
		});
	});
	
	describe('can validate user actions', () => {

		it('with maxShelf and maxSlot properties', () => {
			const myLibrary = new Library(5,10);

			expect(4).to.eql(myLibrary.maxShelf);
			expect(9).to.eql(myLibrary.maxSlot);

		});

		// _isValidSelection(shelfNumb,slotNumb)
		it('and won\'t allow users to shelf or unshelf to a nonexistent location', () => {
			const myLibrary = new Library(5,10);

			//check for valid
			expect(myLibrary._isValidSelection(0,0)).to.eql(true);
			expect(myLibrary._isValidSelection(4,6)).to.eql(true); 
			
			//check for negatives out of bounds
			expect(myLibrary._isValidSelection(-1,0)).to.eql(false);
			expect(myLibrary._isValidSelection(0,-1)).to.eql(false);
			expect(myLibrary._isValidSelection(-1,-1)).to.eql(false);
			
			//check for positive out of bounds
			expect(myLibrary._isValidSelection(6,0)).to.eql(false);
			expect(myLibrary._isValidSelection(0,11)).to.eql(false);
			expect(myLibrary._isValidSelection(6,11)).to.eql(false);
		});

		//should add another test that actualy tests this function indirectly through shelf/unshelf
	});

});