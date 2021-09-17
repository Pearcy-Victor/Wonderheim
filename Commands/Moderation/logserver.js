module.exports = {
    name : "logserver",
    aliases : ["logserv", "logservadd"],
    category : "Moderation",
    description : "Adds following server to be logged",
    usage : "!logserver <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        if (client.serverToLog.get(guild.name)) return msg.reply("the server is already being logged.")

        client.serverToLog.set(guild.name, guild);
        msg.reply("the server is added to log list.")
    }
}