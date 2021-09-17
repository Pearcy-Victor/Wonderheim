module.exports = {
    name : "testset",
    aliases : ["set"],
    category : "Fun",
    description : "Setting server variable conducted by V-Pearce.",
    run: async(client, msg, args) => {
        const guild = msg.guild;

        if (args.length < 1) return msg.reply(" bruh stop playing me like that.").then(m => m.delete({timeout:5000}));

        client.guildVariable.set(guild.id+"_variableForTesting", args.join(" "))
    }
}