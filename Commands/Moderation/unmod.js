const { MessageEmbed } = require("discord.js");
const { getMember, writeJSON, readJSON } = require("../../Functions")

module.exports = {
    name : "unmod",
    aliases : ["delmod", "delmoderator"],
    category : "Moderation",
    description : "Removes a moderator",
    usage : "!unmod <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;
        const arg = args[0];

        let allowed = readJSON("./Data/allowed.json")

        const user = getMember(msg, arg);

        if (!user) return msg.reply("no user?");
        if (!allowed["moderators"].find(users => users == user.id)) return msg.reply("user does not exist.").then(m => m.delete({timeout:5000}))

        allowed["moderators"].splice(allowed["moderators"].findIndex(usar => usar == user.id), 1)
        allowed["friends"].splice(allowed["friends"].findIndex(usar => usar == user.id), 1)

        writeJSON("./Data/allowed.json", allowed)

        msg.reply("the user has been removed.")
        //const users = args.shift()

    }
}