const fs = require("fs");

let logserver = JSON.parse(fs.readFileSync('././Data/prefix.json','utf8'));

const { MessageEmbed } = require("discord.js");
module.exports = setup = {
    set_channel         : (channel_name) => {
        setup.logging_channel_name = channel_name;
    },
    logging_channel_name: "None",
    logging_channel     : (client) => {
        return client.channels.cache.find(channel => channel.name === setup.logging_channel_name);
    },
    log                 : async (client, msg) => {
        const guild = msg.guild;
        const author = msg.author;
        const channel = msg.channel;
        const content = (msg.content.length < 1)? "Following message is an attachment":msg.content

        const logger = setup.logging_channel(client)

        if (!client.serverToLog.get(msg.guild.name)) return;
        if (!logger) return console.log(`Channel is nono, ${setup.logging_channel_name}`);

        const embed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL())
                .setTitle("Sent message")
                .setDescription("Specialized in wild hunt")
                .addField("Sent messages in:", `#${channel.name}`, true)
                .setColor(0x00ff00)
                .addField("Message Content", content)
                .setFooter(`Sent by ${author.username}`, author.displayAvatarURL())
                .setTimestamp();
        
        logger.send(embed)
    }
}