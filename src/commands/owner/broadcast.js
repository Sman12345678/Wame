const User = require('../../models/user');
const { botBroadcast } = require('../../utils/messages');

module.exports = async (client, message, args) => {
    if (!args.length) return client.sendMessage(message.key.remoteJid, { text: "Please provide a message to broadcast." });
    
    const broadcastMessage = args.join(' ');
    const users = await User.find({});
    
    users.forEach(async (user) => {
        await client.sendMessage(user.phoneNumber + "@s.whatsapp.net", { text: broadcastMessage });
    });

    client.sendMessage(message.key.remoteJid, { text: "Broadcast message sent to all users." });
};
