const { getMember } =  require("../../Functions");

module.exports = {
    name : "role",
    aliases : ["addrole", "roleadd"],
    category : "Moderation",
    permissions : ["MANAGE_ROLES"],
    description : "Adds a role to guild members.",
    usage : "!role <@USER> <input>",
    run: async(client, msg, args) => {
        const guild = msg.guild;
        const text_user = args.shift()

        const user = getMember(msg, text_user);
        const rolex = guild.roles.cache.find(roll => roll.name.toLowerCase() === args.join(" ").toLowerCase());

        if (!rolex) return msg.reply("the role does not exist!")
        if (user.roles.cache.find(role => role === rolex)) return msg.reply("the role is already assigned!")

        user.roles.add(rolex)

        msg.reply(`${rolex.name} role has been added to following user.`)
    }
}