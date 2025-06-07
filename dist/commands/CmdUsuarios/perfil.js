const Discord = require("discord.js");
const { MessageEmbed, PermissionFlagsBits, ButtonBuilder, MessageCollector, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { PagamentosSaldos, Keys, giftcards, General, StatusCompras, usuariosinfo, PerfilMembros, TicketsSave } = require("../../../DataBaseJson");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
var uu = db.table('messagepixgerar')
const mercadopago = require("mercadopago");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
module.exports = {
  name: "perfil",
  description: '[🧀|🎫 Ticket Ultilidades] Veja o seu perfil ou o perfil de algum usuário',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "Selecione o usuário abaixo:",
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction, message) => {
    let valor = interaction.options.getUser('user');

    var usu = null
    if (valor == null) {
      usu = interaction.user.id
    } else {
      usu = valor.id
    }

    const member = await interaction.guild.members.fetch(usu);

    var hh = PerfilMembros.fetchAll()
    hh.sort((a, b) => b.data.Abriu - a.data.Abriu);
    const posicao = hh.findIndex(obj => obj.ID === usu);


    var tt = PerfilMembros.get(usu)

    var getall = TicketsSave.fetchAll()

    var aberto = false
    for (let i = 0; i < getall.length; i++) {
      const element = getall[i];

      if (element.data.Usuario === usu) {
        try {
          channela = await client.channels.fetch(element.data.ChannelID)

          aberto = true



        } catch (error) {

        }
      }

    }
    var rank
    if (posicao == -1) {
      rank = `não está no rank de posições`
    } else {
      rank = `está na __${posicao + 1}°__ posição do rank!`
    }

    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setThumbnail(interaction.guild.iconURL())
      .setTitle(`Perfil do Usuário | ${member.user.username}`)
      .setDescription(`${obterEmoji(33)} | Possui algum Ticket em andamento: \`${aberto === false ? 'Não' : 'Sim'}\`
      ${obterEmoji(34)} | Quantos Tickets já Finalizados: \`\`${tt?.Abriu == null ? '0' : `${tt?.Abriu}`}\`\`
      🙋‍♂️ | Quantos Tickets Assumidos: \`${tt?.assumidos == null ? '0' : `${tt?.assumidos}`}\`
      ${obterEmoji(5)} | Rank: ${member.user.username} ${rank}`)

    interaction.reply({ embeds: [embed], flags: 64 })
  }
}