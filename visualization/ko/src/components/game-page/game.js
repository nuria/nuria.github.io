define(["knockout", "text!./game.html"], function (ko, gameTemplate) {

	"use strict";

	/**
	 * Model of our game
	 * Receives actions from View Model and translates
	 * those into game actions
	 **/
	function Game() {
		this.words = new Array();
		this.letters = new Array();
	}

	Game.prototype.shakeIt = function () {
		var values = new Array();
		var holder = new Int8Array(50);
		window.crypto.getRandomValues(holder);
		//now get those mode 26
		var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
			'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];


		for (var i = 0; i < holder.length; i++) {
			if (values.length == 5) break;
			var index = holder[i] % 25;
			if (index < 0) {
				index = index * (-1);
			}
			if (values.indexOf(alphabet[index]) < 0) {
				values.push(alphabet[index]);
			}
		}

		this.letters = values;
		return this.letters;
	}

	Game.prototype.getLetters = function () {
		return this.letters;
	};

	Game.prototype.getWords = function () {
		return this.words;
	}

	Game.prototype.addWord = function (word) {
		this.words.push(word);
	}

	Game.prototype.reset = function () {
		this.letters = null;
		this.words = null;
	}



	/**
	 * Game object. ViewModel.
	 * Receives user's UI actions and passes those to model
	 **/
	function GameViewModel(route) {
		this.game = new Game();
		this.letters = ko.observableArray();
		this.currentWord = ko.observable("");
		this.words = ko.observableArray();
		this.showGameBtn = ko.computed(function () {
			if (this.currentWord() != null && this.currentWord().length > 1) {
				return true;
			} else {
				return false;
			}
		}, this);
		this.showWordList = ko.computed(function () {
			return this.words().length > 0;
		}, this);

	}


	GameViewModel.prototype.shakeIt = function () {

		if (this.showGameBtn()) {
			//game has started it, reset it
			this.resetGame();
		}
		this.letters(this.game.shakeIt())


	};


	GameViewModel.prototype.resetGame = function () {
			this.game.reset();
			this.letters([]);
			this.words([]);
		}
		/**
		 * Shows word list if hidden
		 * Adds letter to current word and hides letter
		 * from available letters.
		 **/
	GameViewModel.prototype.addLetter = function (letter) {



		if (this.currentWord() !== null) {
			this.currentWord(this.currentWord() + letter);
		} else {
			this.currentWord(letter);
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
	 * Restore letters and cancel current word
	 *
	 **/
	GameViewModel.prototype.resetWord = function () {
		this.letters(this.game.getLetters());
		this.currentWord(null);

	}

	/**
	 * Restores letters and word holder
	 **/
	GameViewModel.prototype.addWord = function () {
		this.game.addWord(this.currentWord());
		this.words(this.game.getWords());
		this.currentWord(null);
		this.letters(this.game.getLetters());


	}

	return {
		viewModel: GameViewModel,
		template: gameTemplate
	};

});