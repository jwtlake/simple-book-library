import { expect } from 'chai';
import { Book, config } from '../lib/simple-book-library.js';

//disable class logging to keep test results clean
config.logPassiveOutput = false;

describe('A Book', () => {

	it('has a name.', () => {
		const bookWithName = new Book('A Book Name');
		expect(bookWithName.name).to.equal('A Book Name');
	});
	
	it('has a default name if none is provided.', () => {
		const noNameProvided = new Book();
		expect(noNameProvided.name).to.equal('Unnamed Book');
	});
});