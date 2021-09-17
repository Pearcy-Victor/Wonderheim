const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "send",
    aliases : ['say', 'announce'],
    category: "Fun",
    description: "Sends a message using the identity of this bot.",
    usage : "!send [embed] <input>",
    run: async (client, msg, args) => {
        if (msg.deletable) msg.delete();

        if (args.length < 1) return msg.reply("no messages are broadcasted.").then(m => m.delete({timeout:5000}))

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(0x00ff00)
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setFooter(msg.guild.me.displayName, client.user.displayAvatarURL());

        msg.channel.send(embed);
        } else {
            msg.channel.send(args.join(" "));
        }
    }
}