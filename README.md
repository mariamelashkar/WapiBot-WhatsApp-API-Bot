# WapiBot - WhatsApp API Bot

WapiBot is a lightweight, scalable Node.js-based API that uses the `whatsapp-web.js` library to send messages via WhatsApp. It provides the ability to send individual or bulk messages, handle list responses, and seamlessly integrate WhatsApp messaging automation into your applications.

---

## Features

- **Bulk Messaging**: Send messages to multiple contacts simultaneously.
- **List Messages**: Handle WhatsApp list messages and responses effectively.
- **Secure Authentication**: Uses `LocalAuth` for seamless and secure session management.
- **Error Handling**: Detailed error handling for better reliability and debugging.
- **Modularized Code**: Follows DRY principles and modular design for clean and maintainable code.

---

## QR Code for Authentication

To authenticate with WhatsApp Web, scan the QR code displayed when the application starts. During runtime, the application generates a QR code that needs to be scanned using the WhatsApp mobile app to establish a secure session.
---

## Technologies Used

- **Node.js**: Backend JavaScript runtime for building scalable applications.
- **Express.js**: Minimalist framework for API creation.
- **whatsapp-web.js**: Library for automating WhatsApp messaging.
- **qrcode-terminal**: Generates QR codes directly in the terminal.
- **Cors**: Middleware to handle Cross-Origin Resource Sharing (CORS).
- **Postman**: API testing and debugging.

---

### Prerequisites

- Node.js >= 14
- npm >= 6
- A valid WhatsApp account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mariamelashkar/WapiBot-WhatsApp-API-Bot.git
   cd WapiBot-WhatsApp-API-Bot
