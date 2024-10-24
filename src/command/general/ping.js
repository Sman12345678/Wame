const { MessageType } = require('@adiwajshing/baileys'); // Assuming you're using Baileys

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s response time and display the current date and time.',
    
    async execute(client, message) {
        const start = Date.now(); // Record start time
        
        // Send a loading message first
        await client.sendMessage(message.key.remoteJid, 'Pinging...', MessageType.text);

        const end = Date.now(); // Record end time after the response
        
        // Calculate the ping duration
        const pingTime = end - start;
        
        // Get current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const formattedTime = currentDate.toLocaleTimeString('en-US');
        
        // Visually appealing output
        const pingMessage = `
        ╭─── *🏓 Ping Test* ───╮
        │
        ├─ 📅 *Date:* ${formattedDate}
        ├─ 🕒 *Time:* ${formattedTime}
        ├─ 🚀 *Response Time:* ${pingTime}ms
        │
        ╰─────────────────────╯
        `;

        // Send the final ping result
        await client.sendMessage(message.key.remoteJid, pingMessage, MessageType.text);
    }
};
