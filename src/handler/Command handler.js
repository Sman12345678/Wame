const help = require('../commands/general/help');
const ping = require('../commands/general/ping');
const ban = require('../commands/admin/ban');
const unban = require('../commands/admin/unban');
const broadcast = require('../commands/owner/broadcast');

async function commandHandler(sock, from, command, content) {
    switch (command) {
        case '!help':
            await help(sock, from);
            break;
        case '!ping':
            await ping(sock, from);
            break;
        case '!ban':
            await ban(sock, from, content);
            break;
        case '!unban':
            await unban(sock, from, content);
            break;
        case '!broadcast':
            await broadcast(sock, from, content);
            break;
        default:
            sock.sendMessage(from, { text: 'Unknown command. Type !help for a list of commands.' });
    }
}

module.exports = { commandHandler };
