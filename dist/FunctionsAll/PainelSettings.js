const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { obterEmoji } = require("../Handler/EmojiFunctions");
const { PainelTickets, Tickets } = require("../../DataBaseJson");


var uu = db.table('painelsettings')
function PrimaryConfigMessage(id, interaction, client, user) {

    const embed = new EmbedBuilder()
        .setTitle(`${client.user.username} | Gerenciar Painel`)
        .setDescription(`Escolha oque deseja gerenciar:`)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor("#2b2d31")

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("configembedpainelTicket")
                .setLabel('Configurar Embed')
                .setEmoji(`1130704844433403924`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("configprodutospainelTicket")
                .setLabel('Configurar Tickets')
                .setEmoji(`1129252149327568916`)
                .setStyle(3)
                .setDisabled(false),)
    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("atualizarmensagempainelTicket")
                .setLabel('Atualizar Painel')
                .setEmoji(`1130705091062681650`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("deletarpainelTicket")
                .setLabel('Deletar Painel')
                .setEmoji(`1129816299732733973`)
                .setStyle(4)
                .setDisabled(false),)
    if (interaction.message == undefined) {
        interaction.reply({ components: [row, row2], embeds: [embed] }).then(async u => {
            const messages = await interaction.channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            uu.set(lastMessage.id, { user: user, id: id })
        })
    } else {
        interaction.message.edit({ embeds: [embed], components: [row, row2] }).then(u => {

        })
    }
}






async function configembedpainelTicket(interaction, client) {
    var t = await uu.get(interaction.message.id)


    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`Tíltulo Atual: ${PainelTickets.get(`${t.id}.settings.title`)}`)
        .setDescription(`${obterEmoji(19)} **| Descrição Atual:**\n\n${PainelTickets.get(`${t.id}.settings.desc`)}\n\n🎨 | Cor da Embed: ${PainelTickets.get(`${t.id}.settings.color`) == null ? '#2b2d31' : PainelTickets.get(`${t.id}.settings.color`)}\n📒 | Texto do Place Holder: ${PainelTickets.get(`${t.id}.settings.placeholder`) == null ? 'Selecione um Ticket' : PainelTickets.get(`${t.id}.settings.placeholder`)}\n📂 | Banner: ${PainelTickets.get(`${t.id}.settings.banner`) == null ? 'Painel Sem Banner.' : `[Banner](${PainelTickets.get(`${t.id}.settings.banner`)})`}\n🖼️ | Miniatura: ${PainelTickets.get(`${t.id}.settings.miniatura`) == null ? 'Painel Sem Miniatura.' : `[Miniatura](${PainelTickets.get(`${t.id}.settings.miniatura`)})`}`)
        .setColor("#2b2d31")
        .setFooter({ text: `Rodapé Atual: ${PainelTickets.get(`${t.id}.settings.rodape`) == null ? 'Sem Rodapé' : PainelTickets.get(`${t.id}.settings.rodape`)}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("editpainelembedTicket")
                .setLabel('Título da embed')
                .setEmoji(`1123365701479039106`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("editpaineldescTicket")
                .setLabel('Descrição da embed')
                .setEmoji(`1123365701479039106`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("editpainelrodapeTicket")
                .setLabel('Rodapé da embed')
                .setEmoji(`1123365701479039106`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("editpainelplaceholderTicket")
                .setLabel('Place Holder')
                .setEmoji(`1123365701479039106`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("editpainelcolorTicket")
                .setLabel('Cor Embed')
                .setEmoji(`🖌`)
                .setStyle(1)
                .setDisabled(false),)

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("editpainelBannerTicket")
                .setLabel('Banner')
                .setEmoji(`🖼️`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("editpainelMiniaturaTicket")
                .setLabel('Miniatura')
                .setEmoji(`🖼️`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("atualizarmensagempainelTicket")
                .setLabel('Atualizar Painel')
                .setEmoji(`1113522785084518451`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("diasodusadsa78das6y7dsbdbuas")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(1)
                .setDisabled(false),)

    interaction.message.edit({ embeds: [embed], components: [row, row2] })
}




async function atualizarmensagempainel(guildid, painel, client, user) {

    var tttttt = PainelTickets.get(painel)

    var ttttttttt = tttttt.produtos

    const row = new ActionRowBuilder()

    var options = []
    for (let iiii = 0; iiii < ttttttttt.length; iiii++) {
        const element = ttttttttt[iiii];
        var bb = Tickets.get(`${element}_Ticket`)

        const option = {
            label: `${bb.settings.title}`,
            description: (() => {
              const description = `${bb.settings.desc}`;
              return description.length <= 99 ? description : description.slice(0, 99);
            })(),
            emoji: `${bb.painel == null ? `🎫` : bb.painel.emoji}`,
            value: `${bb.ID}_Ticket`,
          };
          
        options.push(option);


        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`${bb.ID}_Ticket`)
                .setLabel(`${bb.settings.title}`)
                .setEmoji(`${bb.painel == null ? `🎫` : bb.painel.emoji}`)
                .setStyle(2)
        )

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
            emoji: `🎫`,
            value: `nada`,
        };

        options.push(options2);

    }

    const style2row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('selectopenticket')
                .setPlaceholder(`${PainelTickets.get(`${painel}.settings.placeholder`) == null ? 'Selecione um Ticket' : PainelTickets.get(`${painel}.settings.placeholder`)}`)
                .addOptions(options)
        )

    if (tttttt.type == 'Select') {
        try {
            const channel = await client.channels.fetch(tttttt.ChannelID)
            const fetchedMessage = await channel.messages.fetch(tttttt.MessageID);

            await fetchedMessage.edit({ embeds: [embed], components: [style2row] });
        } catch (error) {

        }
    }else{
        try {
            const channel = await client.channels.fetch(tttttt.ChannelID)
            const fetchedMessage = await channel.messages.fetch(tttttt.MessageID);

            await fetchedMessage.edit({ embeds: [embed], components: [row] });
        } catch (error) {

        }
    }


}







async function configticketsspainel(interaction, client) {
    var t = await uu.get(interaction.message.id)


    var tt = PainelTickets.get(`${t.id}.produtos`)

    const options = [];
    var messageeee = ''
    for (let iiii = 0; iiii < tt.length; iiii++) {
        const element = tt[iiii];
        var bb = Tickets.get(`${element}_Ticket`)

        messageeee += `${bb.painel == null ? `🎫` : bb.painel.emoji} | **${iiii}°** - ${obterEmoji(12)} | **ID:** ${bb.ID}\n`


        const option = {
            label: `${bb.settings.title}`,
            description: `${bb.settings.desc.substring(0, 99)}`,
            emoji: `${bb.painel == null ? `🎫` : bb.painel.emoji}`,
            value: `${element}_Ticket`,
          };
        options.push(option);

    }

    if (options == 0) {
        const options2 = {
            label: `Nenhum Ticket Cadastrado nesse Painel!`,
            emoji: `🎫`,
            value: `nada`,
        };

        options.push(options2);
        messageeee += `Sem Ticket, adicione!`

    }

    messageeee += `\n Tipo do Painel - ( \`${PainelTickets.get(`${t.id}.type`)}\` )`


    const embed = new EmbedBuilder()
        .setTitle(`Estes são os Ticket cadastrados no Painel:`)
        .setDescription(messageeee)
        .setFooter({ text: `Caso queira trocar o emoji de algum TICKET, selecione ele no select menu abaixo:`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor("#2b2d31")

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("addprodutopainelTicket")
                .setLabel('Adicionar Ticket')
                .setEmoji(`1130719046220914759`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("removeprodutopainelTicket")
                .setLabel('Remover Ticket')
                .setEmoji(`1130719234771669012`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("changesequenciaprodutosTicket")
                .setLabel('Alterar Sequencia')
                .setEmoji(`1130705091062681650`)
                .setStyle(1)
                .setDisabled(false),)


    const style2row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('changeemojipainelTicket')
                .setPlaceholder('Selecione um Ticket para alterar o Emoji')
                .addOptions(options)
        )

        

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("AlterarButtoneSelectTicket")
                .setLabel('Alterar entre (Button / Select)')
                .setEmoji(`1128072815438991410`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("atualizarmensagempainelTicket")
                .setLabel('Atualizar Painel')
                .setEmoji(`1130705091062681650`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("diasodusadsa78das6y7dsbdbuas")
                .setLabel('Voltar')
                .setEmoji(`1130709508998582353`)
                .setStyle(1)
                .setDisabled(false),
        )

    interaction.message.edit({ embeds: [embed], components: [row, style2row, row2] })
}

module.exports = {
    PrimaryConfigMessage,
    configembedpainelTicket,
    atualizarmensagempainel,
    configticketsspainel
};