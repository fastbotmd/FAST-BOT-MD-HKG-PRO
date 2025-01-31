const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Crée un client WhatsApp Web
const client = new Client();

// Quand le client est prêt, il génère un QR code
client.on('qr', (qr) => {
    // Affiche le QR code dans le terminal
    qrcode.generate(qr, { small: true });
    console.log('QR Code généré ! Scanne-le avec WhatsApp pour te connecter.');
});

// Quand le client est prêt à être utilisé
client.on('ready', () => {
    console.log('Client WhatsApp prêt !');
});

// Sauvegarde la session si elle est authentifiée
client.on('authenticated', (session) => {
    console.log('Session authentifiée !');
    fs.writeFileSync('./session.json', JSON.stringify(session));
});

// Lancer le client
client.initialize();
