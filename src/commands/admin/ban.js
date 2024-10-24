const User = require('../../models/user');
const { userBanned } = require('../../utils/messages');

module.exports = async (client, message, args) => {
    const userPhone = args[0];
    if (!userPhone) return client.sendMessage(message.key.remoteJid, { text: "Please provide the phone number of the user to ban." });
    
    const user = await User.findOne({ phoneNumber: userPhone });
    if (!user) return client.sendMessage(message.key.remoteJid, { text: "User not found." });
    
    user.isBanned = true;
    await user.save();
    
    client.sendMessage(message.key.remoteJid, { text: userBanned(user.username) });
};
