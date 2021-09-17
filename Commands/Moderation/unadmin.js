const { MessageEmbed } = require("discord.js");
const { getMember, writeJSON, readJSON } = require("../../Functions")

module.exports = {
    name : "unadmin",
    aliases : ["deladmin", "unmin"],
    category : "Moderation",
    description : "Removes an admin",
    usage : "!unadmin <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;
        const arg = args[0];

        let allowed = readJSON("./Data/allowed.json")

        const user = getMember(msg, arg);

        if (!user) return msg.reply("no user?");
        if (!allowed["admins"].find(users => users == user.id)) return msg.reply("user does not exist.").then(m => m.delete({timeout:5000}))

        allowed["admins"].splice(allowed["admins"].findIndex(usar => usar == user.id), 1)
        allowed["moderators"].splice(allowed["moderators"].findIndex(usar => usar == user.id), 1)
        allowed["friends"].splice(allowed["friends"].findIndex(usar => usar == user.id), 1)

        writeJSON("./Data/allowed.json", allowed)

        msg.reply("the user has been removed.")
        //const users = args.shift()

    }
}