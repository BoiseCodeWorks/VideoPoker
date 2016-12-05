(function () {

	let betAmount = 0;
	let account = new Account();
	let firstClick = true;
	let deck = [];
	let hand = null;

	// let testHand = ['8S', '5S', '9H', '7S', '5H'];
	// let testEvaluator = new PokerHand(testHand);

	// testEvaluator.evaluate();

	let hands = [
		'Jacks Or Better',
		'2 Pair',
		'3 Of A Kind',
		'Straight',
		'Flush',
		'Full House',
		'Four Of A Kind',
		'Straight Flush',
		'Royal Flush'
	];

	let multiplier = [
		[1, 2, 3, 5, 7, 10, 40, 50, 100],
		[3, 6, 9, 15, 21, 30, 120, 150, 300],
		[5, 10, 15, 25, 35, 50, 200, 250, 500]
	];

	let balance = document.getElementById('balance');
	let bet = document.getElementById('bet');
	let deal = document.getElementById('deal');
	let replay = document.getElementById('replay');
	let handResult = document.getElementById('handResult');

	let cardImages = [];
	cardImages[0] = document.getElementById('card0');
	cardImages[1] = document.getElementById('card1');
	cardImages[2] = document.getElementById('card2');
	cardImages[3] = document.getElementById('card3');
	cardImages[4] = document.getElementById('card4');

	let saveLinks = [];
	saveLinks[0] = document.getElementById('saveCard0');
	saveLinks[1] = document.getElementById('saveCard1');
	saveLinks[2] = document.getElementById('saveCard2');
	saveLinks[3] = document.getElementById('saveCard3');
	saveLinks[4] = document.getElementById('saveCard4');

	deal.classList.add('disabled');
	deal.addEventListener('click', dealCards);
	replay.addEventListener('click', playAgain);
	bet.addEventListener('change', handleBetChange);

	saveLinks.forEach(function (link) {
		link.addEventListener('click', keepCard);
	});

	if (account.balance < 1) {
		account.load(1000);
	}	

	updateBalance(0);
	
	function handleBetChange(event) {

		betAmount = event.target.valueAsNumber;

		if (betAmount > 0 && betAmount <= account.balance) {
			deal.classList.remove('disabled');
		}
		else {
			deal.classList.add('disabled');
		}
	}

	function keepCard(event) {

		let image = event.target;

		if (image.classList.contains('hold')) {
			image.classList.remove('hold');
		}
		else {
			image.classList.add('hold');
		}
	}

	function dealCards() {

		if (deal.classList.contains('disabled')) {
			return;
		}

		if (firstClick) {
			firstClick = false;
			updateBalance(-betAmount);

			deck = getDeck();
			hand = new PokerHand();

			for (var i = 0; i < 5; i++) {
				let card = deck.shift();
				dealCard(card, i);
			}

			console.log('1st Deal: ', hand);
		}
		else {
			for (var i = 0; i < 5; i++) {
				if (!cardImages[i].classList.contains('hold')) {
					let card = deck.shift();
					dealCard(card, i);
				}
				else {
					cardImages[i].classList.remove('hold')
				}
			}

			console.log('2nd Deal: ', hand);

			deal.classList.add('disabled');
			
			let handValue = hand.evaluate();

			if (handValue > -1) {
				let tier = 0;

				if (betAmount >= 500) {
					tier = 2;
				}
				else if (betAmount >= 250) {
					tier = 1;
				}

				let winnings = multiplier[tier][handValue] * betAmount;
				
				showResult(hands[handValue] + '<br>You win ' + winnings + ' dollars!');
				updateBalance(winnings);
			}
			else {
				showResult('Try Again!');
			}
			
			replay.classList.remove('hidden');
		}
	}

	function playAgain() {

		if (bet.value > account.balance) {
			bet.value = account.balance;
		}		
			
		firstClick = true;

		showResult('');
			
		cardImages.forEach(function (img) {
			img.src = 'img/back.png';
		});

		replay.classList.add('hidden');

		if (bet.value > 0) {
			deal.classList.remove('disabled');
		}
	}	

	function dealCard(card, position) {
		hand.deal(card, position);
		cardImages[position].src = 'img/' + card + '.png';
	}

	function updateBalance(amount) {
		account.update(amount);
		balance.innerHTML = account.balance;
	}

	function showResult(message) {
		handResult.innerHTML = message;
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