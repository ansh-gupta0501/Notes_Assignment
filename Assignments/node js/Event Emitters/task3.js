//simulate a chat app with multiple events
const { EventEmitter } = require('events');

class ChatApp extends EventEmitter {
    constructor() {
        super();
        this.users = new Set();
        this.messageHistory = [];
    }

    // User joins the chat
    join(user) {
        if (this.users.has(user)) {
            this.emit('error', { user, message: `${user} is already in the chat.` });
        } else {
            this.users.add(user);
            this.emit('join', { user, message: `${user} has joined the chat.` });
        }
    }

    // User sends a message
    sendMessage(user, message) {
        if (!this.users.has(user)) {
            this.emit('error', { user, message: `Message failed. ${user} is not in the chat.` });
            return;
        }
        const msgObj = { user, message, timestamp: new Date().toLocaleTimeString() };
        this.messageHistory.push(msgObj);
        this.emit('sendMessage', msgObj);
    }

    // User is typing
    typing(user) {
        if (!this.users.has(user)) {
            this.emit('error', { user, message: `Typing event failed. ${user} is not in the chat.` });
            return;
        }
        this.emit('typing', { user, message: `${user} is typing...` });
    }

    // User leaves the chat
    leave(user) {
        if (!this.users.has(user)) {
            this.emit('error', { user, message: `${user} cannot leave. Not in the chat.` });
            return;
        }
        this.users.delete(user);
        this.emit('leave', { user, message: `${user} has left the chat.` });
    }

    // Show message history
    showHistory() {
        console.log(`\n📜 Chat History (${this.messageHistory.length} messages):`);
        this.messageHistory.forEach(msg =>
            console.log(`[${msg.timestamp}] ${msg.user}: ${msg.message}`)
        );
    }
}


const chat = new ChatApp();

// Join
chat.on('join', ({ user, message }) => console.log(`${message}`));

// Send Message
chat.on('sendMessage', ({ user, message, timestamp }) =>
    console.log(`[${timestamp}] ${user}: ${message}`)
);

// Typing
chat.on('typing', ({ user, message }) => console.log(`${message}`));

// Leave
chat.on('leave', ({ user, message }) => console.log(` ${message}`));

// Errors
chat.on('error', ({ user, message }) => console.error(` [${user}] Error: ${message}`));



chat.join('Ansh');
chat.join('Gupta');
chat.join('Ansh'); // duplicate join

chat.typing('Ansh');
chat.sendMessage('Ansh', 'Hello, everyone!');
chat.sendMessage('Gupta', 'Hi Ansh!');
chat.sendMessage('Stranger', 'I should not be here'); // not joined

chat.leave('Gupta');
chat.leave('Gupta'); // trying to leave again

chat.showHistory();
