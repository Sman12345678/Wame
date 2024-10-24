module.exports = {
    botWelcome: (username) => `Welcome, ${username}! How can I assist you today?`,
    botGoodbye: 'Goodbye! Have a great day!',
    userBanned: (username) => `${username} has been banned from using the bot.`,
    userUnbanned: (username) => `${username} has been unbanned.`,
    pingResponse: (currentTime) => `Pong! 🏓\nCurrent Date & Time: ${currentTime}`,
    koraResponse: (responseText) => `Kora says: ${responseText}`,
};
