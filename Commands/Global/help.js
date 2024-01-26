const { EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    let embed = new EmbedBuilder()
        .setTitle(`Help Menu`)
        .setAuthor({name: `${message.author.tag}`, url:message.author.avatarURL()})
        .setColor(`Yellow`)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setDescription(
            `${client.user.username}\n Developers : <@1022785761516453919>`)
        .setFooter({ text: `Dev` })
        .setTimestamp()
        .addFields(
            { name: prefix + "Links", value: `[MG Server](https://discord.gg/m-g)\n[Moh shop](https://discord.com/invite/mohs)`, inline: true },
        );
    message.channel.send({ embeds:[embed] })
}

module.exports.info = {
    name: "Command-Help",
    aliases: ["help"]
}