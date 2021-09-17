const { getMember } = require("../../Functions")

module.exports = {
    name : "unrole",
    aliases : ["delrole", "roledel", "roledelete", "deleterole", "removerole", "roleremove"],
    category : "Moderation",
    permissions : ["MANAGE_ROLES"],
    description : "Removes a role from guild members.",
    usage : "!unrole <@USER> <input>",
    run: async(client, msg, args) => {
        const guild = msg.guild;
        const text_user = args.shift()

        const user = getMember(msg, text_user);
        const rolex = guild.roles.cache.find(roll => roll.name.toLowerCase() === args.join(" ").toLowerCase());

        if (!rolex) return msg.reply("the role does not exist.")
        if (!user.roles.cache.find(role => role === rolex)) return msg.reply("the role is already removed!")

        user.roles.remove(rolex)

        msg.reply(`${rolex.name} role has been removed from following user.`)
    }
}