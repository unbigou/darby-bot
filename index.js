require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require("./config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categoris = new Discord.Collection();

const fs = require("fs");

fs.readdirSync('./Bot_Commands/').forEach(
	local => 
	{
		if(fs.lstatSync(`./Bot_Commands/${local}`).isDirectory())
		{	
			const commands = fs.readdirSync(`./Bot_Commands/${local}`).filter(archieve => archieve.endsWith('.js'));
	
			for (let file of commands) 
			{
				let commandName = require(`./Bot_Commands/${local}/${file}`);
	
				if (commandName.name) 
				{
					client.commands.set(commandName.name, commandName)
				}
				if (commandName.aliases && Array.isArray(commandName.aliases)) 
				{
					commandName.aliases.forEach(x => client.aliases.set(x, commandName.name))
				}
			}
		}
		else if(fs.lstatSync(`./Bot_Commands/${local}`).isFile() && local.endsWith('.js'))
		{
			let commandName = require(`./Bot_Commands/${local}`);

			if (commandName.name) 
			{
				client.commands.set(commandName.name, commandName)
			}
			if (commandName.aliases && Array.isArray(commandName.aliases)) 
			{
				commandName.aliases.forEach(x => client.aliases.set(x, commandName.name))
			}
		}
	}
);


client.once(
	"ready", () => 
	{
		console.log(`Logged in as ${client.user.tag}!`)
	}
)


client.on(
	"messageCreate", async (message) => 
	{
		if( !message.content.startsWith(config.prefix) || message.author.bot) return;
		
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		
		let cmd = args.shift().toLowerCase();
		
		if(cmd.length === 0) return;
		
		let command = client.commands.get(cmd);
		
		if( !command ) 
		{
			command = client.commands.get(client.aliases.get(cmd));
		}

		try 
		{
			command.run(client, message, args)
		}
		catch (error) 
		{
			console.error("Error: " + error);
		}
	}
)
  

client.login(process.env.TOKEN);