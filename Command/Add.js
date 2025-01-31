module.exports = async (msg, client, tagallMentioned) => {
    const chat = await msg.getChat();

    if (chat.isGroup) {
        if (chat.isAdmin) {
            if (tagallMentioned.length > 0) {
                try {
                    await chat.addParticipants(tagallMentioned); // Ajoute les membres enregistrés
                    msg.reply("✅ *Membres ajoutés avec succès !*");
                } catch (err) {
                    msg.reply("❌ Une erreur est survenue lors de l'ajout des membres. Assurez-vous que je suis administrateur.");
                }
            } else {
                msg.reply("❌ Aucun membre enregistré. Veuillez d'abord utiliser `.tagall` dans un groupe.");
            }
        } else {
            msg.reply("❌ Vous devez être administrateur pour utiliser cette commande.");
        }
    } else {
        msg.reply("❌ Cette commande fonctionne uniquement dans un groupe.");
    }
};
