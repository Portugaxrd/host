const Discord = require("discord.js");

const { ButtonBuilder, ComponentType, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");
const db = new QuickDB();
var uu = db.table('per2mis2sionsm2essa2ge2')
module.exports = {
  name: "resetar",
  description: '[🛠 |🎫 Tickets Moderação] resete os paineis, o rank, etc.',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {
    
    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
   
    const editEmbed = {
      content: `${obterEmoji(21)} | Use o Comando Novamente!`,
      components: [],
      embeds: []
    };

    const editMessage = async (message) => {
      try {
        await message.edit(editEmbed)
      } catch (error) {

      }

    };

    const createCollector = (message) => {
      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 120000
      });

      collector.on('collect', () => {
        collector.stop();
      });

      collector.on('end', (collected) => {
        if (collected.size === 0) {

          editMessage(message);

        }
      });
    };

    // StartPersonalizarMessage(interaction, client, interaction.user.id)
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setTitle(`${client.user.username} | Sistema de Tickets`)
      .setDescription(`Clique no que você deseja resetar:`)
      .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("resetperfilestatisticasTickets")
          .setLabel('Estatísticas e Perfil')
          .setEmoji(`1123365701479039106`)
          .setStyle(1)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("ResasdsadetsadasdasdsadasTicketsandPaineis")
          .setLabel('Rank Tickets')
          .setEmoji(`1123365701479039106`)
          .setStyle(1)
          .setDisabled(false),
          new ButtonBuilder()
          .setCustomId("ResetwadawdawTicketsandPaineis")
          .setLabel('Tickets e Paineis')
          .setEmoji(`1123365701479039106`)
          .setStyle(1)
          .setDisabled(false),)
      

    interaction.reply({ embeds: [embed], components: [row] }).then(async u => {
      const messages = await interaction.channel.messages.fetch({ limit: 1 });
      const lastMessage = messages.first();
      uu.set(lastMessage.id, interaction.user.id)
      createCollector(u)
    })
  }
}