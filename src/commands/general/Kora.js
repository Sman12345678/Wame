const axios = require('axios');
const { koraResponse } = require('../../utils/messages');

module.exports = async (client, message, args) => {
    if (!args.length) return client.sendMessage(message.key.remoteJid, { text: "Please provide a query for Kora." });
    
    const userQuery = args.join(' ');
    const koraApiUrl = `https://kora-ai-sh1p.onrender.com/koraai?query=${encodeURIComponent(userQuery)}`;
    
    try {
        const response = await axios.get(koraApiUrl);
        const koraReply = response.data.response;  // Assuming the API returns the response in a field named 'response'
        
        client.sendMessage(message.key.remoteJid, { text: koraResponse(koraReply) });
    } catch (error) {
        client.sendMessage(message.key.remoteJid, { text: "Sorry, I couldn't reach Kora AI at the moment. Please try again later." });
    }
};
