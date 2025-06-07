const { ActionRowBuilder, ButtonBuilder } = require("discord.js")
const { Tickets, PainelTickets } = require("../../DataBaseJson")

function PainelPrincipal(client, interaction) {

    const produtos = Tickets.fetchAll()
    const paineis = PainelTickets.fetchAll()

    const embed = {
        "color": 5814783,
        "fields": [
            {
                "name": "> Quantidade de Produtos:",
                "value": `\`🥊 ${produtos.length} produtos\``
            },
            {
                "name": "> Quantidade de Painéis:",
                "value": `\`📦 ${paineis.length} painéis\``
            }
        ],
        "author": {
            "name": "Configuração Ticket V2 - Paineis",
            "icon_url": "https://cdn.discordapp.com/emojis/1262947968504565850.webp?size=96&quality=lossless"
        },
        "footer": {
            "text": "- Todos produtos criados abaixo serão contabilizado acima 😀"
        }
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('criar_produto')
                .setLabel('Criar Produto')
                .setStyle(2)
                .setEmoji('<:maisease:1233110125330563104>'),
            new ButtonBuilder()
                .setCustomId('config_produto')
                .setLabel('Configurar Produto')
                .setStyle(2)
                .setEmoji('<:staff:1232782650385629299>')
                .setDisabled(produtos.length === 0 ? true : false)

        )

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('criar_painel')
                .setLabel('Criar Painel')
                .setStyle(2)
                .setEmoji('<:maisease:1233110125330563104>'),
            new ButtonBuilder()
                .setCustomId('config_painel')
                .setLabel('Configurar Painel')
                .setStyle(2)
                .setEmoji('<:staff:1232782650385629299>')
                .setDisabled(paineis.length === 0 ? true : false)

        )

    

    interaction.reply({ embeds: [embed], components: [row, row2], flags: 64 })


}

module.exports = {
    PainelPrincipal
}