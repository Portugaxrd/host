const Discord = require("discord.js");
const { ButtonBuilder, ComponentType, ActionRowBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const db = new QuickDB();
var uu = db.table('permissionsmesww2222sage2')

module.exports = {
  name: "help",
  description: '[🛠 | 🎫 Informações] Exibe todos os meus comandos.',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {

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

    const embed = new Discord.EmbedBuilder()
      .setColor("#2b2d31")
      .setTitle(`${client.user.username} | Comandos Liberados Para todos os Usuários`)
      .addFields(
        {
          name: `${obterEmoji(1)} /help`,
          value: `\`Exibe essa mensagem.\``
        },
        {
          name: `${obterEmoji(1)} /perfil`,
          value: `\`Mostra o perfil de quem enviou o comando.\``
        },
        {
          name: `${obterEmoji(1)} /rank`,
          value: `\`Mostra o rank de pessoas que mais abriram tickets.\``
        },
        {
          name: `${obterEmoji(1)} /cleardm`,
          value: `\`Apagar as mensagens do bot da sua dm.\``
        },
      )
      .setFooter({ text: `Página 1/2`, iconURL: interaction.guild.iconURL() })

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("aiygdasigydawdawdw67t2t32bh32yu3")
          .setLabel('Comandos Adm')
          .setEmoji(`<:staff:1240114382298546217>`)
          .setStyle(1)
          .setDisabled(false),
      )

    interaction.reply({ embeds: [embed], components: [row] }).then(async u => {
      const messages = await interaction.channel.messages.fetch({ limit: 1 });
      const lastMessage = messages.first();
      uu.set(lastMessage.id, interaction.user.id)
      createCollector(u)
    })
  }
}
