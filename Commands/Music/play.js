module.exports = {
    name : "play",
    aliases : "p",
    category : "Music",
    description : "Plays a song [Need to be in a voice channel]",
    usage : "!p <input>",
    run : async(client, msg, args) => {
        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        if (args.length < 0) return msg.reply("you need to play something, man.");
        if (!author.voiceChannel) return msg.reply("you need to join a voice channel to listen to music.");

        
    }
}