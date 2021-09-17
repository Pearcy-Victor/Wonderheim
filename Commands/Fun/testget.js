module.exports = {
    name : "testget",
    aliases : ["get"],
    category : "Fun",
    description : "Getting server variable conducted by V-Pearce.",
    run: async(client, msg, args) => {

        if (msg.deletable) msg.delete()

        const guild = msg.guild
        msg.channel.send(client.guildVariable.get(guild.id+"_variableForTesting"));
    }
}