module.exports = {
    name: "accessgroup",
    description: "Donne un accès complet au bot si celui-ci est administrateur du groupe.",
    category: "Group",
    active: true, // Commande activée par défaut

    execute: async (client, message, args) => {
        try {
            const group = await message.getChat();
            const admins = group.participants.filter(participant => participant.isAdmin);

            // Vérifier si le bot est administrateur du groupe
            const isBotAdmin = admins.some(admin => admin.id === client.info.wid._serialized);

            if (isBotAdmin) {
                // Si le bot est administrateur, il a un accès complet
                message.reply("✅ Le bot a maintenant un accès complet au groupe.");
            } else {
                // Si le bot n'est pas administrateur, il n'a pas d'accès complet
                message.reply("❌ Le bot n'a pas d'accès complet car il n'est pas administrateur du groupe.");
            }
        } catch (error) {
            console.error("Erreur dans la commande accessgroup :", error);
            message.reply("❌ Une erreur s'est produite lors de l'exécution de la commande.");
        }
    },
};
