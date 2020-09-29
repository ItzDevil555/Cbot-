 const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');

const { badwords } = require("./data.json")

const { config } = require("dotenv");

const db = require("quick.db"); //WE WILL BE USING QUICK.DB

const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();
client.aliases = new Discord.Collection();

const prefix = '.';
//You can change the prefix if you like. It doesn't have to be !


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    client.user.setStatus(`ONLINE`)
  client.user.setActivity(`.help`)
});

//IS URL FUNCTION - START

function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}

//FINISH

//STOP
client.on("message", async message => {
  if (message.author.bot) return;  
  //START



  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    
    if(is_url(message.content) === true) {
      message.delete()
      return message.channel.send("You can not send link here :/")
    }
    
    
    
    
    
    let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
      
    }
    
    if(confirm) {
      message.delete()
      return message.channel.send("You are not allowed to send badwords here")
    }    
    
    
  }
  
  //END
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));



  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
});

//GONNA USE EVENT HERE

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }
     let data = await canva.welcome(member, { link: "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })
 
    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
  
  


  client.channels.cache.get(chx).send("🎉 👋 Welcome to our Server " + member.user.username, attachment);
});


client.on("message", message => {
  let user = message.author;
  db.add(`xp_${message.guild.id}_${user.id}`, 3);
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1);
  let messagefetch = db.fetch(
    `messages_${message.guild.id}_${message.author.id}`
  );
  let messages;
  if (messagefetch == 25) messages = 25;
  //Level 1
  else if (messagefetch == 65) messages = 65;
  // Level 2
  else if (messagefetch == 115) messages = 115;
  // Level 3
  else if (messagefetch == 200) messages = 200;
  // Level 4
  else if (messagefetch == 300) messages = 300;
  // Level 5
  else if (messagefetch == 375) messages = 375;
  //level 6
  else if (messagefetch == 500) messages = 500;
  // Level 7
  else if (messagefetch == 575) messages = 575;
  // Level 8
  else if (messagefetch == 700) messages = 700;
  // Level 9
  else if (messagefetch == 775) messages = 775;
  // Level 10
  else if (messagefetch == 1000) messages = 1000;
  // level 11
    else if (messagefetch == 1150) messages = 1150;
  // Level 12
  else if (messagefetch == 1250) messages = 1250;
  // Level 13
  else if (messagefetch == 1350) messages = 1350;
  // Level 14
  else if (messagefetch == 1500) messages = 1500;
  // Level 15
  else if (messagefetch == 1650) messages = 1650;
  // level 16
  else if (messagefetch == 1750) messages = 1750;
  // Level 17
  else if (messagefetch == 1900) messages = 1900;
  // Level 18
  else if (messagefetch == 2050) messages = 2050;
  // Level 19
  else if (messagefetch == 2250) messages = 2250;
  // Level 20
  else if (messagefetch == 2500) messages = 2500;
  // level 21
  // ADD MORE IF U WANT
  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    let levelfetch = db.fetch(
      `level_${message.guild.id}_${message.author.id}`
    );
    let levelembed = new Discord.MessageEmbed()
      .setDescription(
        `${message.author}, You have leveled up to level ${levelfetch}`
      )
      .setColor(`#66ff99`)
      .setAuthor(`${message.author.tag}`, message.author.avatarURL());
    message.channel.send(levelembed);
    let levelembed2 = new Discord.MessageEmbed()
      .setDescription(
        `<a:star:747477610170417283> ${message.author}, Leveled Up to Level ${levelfetch}`
      )
      .setColor(`#66ff99`)
      .setAuthor(`${message.author.tag}`, message.author.avatarURL());
    client.channels.cache.get(`${db.fetch(`levelchannel_${message.guild.id}`)}`).send(levelembed2);
  }
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})



client.login(token);