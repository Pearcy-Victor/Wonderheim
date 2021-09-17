module.exports = {
    name : "unlogserver",
    aliases : ["unlogserv", "logservdel"],
    category : "Moderation",
    description : "Removes following server from logged",
    usage : "!unlogserver <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        if (!client.serverToLog.get(guild.name)) return msg.reply("the server does not exist in following list.")

        client.serverToLog.delete(guild.name);
        msg.reply("the server is removed from log list.")
    }
}