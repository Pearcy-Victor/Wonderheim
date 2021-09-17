const logger = require("../../Automation/log_text")

module.exports = {
    name : "logchannel",
    aliases : ["logchan", "lgc"],
    category : "Moderation",
    description : "Sets a channel to log to",
    usage : "!logchannel <CHNANEL_NAME>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        if (args < 1) return channel.send("there is no channel to set.")

        logger.set_channel(args[0])

        if (!logger.logging_channel(client)) {
            msg.reply("there is no such channel, please try again.")
        } else {
            msg.reply(`the channel is set up successfully, messages onward will be directly logged into #${logger.logging_channel(client).name}.`)
        }
    }
}