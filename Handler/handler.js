module.exports = (client) => {
    client.on("messageDelete", async msg => {
        if (msg.author.bot) return
        if (!msg.guild) return
        if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

        let messageGLog = client.MSGCollection.get(msg.guild.id)

        messageGLog.deletedMessage = {
            author : msg.author,
            content : msg.content
        }

        client.MSGCollection.set(msg.guild.id, messageGLog)
    })

    client.on("messageUpdate", async (oldMsg, newMsg) => {
        if (msg.author.bot) return
        if (!msg.guild) return
        
        let messageGLog = client.MSGCollection.get(msg.guild.id)

        messageGLog.editedMessage = {
            author : oldMsg.author,
            oldMessage : oldMsg.content,
            newMessage : newMsg.content
        }

        client.MSGCollection.set(msg.guild.id, messageGLog)
    })
}