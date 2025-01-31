const { Client } = require('whatsapp-web.js');
const client = new Client();

// Stockage des images associées aux menus du bot
let menuImages = {
    bugmenu: '',
    bugultrmenu: '',
    // Vous pouvez ajouter d'autres menus ici si nécessaire
};

// Lorsque le bot est prêt
client.on('ready', () => {
    console.log('Bot is ready!');
});

// Fonction pour ajouter une image à un menu
async function addMenuImage(menuName, imageUrl, message) {
    if (menuImages[menuName] !== undefined) {
        menuImages[menuName] = imageUrl; // Stocker l'URL de l'image pour ce menu
        await message.reply(`L'image pour le menu *${menuName}* a été changée avec succès !`);
    } else {
        await message.reply('Nom du menu invalide. Veuillez spécifier un menu valide (ex: bugmenu).');
    }
}

// Fonction pour traiter les messages
client.on('message', async (message) => {
    const ownerNumber = '24174265527'; // Le numéro du propriétaire du bot
    const messageSender = message.from;

    // Vérifie que le message provient du propriétaire du bot
    if (messageSender !== ownerNumber) {
        return;
    }

    // Commande pour ajouter une image à un menu
    if (message.body.toLowerCase().startsWith('.ajoute img menu bot')) {
        const args = message.body.split(' ');

        if (args.length < 4) {
            return message.reply('Usage correct : .ajoute img menu bot <nom_du_menu> <url_image>');
        }

        const menuName = args[3]; // Extraire le nom du menu
        const imageUrl = args.slice(4).join(' '); // Extraire l'URL de l'image

        await addMenuImage(menuName, imageUrl, message);
    }

    // Si une image est associée à un menu, l'envoyer avec le message du menu
    // (ex: lors de l'affichage du menu)
    if (menuImages.bugmenu) {
        await message.reply({
            body: 'Voici l\'image du menu bugmenu:',
            url: menuImages.bugmenu, // Envoi de l'image associée au menu bugmenu
        });
    }

    // Vous pouvez ajouter des conditions similaires pour d'autres menus comme bugultrmenu, etc.
});

// Démarrer le client WhatsApp
client.initialize();
