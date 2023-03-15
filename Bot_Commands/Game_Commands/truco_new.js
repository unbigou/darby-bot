const Discord = require("discord.js");
const GameDataBase = require("../../Game_Files/GameDataBase");

module.exports =
{
	name: "new", 
	aliases: ["n"], 
	
	run: async (_, message) => 
	{
		const Game = new GameDataBase();		
		let botMessage;
		let gameStatus = await Game.createNewMatch(message);
		
		if(gameStatus)
		{
			botMessage = "Jogo de " + message.author.username + " criada.";
			let mentions = message.mentions.users;
			if(mentions.length)
			{
				botMessage += "Com " + message.mentions.users + "."
			}
		}
		else botMessage = "Não foi possivel a criação. Algum jogador já está em jogo.";
		
		let embed = new Discord.EmbedBuilder().setDescription(botMessage);
		message.reply({ embeds: [embed] })
	}
}