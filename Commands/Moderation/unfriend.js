const { MessageEmbed } = require("discord.js");
const { getMember, writeJSON, readJSON } = require("../../Functions")

module.exports = {
    name : "unfriend",
    category : "Moderation",
    description : "Removes a friend (it is trully sadge)",
    usage : "!unfriend <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;
        const arg = args[0];

        let allowed = readJSON("./Data/allowed.json")

        const user = getMember(msg, arg);

        if (!user) return msg.reply("no user?");
        if (!allowed["friends"].find(users => users == user.id)) return msg.reply("user does not exist.").then(m => m.delete({timeout:5000}))

        allowed["friends"].splice(allowed["friends"].findIndex(usar => usar == user.id), 1)

        writeJSON("./Data/allowed.json", allowed)

        msg.reply("the user has been removed.")
        //const users = args.shift()

    }
}