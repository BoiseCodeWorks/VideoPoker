## Video Poker Instructions

---

#### User Interface

1. When the page loads:
	* Display the hand payout table.
	* Display the player account.
	* Display a Bet input box.
	* Display 5 card backs.
	* Display a Deal button.
2. The Deal button should be disabled until a bet value is entered.
3. After the hand is over, the Bet input should be empty and the Deal button should be disbled.

<br>

#### Game Loop

1. Set the player account to 1000.
2. The player enters a bet and clicks the Deal button.
	* The players account is reduced by the bet amount.
	* The deck is shuffled.
	* 5 cards are dealt to the players hand and displayed on the screen.
3. The player replaces unwanted cards.
	* Cards to keep are chosen by clicking each card.
	* The player clicks the Deal button.
	* Each card not marked is replaced by the next card from the deck.
4. The hand is evaluated.
	* The hand is evaluated using the functions listed below.
	* The player account is credited by multiplying the bet by the payouts specified below.
5. Return to step 2.

<br>

#### Needed Hand Evaluation Functions

isRoyalFlush(hand)
isStraightFlush(hand)
isFourOfAKind(hand)
isFullHouse(hand)
isFlush(hand)
isStraight(hand)
isThreeOfAKind(hand)
isTwoPair(hand)
isJacksOrBetter(hand)

<br>

#### Hand Payouts
Royal Flush - 800:1
Straight Flush - 50:1
4 of a Kind - 40:1
Full House - 10:1
Flush - 7:1
Straight - 5:1
3 of a Kind - 3:1
2 Pairs - 2:1
1 Pair Jacks or Better - 1:1 


