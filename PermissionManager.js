module.exports = {
    permissionsFlags : [
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS"
    ],
    evalPerm : function(pmsn) {
        let valuated = [];
        if (pmsn && Array.isArray(pmsn)) {
            pmsn.forEach(perms => {
                module.exports.permissionsFlags.forEach(perm => {
                    if (perms === perm) {
                        valuated.push(true);
                    }
                })
            })
        }

        if (valuated.every(values => values === true)) {
            return true
        }
    },

    getPermission : function(cmnd, user, bot) {
        const perm = cmnd.permissions;

        if (!module.exports.evalPerm(perm)) throw "Invalid permissions";

        if (Array.isArray(perm)) {
            if (perm.every(permission => !user.permissions.has(permission))) {
                throw "You have no permission!"
            }

            if (perm.every(permission => !bot.permissions.has(permission))) {
                throw "I have no permission!"
            }
        }
    }
}