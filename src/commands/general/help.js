module.exports = {
    name: 'help',
    description: 'Display available bot commands.',
    
    async execute(client, message, args) {
        const helpMessage = `
        ╭─── *📜 Available Commands* ───╮
        │
        ├─ !ping 🎲- Check the bot's response time.
        ├─ !kora👽 - Get response from kora ai.
        │
        ╰──────────────────────────╯
        `;
        await client.sendMessage(message.key.remoteJid, helpMessage, MessageType.text);
    }
};
