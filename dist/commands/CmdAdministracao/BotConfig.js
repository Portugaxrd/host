const Discord = require("discord.js");
const { updateMessageConfig } = require("../../FunctionsAll/BotConfig");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");

module.exports = {
  name: "botconfig",
  description: "[🛠|🎫 Ticket Moderação] Configuro o bot",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {
    
    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
    updateMessageConfig(interaction, interaction.user.id, client)
    
  }
}