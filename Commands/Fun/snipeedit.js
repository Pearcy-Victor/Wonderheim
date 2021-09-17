const { MessageEmbed } = require('discord.js');

module.exports = {
    name : "snipeedit",
    aliases : ["sedit", "snipedit", "s_edit"],
    category : "Fun",
    description : "Returns old message",
    usage : "!snipeedit",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        const oldMsg = client.MSGCollection.get(guild.id+'_old');
        const newMsg = client.MSGCollection.get(guild.id+'_new');

        if (!oldMsg || !newMsg) return msg.reply("unable to fetch history of last edited messages.");

        const embed = new MessageEmbed()
            .setAuthor(oldMsg.author.username, oldMsg.author.displayAvatarURL())
            .setTitle("Edited message:")
            .setDescription(oldMsg)
            .addField("After edit:", newMsg, true)
            .setTimestamp()
            .setColor(0x00ff00)
            .setFooter(guild.me.displayName, guild.me.displayAvatarURL);

        channel.send(embed);
    }
}