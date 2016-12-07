
function Account() {
	this.STORAGE_ID = 'video-poker';
	this.balance = parseInt(localStorage.getItem(this.STORAGE_ID)) || 0;
}

Account.prototype.load = function (amount) {
	this.balance = amount;
	localStorage.setItem(this.STORAGE_ID, this.balance);
};

Account.prototype.update = function (amount) {
	this.balance += amount;
	localStorage.setItem(this.STORAGE_ID, this.balance);
};