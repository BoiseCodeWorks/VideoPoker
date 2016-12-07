var fs = require('fs');
var vm = require('vm');
var Chai = require('chai');
var expect = Chai.expect;

var storage = require('mock-local-storage');
var code = fs.readFileSync('./account.js');
var STORAGE_ID = 'video-poker';

vm.runInThisContext(code);

describe('Account Object', function () {
	
	beforeEach(function () {
		localStorage.removeItem(STORAGE_ID);
	});

	it('Can be created.', function () {

		var account = new Account();

		expect(account).to.exist;
	});

	it('Defaults to a zero balance.', function () {

		var account = new Account();

		expect(account.balance).to.equal(0);
	});
});
