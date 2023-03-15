class Deck
{
    suits =
    [
        "Spades", "Hearts", "Diamonds", "Clubs"
    ]

    cards =
    [
        '4','5','6','7','Queen','Jack','King','Ace','2','3', 
    ]
	
    getCard() 
    {
		let card = this.cards[ Math.floor(Math.random() * this.cards.length) ];
		let suit = this.suits[ Math.floor(Math.random() * this.suits.length) ];	

		card = card + '-' + 'of' + '-' + suit; 
		
		return card;
    }
}

module.exports = Deck;