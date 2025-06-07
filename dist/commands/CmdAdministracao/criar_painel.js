const Discord = require("discord.js");
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Tickets, PainelTickets } = require("../../../DataBaseJson");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");

module.exports = {
  name: `criarpainel`,
  description: "[🛠|🎫 Ticket Moderação] Criar um Painel Select Menu ou Button Para Seus Ticket",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'id',
      description: 'Coloque o ID do novo Painel aqui!',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    },
    { name: 'ticket_id', description: 'Coloque o id de um ticket para ser adicionado no painel', type: 3, required: true, autocomplete: true },
  ],

  run: async (client, interaction, message) => {

    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `${obterEmoji(7)} | Já esxiste um painel com esse id, use /config_painel \`${id}\`, para configura-lo`, flags: 64 })

    const embed = new EmbedBuilder()
      .setTitle(`Não configurado ainda...`)
      .setDescription(`Não configurado ainda...`)
      .setColor("#2b2d31")
    var tt = Tickets.get(`${ticketid}_Ticket`)

    const style2row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('selectopenticket')
          .setPlaceholder('Selecione um Ticket')
          .addOptions(
            validateOptions([
              {
                label: `${tt.settings.title}`,
                description: `${tt.settings.desc}`,
                emoji: `🎫`,
                value: `${ticketid}_Ticket`,
              },
            ])
          )
      );

    function validateOptions(options) {
      const MAX_DESCRIPTION_LENGTH = 100;
      const MAX_LABEL_LENGTH = 100;

      return options.map(option => {
        if (option.description && option.description.length > MAX_DESCRIPTION_LENGTH) {
          option.description = option.description.slice(0, MAX_DESCRIPTION_LENGTH);
        }

        if (option.label && option.label.length > MAX_LABEL_LENGTH) {
          option.label = option.label.slice(0, MAX_LABEL_LENGTH);
        }

        return option;
      });
    }

    interaction.channel.send({ embeds: [embed], components: [style2row] }).then(msg => {
      PainelTickets.set(id, {
        ID: id, produtos: [ticketid], ChannelID: msg.channel.id, MessageID: msg.id, settings: {
          title: 'Não configurado ainda...',
          desc: 'Não configurado ainda...'
        },
        type: `Select`
      })
    })
    interaction.reply({ flags: 64, content: `${obterEmoji(8)} | Painel criado com sucesso!, use **/config_painel** \`${id}\` Para configura-lo`, flags: 64 })
  }
}