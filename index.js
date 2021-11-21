const Discord = require('discord.js');
const CronJob = require('cron').CronJob;



const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
                            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const roleId = "773271217540825120";

client.once('ready', () => {

    var job = new CronJob('0 23 * * 1', function() {
        let calendarChannel = client.channels.cache.get("904816762271461426");
        let date = new Date;
    
        calendarChannel.bulkDelete(3)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
    
        calendarChannel.send("<@&"+roleId+"> Raid de **mercredi** :").then(function(message) {
            message.react("✅")
            message.react("❎")
        });    
        calendarChannel.send("<@&"+roleId+"> Raid de **dimanche** :").then(function(message) {
            message.react("✅")
            message.react("❎")
        });  
        calendarChannel.send("<@&"+roleId+"> Raid de **lundi** :").then(function(message) {
            message.react("✅")
            message.react("❎")
        });       
    	}, null, true, 'Europe/Paris');
      	job.start();
        
    

});

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    if (reaction.message.content.includes('mercredi')){
        console.log(reaction.message.author.username, reaction.emoji.name);
    }
    else if(reaction.message.content.includes('dimanche')){
        console.log(reaction.message.author.username, reaction.emoji.name);
    }
    else if (reaction.message.content.includes('lundi')){
        console.log(reaction.message.author.username, reaction.emoji.name);
    }
	// // Now the message has been cached and is fully available
	// console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// // The reaction is now also fully available and the properties will be reflected accurately:
	// console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

function getNextDayOfWeek(date, dayOfWeek) {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)

    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    console.log(resultDate.getFullYear());

    return format(resultDate.getDate(),resultDate.getMonth(),resultDate.getFullYear());
}

function format(day,month,year){
    return day+ "/"+month+"/"+year;
}
client.login(process.env.TOKEN);

