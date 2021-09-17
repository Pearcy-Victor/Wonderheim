const { MessageEmbed } = require("discord.js");

module.exports = {
    name : "snipe",
    category : "Fun",
    description : "Returns the last message sent",
    usage : "!snipe",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        if (msg.deletable) msg.delete();
    
        const deletedMsg = client.MSGCollection.get(guild.id+'_deleted');

        if (!deletedMsg) return msg.reply("unable to return deleted message.")

        let embed = new MessageEmbed()
            .setAuthor(deletedMsg.author.username, deletedMsg.author.displayAvatarURL())
            .setDescription(deletedMsg.content)
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter(guild.me.displayName, client.user.displayAvatarURL());

        if (deletedMsg.attachments.first()) {
            const att = deletedMsg.attachments.first()
            if (att.proxyURL.endsWith(".jpg") || att.proxyURL.endsWith(".png")) {
                embed
                    .addField("Attachment", att.name)
                    .setImage(att.proxyURL)
            } else {
                embed
                    .attachFiles([att])
            }
        }

        channel.send(embed);
    }
}