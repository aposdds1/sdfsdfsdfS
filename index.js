// Express
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express App!')
});

app.listen(80, () => {
    console.log(`Server Started`)
});


// Packages
const fs = require('fs');
require('dotenv').config();


// Client
const prefix = "$";

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    EmbedBuilder,
} = require('discord.js');

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel]
});

(async () => {
    client.login(process.env.token)
})();
module.exports = client;

// Ready
client.on('ready', () => {
    console.log(`${client.user.username}, is ready.`)
    client.user.setPresence({
        status: "online",
        activities: [{
            name: `${prefix}help`,
        }]
    });


    // Mention
    const botId = RegExp(`^<@!?${client.user.id}>$`);

    client.on('messageCreate', async message => {
        if (message.author.bot || message.channel.type === "dm") return;
        else if (message.content.match(botId)) {
            let embed = new EmbedBuilder().setColor(color).setDescription("**My prefix is `$` \n If you want help please write `$help` **")
            message.channel.send({ embeds: [embed] });
        }
    });


    // handling
    client.commands = new Collection();
    client.aliases = new Collection();


// Commands Handler 
fs.readdirSync('./Commands/').forEach(dir => {
    fs.readdir(`./Commands/${dir}`, (err, files) => {
      if (err) throw err;
  
      var jsFiles = files.filter(f => f.split(".").pop() === "js");
  
      if (jsFiles.length <= 0) return console.log("Couldn't find any commands!");
  
      jsFiles.forEach(file => {
        var fileGet = require(`./Commands/${dir}/${file}`);
        try {
          client.commands.set(fileGet.info.name, fileGet);
          fileGet.info.aliases.forEach(alias => {
            client.aliases.set(alias, fileGet.info.name);
          })
  
        } catch (err) {
          return console.log(err);
        }
      });
    });
  });


client.on("messageCreate", async message => {
  let args = message.content.split(" ");
    if (!message.content.startsWith(prefix)) return;
    let messagec = message.content;
    let content = messagec.toLowerCase();
    content = content.replace(`${prefix}`, "")

    let command = client.commands.get(content) || client.commands.get(client.aliases.get(content));

    if (command) {
        if (content === message.content) return;
        command.run(client, message, args, prefix);
    } else {
        let firt = args[0];
        if (message.content.startsWith(prefix)) firt = firt.replace(`${prefix}`, "")
        let command = client.commands.get(firt) || client.commands.get(client.aliases.get(firt));
        if (command) {
          command.run(client, message, args, prefix);
        }
      }
});


});