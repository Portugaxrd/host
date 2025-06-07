const Discord = require("discord.js");
const { PrimaryConfigMessage } = require("../../FunctionsAll/PainelSettings");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");


module.exports = {
  name: "config_painel",
  description: "[🎫| Ticket Moderação] Configure um Painel Ticket",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    { name: 'id', description: 'Coloque o id do ticket que deseja setar a mensagem!', type: 3, required: true, autocomplete: true },
  ],

  run: async (client, interaction, message) => {

    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
   
    if (interaction.options._hoistedOptions[0].value == 'nada') return interaction.reply({ content: `Nenhum Ticket registrado em seu BOT`, flags: 64 })
    PrimaryConfigMessage(interaction.options._hoistedOptions[0].value,interaction, client, interaction.user.id)
  }
}