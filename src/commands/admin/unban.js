const User = require('../../models/user');
const { userUnbanned } = require('../../utils/messages');

module.exports = async (client, message, args) => {
    const userPhone = args[0];
    if (!userPhone) return client.sendMessage(message.key.remoteJid, { text: "Please provide the phone number of the user to unban." });
    
    const user = await User.findOne({ phoneNumber: userPhone });
    if (!user) return client.sendMessage(message.key.remoteJid, { text: "User not found." });
    
    user.isBanned = false;
    await user.save();
    
    client.sendMessage(message.key.remoteJid, { text: userUnbanned(user.username) });
};
