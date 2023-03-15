const Discord = require("discord.js");
const GameDataBase = require("../../Game_Files/GameDataBase");

module.exports =
{
	name: "delete", 
	aliases: ["del"], 

	run: async (_, message) => 
	{
		const game = new GameDataBase();
		let embed = new Discord.EmbedBuilder()
			.setDescription(await game.deleteCurrentMatches( message ));

		message.reply({ embeds: [embed] })
	}
}