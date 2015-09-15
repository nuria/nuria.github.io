define(["knockout", "text!./game.html"], function (ko, gameTemplate) {

	"use strict";
	/**
	 * Generates 5 letters of alphabet at random
	 **/
	function _shakeIt() {

	}

	function GameViewModel(route) {
		this.message = ko.observable('Welcome!');
		this.letters = ko.observableArray();
		this.showGameBtn = ko.observable(false);
		this.showWordList = ko.observable(false);
		this.words = ko.observableArray();
		this.word = null;

		var self = this;

	}



	GameViewModel.prototype.shakeIt = function () {
		console.log("clicked");
		var values = new Array();
		var holder = new Int8Array(5);
		window.crypto.getRandomValues(holder);
		//now get those mode 26
		var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
			'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
		for (var i = 0; i < holder.length; i++) {
			var index = holder[i] % 25;
			if (index < 0) {
				index = index * (-1);
			}
			values.push(alphabet[index])

		}

		this.letters(values);
		this.showGameBtn(true);
	};


	/**
	Adds letter to current word.
	Hides letter, if current word does not exists
	yet it creates a new word
	**/
	GameViewModel.prototype.addLetter = function (letter) {
		if (this.word !== null) {
			this.word = this.word + letter;
		} else {
			this.word = letter;
		}
		//remove from letters array
		var lettersTmp = this.letters();
		var newLetters = new Array();
		for (let l of lettersTmp) {
			if (!(l === letter)) {
				newLetters.push(l);
			}
		}

		this.letters(newLetters);
	}

	/**
	 **/
	GameViewModel.prototype.addWordToLIst = function () {

	}

	return {
		viewModel: GameViewModel,
		template: gameTemplate
	};

});