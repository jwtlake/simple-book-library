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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* Library Object */
	var Library = exports.Library = function () {
		function Library(shelfNumb, slotNumb) {
			_classCallCheck(this, Library);
	
			this.shelfs = [];
			this._makeShelfs(shelfNumb);
		}
	
		_createClass(Library, [{
			key: "_makeShelfs",
			value: function _makeShelfs(number) {
				for (var i = 0; i < number; i++) {
					var newShelf = new Shelf();
					this.shelfs.push(newShelf);
				}
			}
		}, {
			key: "shelf",
			value: function shelf(book, shelfNumb, slotNumb) {
				var selectedShelf = this.shelfs[shelfNumb];
				return selectedShelf._putBook(book, slotNumb);
			}
		}, {
			key: "unshelf",
			value: function unshelf(shelfNumb, slotNumb) {
				return this.shelfs[shelf]._removeBook(slotNumb);
			}
		}]);
	
		return Library;
	}();
	
	/* Shelf Object */
	var Shelf = exports.Shelf = function () {
		function Shelf() {
			_classCallCheck(this, Shelf);
	
			this.slots = [];
		}
	
		_createClass(Shelf, [{
			key: "_putBook",
			value: function _putBook(book, slotNumb) {
				//check if slot full
				var bookCheck = this.slots[slotNumb];
				if (bookCheck) {
					return book; //give back book.. maybe dont need this.
				} else {
					this.slots[slotNumb] = book;
					return; //success
				}
			}
		}, {
			key: "_removeBook",
			value: function _removeBook(slotNumb) {
				return this.slots[slotNumb];
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
	
	/* Librarian Object */
	var Librarian = exports.Librarian = function () {
		function Librarian() {
			_classCallCheck(this, Librarian);
		}
	
		_createClass(Librarian, [{
			key: "sort",
			value: function sort() {
				//categorize
				//alphabetize
			}
		}, {
			key: "lookup",
			value: function lookup(bookName) {}
		}]);
	
		return Librarian;
	}();
	
	exports.default = {
		Library: Library,
		Shelf: Shelf,
		Book: Book,
		Librarian: Librarian
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=simple-book-library.js.map