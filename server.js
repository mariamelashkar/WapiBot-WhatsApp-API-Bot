const express = require("express");
const bodyParser = require("body-parser");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Generate QR code for login
client.on("qr", (qr) => {
    console.log("Scan this QR code to log in:");
    qrcode.generate(qr, { small: true });
});

// When the client is ready
client.on("ready", () => {
    console.log("WhatsApp client is ready!");
});

// Initialize the client
client.initialize();

// API endpoint for bulk messaging
app.post("/send-bulk-messages", async (req, res) => {
    const { contacts, message } = req.body;

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
        return res.status(400).json({ error: "A list of contacts is required." });
    }

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    const results = [];
    for (const contactNumber of contacts) {
        try {
            // Format the contact number
            const chatId = `${contactNumber.replace(/\+/g, "")}@c.us`;

            // Send the message
            await client.sendMessage(chatId, message);
            console.log(`Message sent to ${contactNumber}`);
            results.push({ contact: contactNumber, status: "success" });
        } catch (error) {
            console.error(`Failed to send message to ${contactNumber}:`, error.message);
            results.push({ contact: contactNumber, status: "error", error: error.message });
        }
    }

    // Return the results for each contact
    res.status(200).json({ status: "completed", results });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
