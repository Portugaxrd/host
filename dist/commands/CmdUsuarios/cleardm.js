const Discord = require("discord.js");
const { obterEmoji } = require("../../Handler/EmojiFunctions");

module.exports = {
  name: "cleardm",
  description: "[🛠|🎫 Utilidades] Limpe todas as mensagens do bot na sua DM!",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction, message) => {
    const dm = await interaction.member.createDM();
    const deleteMessages = await dm.messages.fetch({ limit: 100 });
    let deletedCount = 0;
    await interaction.reply({flags: 64, content: `${obterEmoji(8)} | Irei apagar todas as mensagens da nossa conversa privada!` });

    deleteMessages.forEach(async (msg) => {
      if (msg.author.bot) {
        await msg.delete();
        deletedCount++;
        await interaction.editReply({flags: 64, content: `${obterEmoji(8)} | Total de mensagens apagadas: ${deletedCount}` });
      }
    });
  }
}
