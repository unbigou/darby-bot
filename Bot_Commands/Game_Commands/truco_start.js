const Discord = require("discord.js");
const GameDataBase = require("../../Game_Files/GameDataBase");
const Deck = require("../../Game_Files/TrucoDeck");


function getHand()
{
	const deck = new Deck();
	let cardsAlreadyTaken = [];
	let playerHand = '';

	for(let j = 0; j < 3; j++)
	{
		let card = deck.getCard();
		
		while(cardsAlreadyTaken.includes(card))
		{
			card = deck.getCard();
		}
		
		cardsAlreadyTaken.push(card);
		playerHand.concat('|', card);
	}
	
	return playerHand;
}


module.exports =
{
	name: "start", 
	aliases: ["go"], 

	run: async (_, message) => 
	{
		let dataBase = new GameDataBase();
		let players = await dataBase.getPlayers(message);
		let botMessage;

		console.log("players:", players);
		if(1 < 1)
		{
			botMessage = "Número de jogadores insulficiente.";
		}
		else
		{
			let playerHand;
			let playerKeyValue;
			
			for(let i = 0; i < 1; i++)
			{
				playerHand = getHand();
				playerKeyValue = await dataBase.getPlayer(players[i]);

				console.log("playerKeyValue:", playerKeyValue)
				playerKeyValue.concat(playerHand, '$');
				await dataBase.set(players[i], playerKeyValue);
			}
			botMessage = "A partida seré iniciada logo. Os jogadores podem ver suas cartas com *?hand*."
		}
		
		let embed = new Discord.EmbedBuilder().setDescription(botMessage);

        message.reply( { embeds: [embed] } )
	}
}