const Discord = require("discord.js");
const { MessageEmbed, PermissionFlagsBits, ButtonBuilder, MessageCollector, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { PagamentosSaldos, Keys, giftcards, General, StatusCompras, usuariosinfo } = require("../../../DataBaseJson");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
var uu = db.table('messagepixgerar')
const mercadopago = require("mercadopago");
const { Rank } = require("../../FunctionsAll/rank");
module.exports = {
  name: "rank",
  description: '[🛠|🎫 Vendas Moderação] Veja o rank das pessoas que mais abriram tickets',
  type: Discord.ApplicationCommandType.ChatInput,
  

  run: async (client, interaction, message) => {
    Rank(interaction)
  }
}