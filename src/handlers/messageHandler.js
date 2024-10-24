const fs = require('fs');
const path = require('path');
const { MessageType } = require('@adiwajshing/baileys');
const logger = require('../utils/logger');

// Load all commands from the "commands" folder
const commands = {};
const commandFolders = fs.readdirSync(path.join(__dirname, '../commands'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands[command.name] = command;
    }
}

// Handle incoming messages
const handleMessage = async (client, message) => {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        if (!text) return;

        const prefix = '!'; // Set your command prefix here
        if (!text.startsWith(prefix)) return;

        const args = text.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands[commandName];
        if (command) {
            await command.execute(client, message, args);
        } else {
            logger.info(`Unknown command: ${commandName}`);
        }
    } catch (error) {
        logger.error('Error in message handler:', error);
    }
};

module.exports = { handleMessage };
