const Database = require("@replit/database");
const database = new Database();

class GameDataBase
{
	CurrentMatches = database;

	async isUserFree(users)
	{
		let currentMatchesList = await this.CurrentMatches.list();
		let userAvaliability = true;
		
		users.forEach(
			async user =>
			{
				if(currentMatchesList.includes("<@" + user + ">"))
				{				
					userAvaliability = false;
				}
			}
		);
		console.log("userAvaliability:", userAvaliability);
		return userAvaliability;
	}
	
	
	async createNewMatch(message) 
	{
		let usersInMessage = [];
		usersInMessage.push(`${message.author.id}`);
		message.mentions.users.forEach(
			user=>
			{
				usersInMessage.push(user.id);
			}
		);
		console.log("usuarios na mensagem:" + usersInMessage.length);

		let userAvaliability = await this.isUserFree(usersInMessage);
		if(!userAvaliability)
		{
			return false;
		}
		
		let matchKey = await this.createNewKey();
		for(let i = 0; i < usersInMessage.length; i++)
		{
			await this.CurrentMatches.set("<@" + usersInMessage[i] + ">", matchKey);
			console.log("userKey:", await this.CurrentMatches.get("<@" + usersInMessage[i] + ">"));
		}
		return true;	
	}

	
	async createNewKey()
	{
		let key = await this.CurrentMatches.list("<@");
		return key.length + "$";
	}

	/*
 		Function that returns the values from a key
 	*/
	async getPlayer(playerId)
	{
		return this.CurrentMatches.get("<@" + playerId + ">");
	}

	/*
 		Function that returns the key to a certain match based on the author
 	*/
	async getKey(message)
	{
		let playerDatabase = await this.CurrentMatches.get("<@" + message.author.id + ">");
		
		if(playerDatabase)
		{
			return false;
		}
		else
		{	
			let keyLengthIndex = playerDatabase.indexOf('$');
			let key = playerDatabase.substring(0, keyLengthIndex);

			return key
		}
	}

	/*
 		Function that returns an array of players in the same match as the author
 	*/
	async getPlayers(message)
	{
		let matchList = await this.CurrentMatches.list("<@");
		let matchKey = await this.getKey(message);
		let matchPlayers = [];

		matchList.forEach(
			async key =>
			{
				let keyValue = await this.CurrentMatches.get(key);		
				keyValue = keyValue.substring(0, keyValue.indexOf(`$`));

				if(keyValue == matchKey)
				{
					console.log("keyValue:" + keyValue);
					console.log("key:" + key);
					matchPlayers.push(key);
				}
			}
		)
		console.log("matchPlayers:", matchPlayers.length);
		return matchPlayers;
	}

// Developer Commands
	async deleteCurrentMatches( message )
	{
		if(message.author.id === `${process.env.ADMIN_ID}`)
		{
			this.CurrentMatches.empty();
			return `Deletamento concluido`;
		}
	}	
}

module.exports = GameDataBase;