(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("simple-book-library", [], factory);
	else if(typeof exports === 'object')
		exports["simple-book-library"] = factory();
	else
		root["simple-book-library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// default config settings
	var config = exports.config = {
		defaultShelfNumber: 8,
		defaultSlotNumber: 10,
		logPassiveOutput: true
	};
	
	/* Library Object */
	var Library = exports.Library = function () {
		function Library() {
			var shelfNumb = arguments.length <= 0 || arguments[0] === undefined ? config.defaultShelfNumber : arguments[0];
			var slotNumb = arguments.length <= 1 || arguments[1] === undefined ? config.defaultSlotNumber : arguments[1];
	
			_classCallCheck(this, Library);
	
			this.shelfs = [];
			this.maxShelf = shelfNumb - 1;
			this.maxSlot = slotNumb - 1;
			this.logPassiveOutput = config.logPassiveOutput;
			this._createShelfs(shelfNumb, slotNumb);
		}
	
		_createClass(Library, [{
			key: '_createShelfs',
			value: function _createShelfs(shelfNumb, slotNumb) {
	
				// create shelfs
				for (var i = 0; i < shelfNumb; i++) {
					var newShelf = new Shelf(slotNumb);
					this.shelfs.push(newShelf);
				}
			}
		}, {
			key: '_isValidSelection',
			value: function _isValidSelection(shelfNumb, slotNumb) {
	
				// check for valid shelf selection
				if (shelfNumb < 0 || shelfNumb > this.maxShelf) {
					if (this.logPassiveOutput) console.log('Invalid shelf selection! Please choose a shelf number between 0 and ' + this.maxShelf);
					return false; // return invalid
				}
	
				// check for valid slot selection
				if (slotNumb < 0 || slotNumb > this.maxSlot) {
					if (this.logPassiveOutput) console.log('Invalid slot selection! Please choose a slot number between 0 and ' + this.maxSlot);
					return false; // return invalid
				}
				return true; // return valid
			}
		}, {
			key: 'shelf',
			value: function shelf(book, shelfNumb, slotNumb) {
	
				// verify location exists
				if (this._isValidSelection(shelfNumb, slotNumb)) {
					// try to place book at location
					var result = this.shelfs[shelfNumb]._putBook(book, slotNumb);
					if (result === true) {
						if (this.logPassiveOutput) console.log('Book: ' + book.name + ' added to shelf ' + shelfNumb + ', slot ' + slotNumb);
						return true; // success: book added
					} else {
						if (this.logPassiveOutput) console.log('shelf ' + shelfNumb + ', slot ' + slotNumb + ' already has book ' + result.name);
						return result; // fail: return the 'blocking' book in requested slot
					}
				} else {
					return false; // fail: invalid request
				}
			}
		}, {
			key: 'unshelf',
			value: function unshelf(shelfNumb, slotNumb) {
	
				// verify location exists
				if (this._isValidSelection(shelfNumb, slotNumb)) {
	
					// try retrieve book from location
					var requestedBook = this.shelfs[shelfNumb]._removeBook(slotNumb);
					if (requestedBook) {
						if (this.logPassiveOutput) console.log('Book: ' + requestedBook.name + ' removed from shelf ' + shelfNumb + ', slot ' + slotNumb);
						return requestedBook; // success: return requested book
					} else {
						if (this.logPassiveOutput) console.log('shelf ' + shelfNumb + ', slot ' + slotNumb + ' is empty');
						return false; // fail: no book at location
					}
				} else {
					return false; // fail: invalid request
				}
			}
		}, {
			key: 'getShelf',
			value: function getShelf() {
				return this.shelfs;
			}
		}, {
			key: 'render',
			value: function render() {
				// Note: Excluding if(this.logPassiveOutput) check in this case because this is an explicit request to print
				// header
				console.log(''); //extra space
				console.log('## Library');
				var slotHeaders = Array.apply(null, { length: this.maxSlot + 1 }).map(Number.call, Number).join('  ');
				console.log('SLOTS:   ' + slotHeaders); //if numb of slots is over 10 the spacing will be off. There are some external cli logging libraries that have table objects that might be useful.
	
				// body
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.shelfs.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var index = _step$value[0];
						var selectedShelf = _step$value[1];
	
						var shelfContents = selectedShelf.getSlots().map(function (book) {
							if (book) {
								return 'B';
							} else {
								return '_';
							}
						}).join('  ');
						console.log('SHELF ' + index + ': ' + shelfContents);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				console.log(''); //extra space
			}
		}]);
	
		return Library;
	}();
	
	/* Shelf Object */
	var Shelf = exports.Shelf = function () {
		function Shelf() {
			var slotNumb = arguments.length <= 0 || arguments[0] === undefined ? config.defaultSlotNumber : arguments[0];
	
			_classCallCheck(this, Shelf);
	
			this.slots = [];
			this._createSlots(slotNumb);
		}
	
		_createClass(Shelf, [{
			key: '_createSlots',
			value: function _createSlots(slotNumb) {
				for (var i = 0; i < slotNumb; i++) {
					this.slots.push(null);
				}
			}
		}, {
			key: '_putBook',
			value: function _putBook(book, slotNumb) {
				// make sure there isn't a book already at this location
				var notEmpty = this.slots[slotNumb];
				if (notEmpty) {
					return notEmpty; // fail: return the book that is already in this location
				} else {
					this.slots[slotNumb] = book; // add book
					return true; // success: book added
				}
			}
		}, {
			key: '_removeBook',
			value: function _removeBook(slotNumb) {
				// make sure there is a book at this location
				var requestedBook = this.slots[slotNumb];
				if (requestedBook instanceof Book) {
					this.slots[slotNumb] = null; // clear slot
					return requestedBook; // success: return requested book
				} else {
					return false; // fail: no book at that location
				}
			}
		}, {
			key: 'getSlots',
			value: function getSlots() {
				return this.slots;
			}
		}]);
	
		return Shelf;
	}();
	
	/* Book Object */
	var Book = exports.Book = function Book() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? 'Unnamed Book' : arguments[0];
	
		_classCallCheck(this, Book);
	
		this.name = name;
	};
	
	// Support for require syntax
	exports.default = {
		Library: Library,
		Shelf: Shelf,
		Book: Book
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=simple-book-library.js.map