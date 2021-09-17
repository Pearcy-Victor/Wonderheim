const { updateJSON, readJSON } = require("../../Functions")
module.exports = {
    name : "prefix",
    aliases : ["pre", "commandprefix", "cmdprefix"],
    description : "Changes or show command prefix.",
    category: "Moderation",
    usage: "!prefix <input> OR !prefix",
    run: async(client, msg, args) => {
        const guild = msg.guild;

        let prefixes = readJSON("./Data/prefix.json", guild.id)
        const prefix = prefixes[guild.id];

        if (args.length < 1) return msg.reply(`the command prefix for this server is ${prefix}`);
        if (args.length > 1) return msg.reply("can't set prefix with spacing.").then(m => m.delete({timeout:5000}));

        const newPrefix = args.shift()

        updateJSON("./Data/prefix.json", guild.id, newPrefix)
        msg.reply(`the prefix has been set to ' ${newPrefix} '.`).then(thisMsg => thisMsg.delete({timeout:3000}));
    }

}