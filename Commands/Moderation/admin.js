const { MessageEmbed } = require("discord.js");
const { getMember, writeJSON, readJSON } = require("../../Functions")

module.exports = {
    name : "admin",
    aliases : "addmin",
    category : "Moderation",
    description : "Adds an admin",
    usage : "!admin <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;
        const arg = args[0];

        let allowed = readJSON("./Data/allowed.json")

        const user = getMember(msg, arg);

        if (!user) return msg.reply("no user?");
        if (Object.values(allowed).join(" ").includes(user.id)) return msg.reply("user already exists.").then(m => m.delete({timeout:5000}))

        allowed[module.exports.name+"s"].push(user.id)
        allowed["moderators"].push(user.id)
        allowed["friends"].push(user.id)

        writeJSON("./Data/allowed.json", allowed)

        msg.reply("the user has been added.")
        //const users = args.shift()

    }
}