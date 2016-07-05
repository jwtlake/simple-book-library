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
	
	/* Library Object */
	var Library = exports.Library = function () {
		function Library() {
			var shelfNumb = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];
			var slotNumb = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
	
			_classCallCheck(this, Library);
	
			this.shelfs = [];
			this.maxShelf = this.shelfNumb - 1;
			this.maxSlot = this.slotNumb - 1;
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
				if (shelfNumb <= 0 || shelfNumb > this.maxShelf) {
					console.log('Invalid shelf selection! Please choose a shelf number between 0 and ' + this.maxShelf);
					return false;
				}
	
				// check for valid slot selection
				if (slotNumb <= 0 || slotNumb > this.maxSlot) {
					console.log('Invalid slot selection! Please choose a slot number between 0 and ' + this.maxSlot);
					return false;
				}
				// return valid
				return true;
			}
		}, {
			key: 'shelf',
			value: function shelf(book, shelfNumb, slotNumb) {
				if (this._isValidSelection) {
					return this.shelfs[shelfNumb]._putBook(book, slotNumb);
				} else {
					return false;
				}
			}
		}, {
			key: 'unshelf',
			value: function unshelf(shelfNumb, slotNumb) {
				if (this._isValidSelection) {
					return this.shelfs[shelfNumb]._removeBook(slotNumb);
				} else {
					return false;
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
				// header
				console.log('## Library');
				console.log();
				var slotHeaders = Array.apply(null, { length: this.maxSlot }).map(Number.call, Number).join(' ');
				console.log('SLOTS:    ' + slotHeaders);
	
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
			}
		}]);
	
		return Library;
	}();
	
	/* Shelf Object */
	var Shelf = exports.Shelf = function () {
		function Shelf(slotNumb) {
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
				//check if slot full
				var isBook = this.slots[slotNumb];
				if (!isBook) {
					return false;
				} else {
					this.slots[slotNumb] = book;
					return true;
				}
			}
		}, {
			key: '_removeBook',
			value: function _removeBook(slotNumb) {
				var bookToRemove = this.slots[slotNumb];
				if (!bookToRemove) {
					console.log('There is no book at this location.');
					return false;
				} else {
					this.slots[slotNumb] = null;
					return bookToRemove;
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
	var Book = exports.Book = function Book(name, haveRead) {
		_classCallCheck(this, Book);
	
		this.name = name;
		this.haveRead = haveRead;
	};
	
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