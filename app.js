(function () {


	function getCardValue(card) {

		card = card.replace(/H|C|D|S/, '');
		
		switch (card) {
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '10':
				return parseInt(card);

			case 'J':
				return 11;
				
			case 'Q':
				return 12;
				
			case 'K':
				return 13;

			case 'A':
				return 14;
		}
	}

	function getDeck() {

		let deck = [
			'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
		];

		return shuffle(deck);		
	}

	function shuffle(array) {

		// Fisher–Yates Shuffle		
		// Source: https://bost.ocks.org/mike/shuffle/

		let m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

})();