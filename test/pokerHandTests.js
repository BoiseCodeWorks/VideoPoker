var fs = require('fs');
var vm = require('vm');
var Chai = require('chai');
var expect = Chai.expect;

var code = fs.readFileSync('./pokerHand.js');

vm.runInThisContext(code);

describe('PokerHand Object', function () {
	
	it('Can be created without a hand.', function () {

		var hand = new PokerHand();

		expect(hand).to.exist;
		expect(hand.cards).to.be.empty;
	});

	it('Can be created with a full hand.', function () {
		
		var hand = new PokerHand(['2H', '3H', '4H', '5H', '6H']);

		expect(hand).to.exist;
		expect(hand.cards).to.not.be.empty;
		expect(hand.cards.length).to.equal(5);
	});

	it('Can be created with a partial hand.', function () {
		
		var hand = new PokerHand(['2H', '3H', '4H']);

		expect(hand).to.exist;
		expect(hand.cards).to.not.be.empty;
		expect(hand.cards.length).to.equal(3);
	});

	it('Can detect a pair of Jacks', function () {
		
		var hand = new PokerHand(['2H', '3H', '4H', 'JH', 'JC']);

		expect(hand.evaluate()).to.equal(0);
	});
});