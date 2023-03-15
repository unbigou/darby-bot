const Discord = require("discord.js");

module.exports = 
{
    name: "ping", //colocar nome
    aliases: ["p"], //colocar sinonimos

    run: async(client, message, args) => 
    {
        let embed = new Discord.EmbedBuilder()
        .setDescription(` ${message.author}, seu ping esta em: \`carregando...\`.`);

        let embed2 = new Discord.EmbedBuilder()
        .setDescription(`${message.author}, seu ping esta em: \`${client.ws.ping}\`.`);

        message.reply( { embeds: [embed] } ).then( msg =>
            {
                setTimeout(() => {msg.edit({ embeds: [embed2] } )}, 2000 )
            }
        )
    }
}