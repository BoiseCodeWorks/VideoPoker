var fs = require('fs');
var vm = require('vm');
var Chai = require('chai');
var expect = Chai.expect;

var code = fs.readFileSync('./pokerHand.js');

vm.runInThisContext(code);

describe('handEvaluator', function () {
	
	it('Should have a constructor', function () {

		var hand = new PokerHand();

		expect(hand).to.exist;
	});
})