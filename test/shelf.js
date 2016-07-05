import { expect } from 'chai';
import { Shelf, Book, config } from '../lib/simple-book-library.js';

//disable class logging to keep test results clean
config.logPassiveOutput = false;

describe('A Shelf', () => {

	describe('has slots', () => {

		it('which is an array', () => {
			const shelfHasSlots = new Shelf();
			const isArray = Array.isArray(shelfHasSlots.slots);

			expect(isArray).to.equal(true);
		});

		it('and is created with described length', () => {
			const shelfWith6Slots = new Shelf(6);
			const shelfWith10Slots = new Shelf(10);
		
			expect(shelfWith6Slots.slots.length).to.equal(6);
			expect(shelfWith10Slots.slots.length).to.equal(10);
		});

		it('and is created with default length if no value is provided', () => {
			const mySelf = new Shelf();
			const expectedSlots = config.defaultSlotNumber;
		
			expect(mySelf.slots.length).to.equal(expectedSlots);
		});

		it('and has null values for individual empty slots ', () => {
			const emptyShelf = new Shelf(5);
			const expectedSlots = [ null, null, null, null, null ];
			expect(emptyShelf.slots).to.be.deep.eql(expectedSlots);
		});
	});

	//_putBook(Book,slotNumb)
	describe('can add books', () => {
		it('and will return true when successful', () => {
			const mySelf = new Shelf(5);
			const book1 = new Book('Book 1');
			const addBookOutcome = mySelf._putBook(book1,0);

			expect(addBookOutcome).to.equal(true);
			expect(mySelf.slots[0]).to.be.deep.eql(book1);
		});

		it('and will return the current slot\'s book if the slot is already occupied', () => {
			const mySelf = new Shelf(5);
			const book1 = new Book('Book 1');
			const book2 = new Book('Book 2');

			const addBookOutcomeFirst = mySelf._putBook(book1,0);
			const addBookOutcomeSecond = mySelf._putBook(book2,0);

			expect(addBookOutcomeSecond).to.be.deep.eql(book1);
			expect(mySelf.slots[0]).to.be.deep.eql(book1);
		});
	});

	//_removeBook(slotNumb)
	describe('can remove books', () => {
		it('and will return the selected book when successful', () => {
			const mySelf = new Shelf(5);
			const book1 = new Book('Book 1');
			mySelf._putBook(book1,0);

			const removeOutcome = mySelf._removeBook(0);

			expect(removeOutcome).to.be.deep.eql(book1);
			expect(mySelf.slots[0]).to.eql(null);
		});

		it('and will return false when the slot is empty', () => {
			const mySelf = new Shelf(5);
			const removeOutcome = mySelf._removeBook(0);

			expect(removeOutcome).to.eql(false);
		});
	});

	// getSlots()
	it('can return its contents', () => {
		const mySelf = new Shelf(5);
		
		const book1 = new Book('Book 1');
		const book2 = new Book('Book 2');
		
		mySelf._putBook(book1,0);
		mySelf._putBook(book2,4);

		const booksOnShelf = mySelf.getSlots();
		const expectedBooks = [ book1, null, null, null, book2 ];

		expect(booksOnShelf).to.be.deep.eql(expectedBooks);
	});
});