const STORAGE_ID = 'video-poker';

function Account() {
	this.balance = parseInt(localStorage.getItem(STORAGE_ID)) || 0;
}

Account.prototype.load = function (amount) {
	this.balance = amount;
	localStorage.setItem(STORAGE_ID, this.balance);
};

Account.prototype.update = function (amount) {
	this.balance += amount;
	localStorage.setItem(STORAGE_ID, this.balance);
};