const Discord = require("discord.js");
const { MessageEmbed, PermissionFlagsBits, MessageActionRow, MessageCollector, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Tickets } = require("../../../DataBaseJson");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");

module.exports = {
  name: 'criar',
  description: "[🛠|🎫 Ticket Moderação] Criar um Ticket",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'id',
      description: 'Coloque o ID do novo ticket aqui!',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction, message) => {

   
    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
   
    const id = interaction.options.getString('id')

    const traducao2 = `${obterEmoji(22)} | Já possui um TICKET com este nome criado.`
    if(Tickets.get(`${id}_Ticket`) !== null) return interaction.reply({ content: `${traducao2}`, flags: 64 })

    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username} | Sistema de Ticket`)
      .setDescription(`➡️ Clique abaixo para abrir um TICKET na categoria \`Não configurado ainda...\``)
      .setColor("#2b2d31")

    const row = new ActionRowBuilder()
    row.addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`${id}_Ticket`)
        .setLabel(`Abrir Ticket`)
        .setStyle(1)
        .setEmoji('👋')
        .setDisabled(false),
    )

    interaction.channel.send({ embeds: [embed], components: [row] }).then(msg => {

      Tickets.set(`${id}_Ticket`, {
        ID: id,
        MessageID: msg.id,
        ChannelID: msg.channel.id,
        embedconfig: {
          Button: {
            name: `Abrir Ticket`,
            emoji: `👋`,
            color: 1
          }
        },
        settings: {
          title: `${client.user.username} | Sistema de Ticket`,
          desc: `➡️ Clique abaixo para abrir um TICKET na categoria \`Não configurado ainda...\``,
        },
        functions: {
          criarcall: true,
          poke: true,
          assumir: true,
          renomear: true,
          pagamentos: true,
          gerenciarmembro: true,
          peguntas: false,
          protocolo: false
        },
        permsTicket: []
      })
    })


    const traducao = `${obterEmoji(8)} | Ticket criado com sucesso!, use /config \`${id}\` Para configura-lo`
    interaction.reply({ content: traducao, flags: 64 });

  }
}