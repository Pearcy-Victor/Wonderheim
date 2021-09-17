const { readdirSync } = require('fs');

const ascii = require('ascii-table');
const newTable = new ascii().setHeading('Command', 'Status')

module.exports = (client) => {
    readdirSync("./Commands/").forEach(dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(jascr => jascr.endsWith('.js'));

        for (let file of commands) {
            let get = require(`../Commands/${dir}/${file}`)

            if (get.name) {
                client.commands.set(get.name, get)
                newTable.addRow(file, '✅ Acquired');
            } else {
                newTable.addRow(file, '❌ Failed to acquire');
                continue;
            }

            if (get.aliases && Array.isArray(get.aliases)) {
                get.aliases.forEach(alias => client.aliases.set(alias, get.name));
            }
        }
    });

    console.log(newTable.toString());
}