const { config } = require("dotenv");
config();

const fs = require('fs');

const {Client, MessageEmbed, Collection} = require("discord.js");
const client = new Client();
const { callError } = require("./Functions");
const { getPermission } = require("./PermissionManager");

client.commands = new Collection();
client.aliases = new Collection();


client.guildVariable = new Collection();
client.serverToLog = new Collection();

client.MSGCollection = new Collection()

const { log } = require("./Automation/log_text");

['commands'].forEach(handler => {
    require(`./Handler/${handler}`)(client);
});

//['handler'].forEach(handler => {
//    require(`./Handler/${handler}`)(client);
//});

client.once("ready", () => {
    console.log(`Damn, ${client.user.tag} back at it again!`)

    client.user.setPresence({
        status: "dnd",
        activity: {
            name: "all of you.",
            type: "WATCHING",
        }
    });

    //Settle Guild Variables
    client.guilds.cache.each(guild => {
        let prefixes = JSON.parse(fs.readFileSync("./Data/prefix.json", "utf8"));
        if (!prefixes[guild.id]) {
            prefixes[guild.id] = "!"

            fs.writeFile('./Data/prefix.json', JSON.stringify(prefixes), (err) => {
                if (err) console.log(err)
            })
        }
    })
});

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (!msg.guild) return;
    if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

    log(client, msg);
    
    //--Peasant Commands
    let prefixes = JSON.parse(fs.readFileSync("./Data/prefix.json", "utf8"));

    const guild = msg.guild;
    const user = msg.author;
    const channel = msg.channel;

    let prefix = prefixes[guild.id];

    if (msg.content == "Hi") {
        channel.send(`Hi, I'm ${client.user.username} and you are ${user.username}, cool.`);
    }

    if (msg.content.toLowerCase().includes("my avatar") && msg.content.toLowerCase().startsWith("what")) {
        msg.channel.send(msg.author.displayAvatarURL());
    }

    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase()

        let command = client.commands.get(cmd);
        const allowed = require("./Data/allowed.json")

        if (!command) command = client.commands.get(client.aliases.get(cmd));

        //if (command) {
        //    if (command.power) {
        //        if (!allowed[command.power].includes(user.id)) {
        //            return msg.reply("you are not friend of my master so I can't let you use this shit. Sorry about that.")
        //        }
        //    }
        //}

        if (command) {
            //try {
            //    getPermission(command, msg.member, guild.me);
            //    command.run(client, msg, args)
            //} catch(error) {
            //    msg.channel.send(callError(client, msg, error))
            //}
            if (command.power) {
                if (!allowed[command.power].includes(user.id)) {
                    return msg.reply("you are not friend of my master so I can't let you use this shit. Sorry about that.")
                } else if (allowed[command.power].includes(user.id)) {
                    try {
                        getPermission(command, msg.member, guild.me);
                        command.run(client, msg, args)
                    } catch(error) {
                        msg.channel.send(callError(client, msg, error))
                    }
                }
            }
            try {
                getPermission(command, msg.member, guild.me);
                command.run(client, msg, args)
            } catch(error) {
                msg.channel.send(callError(client, msg, error))
            }
        }
    }
})

//client.on("messageDelete", async msg => {
    //if (!msg.guild) return;
    //if (msg.author.bot) return;
    //if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

    //client.MSGCollection.set(msg.guild.id+'_deleted', msg);
    //const embed = new MessageEmbed()
    //        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
    //        .setTitle("Deleted message")
    //        .setDescription(msg.content)
    //        .setColor(0x00ff00)
    //        .setTimestamp()
    //        .setFooter(msg.guild.me.displayName, client.user.displayAvatarURL());

    //const log_channel = msg.guild.channels.cache.find(channel => channel.name === "deleted-messages");
    //if (!log_channel) return console.log(`Server [${msg.guild.name}] does not have a log channel`);
    //log_channel.send(embed)
//})

client.on("messageUpdate", async (oldMsg, newMsg) => {
    client.MSGCollection.set(oldMsg.guild.id+'_old', oldMsg);
    client.MSGCollection.set(newMsg.guild.id+'_new', newMsg);
})

client.login(process.env.TOKEN1);