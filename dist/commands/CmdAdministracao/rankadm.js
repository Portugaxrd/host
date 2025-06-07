const Discord = require("discord.js");
const { MessageEmbed, PermissionFlagsBits, ButtonBuilder, MessageCollector, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { PagamentosSaldos, Keys, giftcards, General, StatusCompras, usuariosinfo } = require("../../../DataBaseJson");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { obterEmoji } = require("../../Handler/EmojiFunctions");
var uu = db.table('messagepixgerar')
const mercadopago = require("mercadopago");
const { RankAdm } = require("../../FunctionsAll/rank");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");
module.exports = {
  name: "rankadm",
  description: '[🛠|🎫 Tickets Moderação] Veja o rank das pessoas que mais compraram',
  type: Discord.ApplicationCommandType.ChatInput,
  

  run: async (client, interaction, message) => {
   
    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
   
    RankAdm(interaction)

   
  }
}