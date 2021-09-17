const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    getMember : function(msg, arg='') {
        arg = arg.toLowerCase()

        const guild = msg.guild;
        const user = msg.member;

        let member = guild.member(arg);

        if (!member && msg.mentions.members) {
            member = msg.mentions.members.first();
        }

        if (!member && arg) {
            member = guild.members.cache.find(mmb => {return mmb.displayName.toLowerCase().startsWith(arg) || mmb.user.tag.toLowerCase().startsWith(arg)})
        }

        if (!member && !arg) {
            member = user;
        }

        return member;
    },

    callError : function(client, msg, text_error) {

        const guild = msg.guild;
        const channel = msg.channel;
        const author = msg.author;

        const embed = new MessageEmbed()
            .setTitle("❌ Oh no! We ran into an error!")
            .setColor(0xff0000)
            .setDescription("Check your code mate")
            .addField("Error:", text_error)
            .addField("Terminal Error", "Please refer to the terminal to check error!")
            .setTimestamp()
            .setThumbnail(author.displayAvatarURL())
            .setFooter(guild.me.displayName, client.user.displayAvatarURL());

        return embed;
    },

    updateJSON : function(dir, path, Data) {
        let jsonFile = module.exports.readJSON(dir);
        jsonFile[path] = Data
        fs.writeFile(dir, JSON.stringify(jsonFile), (err) => {
            if (err) return err
        })
    },

    writeJSON : function(dir, jsonFile) {
        fs.writeFile(dir, JSON.stringify(jsonFile), (err) => {
            if (err) return err
        })
    },

    readJSON : function(dir) {
        let jsonFile = JSON.parse(fs.readFileSync(dir,"utf8"));
        return jsonFile;
    }
}