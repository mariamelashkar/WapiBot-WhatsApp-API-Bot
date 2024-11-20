const { Client, LocalAuth, List } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Initialize the client with local authentication
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Generate QR code for login
client.on("qr", (qr) => {
    console.log("Scan this QR code to log in:");
    qrcode.generate(qr, { small: true });
});

// When the client is ready
client.on("ready", async () => {
    console.log("Client is ready!");

    for (const contactNumber of contacts) {
        try {
            // Format the contact number with WhatsApp ID format
            const chatId = `${contactNumber.replace(/\+/g, "")}@c.us`;

            // Check if the contact is registered on WhatsApp
            const isRegistered = await client.isRegisteredUser(chatId);
            if (!isRegistered) {
                console.log(`❌ Contact ${contactNumber} is not registered on WhatsApp.`);
                continue;
            }

            // debug/test line
            // const message = "Hello! This is a simple text message.";

            // Send the message (either text or list)
            await client.sendMessage(chatId, message);
            console.log(`✅ Message sent to ${contactNumber}`);
        } catch (error) {
            console.error(`❌ Failed to send message to ${contactNumber}: ${error.message}`);
        }

        // Optional delay between messages to prevent being flagged
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    }
});

// Handle responses from the list
client.on("message", async (message) => {
    if (message.type === "list_response") {
        console.log(`User selected: ${message.body}`);
        await message.reply(`You've selected ${message.body}`);
    }
});

// Initialize the client
client.initialize();
