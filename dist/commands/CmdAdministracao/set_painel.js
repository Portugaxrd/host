const Discord = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { Tickets, PainelTickets } = require("../../../DataBaseJson");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");

module.exports = {
  name: "set_painel",
  description: "[🎫| Ticket Moderação] Setar uma mensagem de Painel.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    { name: 'id', description: 'Coloque o id do ticket que deseja enviar a mensagem', type: 3, required: true, autocomplete: true },
  ],

  run: async (client, interaction, message) => {


    if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })
  

    if (interaction.options._hoistedOptions[0].value == 'nada') return interaction.reply({ content: `Nenhum produto registrado em seu BOT`, flags: 64 })


    var tttttt = PainelTickets.get(interaction.options._hoistedOptions[0].value)

    var ttttttttt = tttttt.produtos

    var options = []
    for (let iiii = 0; iiii < ttttttttt.length; iiii++) {
      const element = ttttttttt[iiii];
      var bb = Tickets.get(`${element}_Ticket`)

      const option = {
        label: `${bb.settings.title}`,
        description: `${bb.settings.desc}`,
        emoji: `${bb.painel == null ? '🎫' : bb.painel.emoji}`,
        value: `${bb.ID}_Ticket`,
      };
      options.push(option);

    }

    const embed = new EmbedBuilder()
      .setTitle(`${tttttt.settings.title}`)
      .setDescription(`${tttttt.settings.desc}`)
      .setColor("#2b2d31")

    if (tttttt.settings.banner !== null) {
      embed.setImage(tttttt.settings.banner)
    }
    if (tttttt.settings.miniatura !== null) {
      embed.setThumbnail(tttttt.settings.miniatura)
    }
    if (tttttt.settings.rodape !== null && tttttt.settings.rodape !== undefined) {
      embed.setFooter({ text: `${tttttt.settings.rodape}` })
    }
    if (tttttt.settings.color !== null && tttttt.settings.color !== undefined) {
      embed.setColor(`${tttttt.settings.color}`)
  }

    if (options == 0) {
      const options2 = {
        label: `Nenhum Ticket Cadastrado nesse Painel!`,
        emoji: `<a:no1:<a:xanimado:1258101250411597887>>`,
        value: `nada`,
      };

      options.push(options2);


    }

    const MAX_DESCRIPTION_LENGTH = 99;

    // Iterar sobre as opções e limitar o comprimento da descrição
    const limitedOptions = options.map(option => {
      if (option.description && option.description.length > MAX_DESCRIPTION_LENGTH) {
        option.description = option.description.slice(0, MAX_DESCRIPTION_LENGTH);
      }
      return option;
    });
    
    const style2row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('selectopenticket')
          .setPlaceholder(`${PainelTickets.get(`${interaction.options._hoistedOptions[0].value}.settings.placeholder`) == null ? 'Selecione um Ticket' : PainelTickets.get(`${interaction.options._hoistedOptions[0].value}.settings.placeholder`)}`)
          .addOptions(limitedOptions)
      );
    
    interaction.channel.send({ embeds: [embed], components: [style2row] }).then(async msg => {
      try {
        const channel = await client.channels.fetch(tttttt.ChannelID);
        const fetchedMessage = await channel.messages.fetch(tttttt.MessageID);
        await fetchedMessage.delete();
      } catch (error) {
      }


      PainelTickets.set(`${interaction.options._hoistedOptions[0].value}.MessageID`, msg.id)
      PainelTickets.set(`${interaction.options._hoistedOptions[0].value}.ChannelID`, msg.channel.id)
    })


    interaction.reply({ content: `${obterEmoji(8)} | Mensagem Atualizada!`, flags: 64 })


  }
}