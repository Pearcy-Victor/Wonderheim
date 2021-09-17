const { MessageEmbed } = require("discord.js");
module.exports = {
    name : "info",
    aliases : "usage",
    category : "Info",
    description : "Provides command informations.",
    usage : "!info <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        let cmd = client.commands.get(args[0]);

        if (!cmd) cmd = client.commands.get(client.aliases.get(args[0]));
        if (!cmd) return msg.reply("there is no such command.")

        let cmdAlias;

        if (cmd.aliases) {
            if (Array.isArray(cmd.aliases)) {
                cmdAlias = cmd.aliases.join(", ");
            } else {
                cmdAlias = cmd.aliases;
            };
        };

        if (args.length < 1) return msg.reply("I can't provide information of nothing.").then(m => m.delete({timeout:5000}));
        
        const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle(cmd.name)
            .setDescription(cmdAlias)
            .addField("Description", cmd.description)
            .addField("Usage", cmd.usage)
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
    }
}