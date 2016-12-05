function PokerHand(cards) {
	this.cards = cards instanceof Array ? cards : [];
}

PokerHand.prototype.deal = function (card, index) {

	if (index !== undefined &&
		index !== null &&
		index > -1 &&
		index < this.cards.length) {
			this.cards.splice(index, 1, card);
	}
	else {
		this.cards.push(card);
	}
};

PokerHand.prototype.evaluate = function () {

	let values = this.getValues();
	let groups = this.groupValues(values);

	if (this.isRoyalFlush(values)) {
		return 8;
	}
	else if (this.isStraightFlush(values)) {
		return 7;
	}
	else if (this.hasFourOfAKind(groups)) {
		return 6;
	}
	else if (this.isFullHouse(groups)) {
		return 5;
	}
	else if (this.isFlush()) {
		return 4;
	}
	else if (this.isStraight(values)) {
		return 3;
	}
	else if (this.hasThreeOfAKind(groups)) {
		return 2;
	}
	else if (this.hasTwoPairs(groups)) {
		return 1;
	}
	else if (this.isJacksOrBetter(groups)) {
		return 0;
	}
	else {
		return -1;
	}
};

PokerHand.prototype.isRoyalFlush = function (values) {
	return this.isStraightFlush(values) && values[4] === 14;
};

PokerHand.prototype.isStraightFlush = function (values) {
	return this.isFlush() && this.isStraight(values);
};

PokerHand.prototype.hasFourOfAKind = function (groups) {
	return groups.some(function (group) {
		return group.length === 4;
	});
};

PokerHand.prototype.isFullHouse = function (groups) {
	return this.hasThreeOfAKind(groups) && this.hasPair(groups);
};

PokerHand.prototype.isFlush = function () {
	return this.isSingleSuite('H') ||
		this.isSingleSuite('D') ||
		this.isSingleSuite('C') ||
		this.isSingleSuite('S');
};

PokerHand.prototype.isStraight = function (values) {
  
	var uniqueVals = this.uniqueValues(values);
  
	if (uniqueVals.length < 5) {
		return false;
	}
  
	if (values[4] - values[0] === 4) {
		return true;
	}
  
	if (values.join(',') === '2,3,4,5,14') {
		return true;
	}
  
	return false;
};

PokerHand.prototype.hasThreeOfAKind = function (groups) {
	return groups.some(function (group) {
		return group.length === 3;
	});
};

PokerHand.prototype.hasTwoPairs = function (groups) {
	var pairs = 0;
  
	groups.forEach(function (group) {
		pairs += group.length === 2 ? 1 : 0;
	});
  
	return pairs > 1;
};

PokerHand.prototype.isJacksOrBetter = function(groups) {
  
  var isTrue = false;
  
  groups.forEach(function(group) {
    if(group[1] >= 11) isTrue = true;
  });
  
  return isTrue;
}

PokerHand.prototype.isSingleSuite = function (suit) {
	return this.cards.every(function (card) {
		return card.endsWith(suit);
	});
};

PokerHand.prototype.hasPair = function (groups) {
	return groups.some(function (group) {
		return group.length === 2;
	});
};

PokerHand.prototype.groupValues = function(values) {
  
  var groups = [];
  var uniqueVals = this.uniqueValues(values);
  
  uniqueVals.forEach(function(uniqueValue) {
    var group = values.filter(function(value) {
      return value === uniqueValue;
    });
    
    groups.push(group);
  });
  
  return groups;
}

PokerHand.prototype.uniqueValues = function(values) {
  var unique = [];
  var last = 0;
  
  values.forEach(function(value) {
    if(value !== last) {
      unique.push(value);
      last = value;
    }
  });
  
  return unique;
}

PokerHand.prototype.getValues = function () {
	return this.cards.map(this.getCardValue).sort(function (a, b) {
		return parseInt(a) - parseInt(b);
	});
}

PokerHand.prototype.getCardValue = function (card) {

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
