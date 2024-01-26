const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports.run = async (client, message, args, prefix, lang, chann, color, mclient) => {
   if (!args[1]) {
      if (lang === "en") {
         if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.channel.send("**You don't have the required permissions | :x:**");
         if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send(`**I don't have permission to hide channels | :x:**`)
         let everyone = message.guild.roles.cache.find(message => message.name === '@everyone');
         message.channel.permissionOverwrites.edit(everyone, {
            ViewChannel: false
         })
         message.channel.send({ content: `**<#${message.channel.id}> channel has been hidden | ⚙️**` });
      }
      if (lang === "ar") {
         if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.channel.send("**آسف , لكنك لا تملك الصلاحيات المطلوبة لإستخدام هذا الأمر | :x:**");
         if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send(`**انا لا املك صلاحيات لإخفاء الرومات | :x:**`);
         let everyone = message.guild.roles.cache.find(message => message.name === '@everyone');
         message.channel.permissionOverwrites.edit(everyone, {
            ViewChannel: false
         })
         message.channel.send({ content: `**⚙️ | <#${message.channel.id}> تم إخفاء روم **` })
      }
   }
   if (args[1] && args[1] !== "all") {
      if (lang === "en") {
         chann.send(`ENcmd: ` + args[0] + ` ran in ${message.guild.name}(${message.guild.id})`)
         if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send(`**I don't have the required permissions | :x:**`);
         if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.channel.send(`**You don't have the permissions**`);
         let channel = message.mentions.channels.first();
         // let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
         if (!channel) return message.channel.send(`**I couldn't find that channel | :x:**`);
         channel.permissionOverwrites.edit(message.guild.id, {
            ViewChannel: false
         })
         message.channel.send(`**<#${channel.id}> channel has been hidden | ⚙️**`);
      }
      if (lang === "ar") {
         chann.send(`ARcmd: ` + args[0] + ` ran in ${message.guild.name}(${message.guild.id})`)
         if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send(`**انا لا املك الصلاحيات المطلوبة | :x:**`);
         if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.channel.send(`>>> \`\`\`أنت لا تملك الصلاحيات المطلوبة | :x:**`);
         let channel = message.mentions.channels.first();
         if (!channel) return message.channel.send(`**لم اتطع إيجاد هذا الروم| :x:**`);
         channel.permissionOverwrites.edit(message.guild.id, {
            ViewChannel: false
         })
         message.channel.send(`**⚙️ | <#${channel.id}> تم إخفاء روم **`);
      }
   }
}

module.exports.help = {
   name: "cmdHIDE",
   aliases: ["hide", "h"]
}