const Discord = require("discord.js");
const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { Tickets } = require("../../../DataBaseJson");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");

module.exports = {
  name: "set",
  description: "[🎫| Ticket Moderação] Setar uma mensagem de TICKET.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    { name: 'id', description: 'Coloque o id do ticket que deseja enviar a mensagem', type: 3, required: true, autocomplete: true },
  ],

  run: async (client, interaction, message) => {

    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
   
    var ticketid = interaction.options._hoistedOptions[0].value

    var gg = Tickets.get(`${ticketid}_Ticket`)

    const embed = new EmbedBuilder()
      .setTitle(gg.settings.title)
      .setDescription(gg.settings.desc)
      .setColor('#2b2d31')

    if (gg.embedconfig.message !== undefined) {
      if (gg.embedconfig.message.banner !== null) {
        embed.setImage(gg.embedconfig.message.banner)
      }
      if (gg.embedconfig.message.miniatura !== null) {
        embed.setThumbnail(gg.embedconfig.message.miniatura)
      }
    }

    const row = new ActionRowBuilder()
    row.addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`${ticketid}_Ticket`)
        .setLabel(`${gg.embedconfig.Button.name}`)
        .setStyle(gg.embedconfig.Button.color)
        .setEmoji(`${gg.embedconfig.Button.emoji}`)
        .setDisabled(false),
    )

    try {


       const channel = await client.channels.cache.get(gg.ChannelID);
      await channel.messages.fetch(gg.MessageID)
        .then(async message => {
          try {
            await message.delete()
          } catch (error) {

          }

        })
    } catch (error) {

    }

    interaction.reply({ content: `${obterEmoji(8)} | Mensagem enviada com sucesso.`, flags: 64 })
    interaction.channel.send({ embeds: [embed], components: [row] }).then(msg => {
      Tickets.set(`${ticketid}_Ticket.MessageID`, msg.id)
      Tickets.set(`${ticketid}_Ticket.ChannelID`, msg.channel.id)
    })
  }
}
