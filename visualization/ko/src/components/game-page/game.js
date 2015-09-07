define(["knockout", "text!./game.html"], function (ko, gameTemplate) {


	/**
	 * Generates 5 letters of alphabet at random
	 **/
	function shakeIt() {
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

		return values;
	}

	function GameViewModel(route) {
		this.message = ko.observable('Welcome!');
		this.letters = ko.observableArray();

		// add handler for "shake it" to button
		var btn = document.getElementById("shake-it");

		function shakeitWrapper() {
			var randomLetters = shakeIt();
			this.letters(randomLetters);

		}

		btn.addEventListener('click', shakeitWrapper.bind(this))

	}



	GameViewModel.prototype.shakeIt = function () {
		this.message('You invoked doSomething() on the viewmodel.');
	};

	return {
		viewModel: GameViewModel,
		template: gameTemplate
	};

});