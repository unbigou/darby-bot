const Discord = require("discord.js");
const GameDataBase = require("../../Game_Files/GameDataBase");

module.exports =
{
	name: "hand", 
	aliases: ["h"], 
	
	run: async (_, message) => 
	{
		const Database = new GameDataBase();
		const player = Database.getPlayer(message.author.id);

		let index = player.indexOf('$');
		let playerHand = player.substring(index, index + 1);

		message.author.send(playerHand);
	}
}