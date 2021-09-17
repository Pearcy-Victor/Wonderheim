const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../Functions")

module.exports = {
    name : "purge",
    aliases : ["clear", "clean"],
    category : "Moderation",
    permissions : "MANAGE_MESSAGES",
    power : "moderators",
    description : "Bulk deletes messages for entire chat",
    usage : "!purge <amount>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;
        const arg = args[0];

        //const users = args.shift()

        const amount = parseInt(arg, 10) + 1;

        await channel.bulkDelete(amount).then(msgs => {
            msg.reply(`I have purged ${msgs.size - 1} messages.`).then(thisMsg => thisMsg.delete({timeout:3000}))
        })
    }
}