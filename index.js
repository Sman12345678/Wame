require('dotenv').config(); // Load environment variables
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');

// Import the MongoDB connection and models
const connectDB = require('./src/utils/database');
const User = require('./src/models/user');

// Connect to MongoDB
connectDB();

const { state, saveState } = useSingleFileAuthState(process.env.AUTH_FILE_PATH || './auth_info_multi.json');

// WhatsApp connection
const startSock = () => {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startSock(); // reconnect if not logged out
            } else {
                console.log('Connection closed. Logged out.');
            }
        } else if (connection === 'open') {
            console.log('Connected to WhatsApp');
        }
    });

    sock.ev.on('messages.upsert', async (msg) => {
        const message = msg.messages[0];
        const sender = message.key.remoteJid;

        if (!message.message) return; // Ignore empty messages

        const user = await findOrCreateUser(sender); // Find or create user in DB

        // Respond to specific commands
        if (message.message.conversation === '!ping') {
            const date = new Date();
            const response = `*Pong!*\nDate: ${date.toLocaleDateString()}\nTime: ${date.toLocaleTimeString()}`;
            await sock.sendMessage(sender, { text: response });
        }
    });

    return sock;
};

// Find user by phone number, or create a new user
async function findOrCreateUser(phoneNumber) {
    let user = await User.findOne({ phoneNumber });
    if (!user) {
        user = new User({ phoneNumber });
        await user.save();
        console.log(`New user created: ${phoneNumber}`);
    }
    return user;
}

startSock();
