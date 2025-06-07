
const { ButtonBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, TextInputBuilder, EmbedBuilder, ActionRowBuilder, TextInputStyle, ComponentType, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require('discord.js');
const { obterEmoji } = require('../Handler/EmojiFunctions');
const { General, configgeral, Tickets } = require('../../DataBaseJson');

const { QuickDB } = require("quick.db");
const db = new QuickDB();
var uu = db.table('permissionsmessage33')

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
        time: 240000
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

async function ConfigTicket(interaction, ticket, client, user) {
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`${obterEmoji(19)} | **Descrição:**\n\n${Tickets.get(`${ticket}_Ticket.settings.desc`)}\n\n${obterEmoji(7)} | Id: ${Tickets.get(`${ticket}_Ticket.ID`)}\n${obterEmoji(31)} | Title: ${Tickets.get(`${ticket}_Ticket.settings.title`)}\n\n${obterEmoji(1)} Funções:\nCriar Call: \`${Tickets.get(`${ticket}_Ticket.functions.criarcall`) == false ? `Desligado` : `Ligado`}\`\nPoke: \`${Tickets.get(`${ticket}_Ticket.functions.poke`) == false ? `Desligado` : `Ligado`}\`\nAssumir: \`${Tickets.get(`${ticket}_Ticket.functions.assumir`) == false ? `Desligado` : `Ligado`}\`\nRenomear: \`${Tickets.get(`${ticket}_Ticket.functions.renomear`) == false ? `Desligado` : `Ligado`}\`\nPagamentos: \`${Tickets.get(`${ticket}_Ticket.functions.pagamentos`) == false ? `Desligado` : `Ligado`}\`\nGerenciar Membro: \`${Tickets.get(`${ticket}_Ticket.functions.gerenciarmembro`) == false ? `Desligado` : `Ligado`}\``)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })


    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("alterartitleTicket")
                .setLabel('Titulo')
                .setEmoji(`<:1264745115809878112:1272715864646483968>`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("alterardescTicket")
                .setLabel('Descrição')
                .setEmoji(`1072999802549325895`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("alterarfunctionsTicket")
                .setLabel('Funções')
                .setEmoji(`1127811826026033173`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarBannerTicket")
                .setLabel('Banner')
                .setEmoji(`🖼️`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarMiniaturaTicket")
                .setLabel('Miniatura')
                .setEmoji(`🖼️`)
                .setStyle(3)
                .setDisabled(false))

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("configuracaoavancadaticket")
                .setLabel('Configurações Avançadas')
                .setEmoji(`<:staff:1240114382298546217>`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("atualizarmensgaemticket")
                .setLabel('Atualizar Mensagem')
                .setEmoji(`1113522785084518451`)
                .setStyle(1)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("deletarTicket")
                .setLabel('DELETAR')
                .setEmoji(`1088982783369691247`)
                .setStyle(4)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("infoticket")
                .setEmoji(`1089069173876989992`)
                .setStyle(1)
                .setDisabled(false),)

    if (interaction.message == undefined) {
        await interaction.reply({ embeds: [embed], components: [row, row2] }).then(async u => {
            const messages = await interaction.channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();
            uu.set(lastMessage.id, { user: user, ticket: ticket })
            createCollector(u);
        })
    } else {
        interaction.message.edit({ embeds: [embed], components: [row, row2] }).then(u => {
            createCollector(u);
        })
    }
}


function alterartitleTicket(interaction, ticket, user, client) {
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`${obterEmoji(31)} **| Title:** ${Tickets.get(`${ticket}_Ticket.settings.title`)}\n\nEnvie o novo nome abaixo:`)

    interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {

        const filter = message => message.author.id === interaction.user.id
        const collector = interaction.channel.createMessageCollector({ filter: filter, time: 240000, limit: 1 })
        collector.on('collect', async (message) => {
            message.delete()
            collector.stop()
            if (message.content == '') {
                ConfigTicket(interaction, ticket, client, user)
                return
            }
            Tickets.set(`${ticket}_Ticket.settings.title`, message.content)
            msg.reply({ content: `${obterEmoji(8)} | O nome foi atualizado com sucesso para \`${message.content}\`.` }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            ConfigTicket(interaction, ticket, client, user)
        })
        collector.on('end', async (message) => {
            message.delete()
            collector.stop()
            if (message.size >= 1) return
            try {
                await interaction.message.edit({
                    content: `${obterEmoji(21)} | Use o Comando Novamente!`,
                    components: [],
                    embeds: []
                })
            } catch (error) {

            }

        });
    })
}




function alterardescTicket(interaction, ticket, user, client) {
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`${obterEmoji(31)} **| Descrição:** ${Tickets.get(`${ticket}_Ticket.settings.desc`)}\n\nEnvie a nova descrição abaixo:`)

    interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {

        const filter = message => message.author.id === interaction.user.id
        const collector = interaction.channel.createMessageCollector({ filter: filter, time: 240000, limit: 1 })
        collector.on('collect', async (message) => {
            message.delete()
            collector.stop()
            if (message.content == '') {
                ConfigTicket(interaction, ticket, client, user)
                return
            }
            Tickets.set(`${ticket}_Ticket.settings.desc`, message.content)
            msg.reply({ content: `${obterEmoji(8)} | A descrição foi atualizado com sucesso para:\n\n${message.content}.` }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            ConfigTicket(interaction, ticket, client, user)
        })
        collector.on('end', async (message) => {
            message.delete()
            collector.stop()
            if (message.size >= 1) return
            try {
                await interaction.message.edit({
                    content: `${obterEmoji(21)} | Use o Comando Novamente!`,
                    components: [],
                    embeds: []
                })
            } catch (error) {

            }

        });
    })
}

function alterarfunctionsTicket(interaction, ticket, user, client) {
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`${obterEmoji(1)} Funções:\nCriar Call: \`${Tickets.get(`${ticket}_Ticket.functions.criarcall`) == false ? `Desligado` : `Ligado`}\`\nPoke: \`${Tickets.get(`${ticket}_Ticket.functions.poke`) == false ? `Desligado` : `Ligado`}\`\nAssumir: \`${Tickets.get(`${ticket}_Ticket.functions.assumir`) == false ? `Desligado` : `Ligado`}\`\nRenomear: \`${Tickets.get(`${ticket}_Ticket.functions.renomear`) == false ? `Desligado` : `Ligado`}\`\nPagamentos: \`${Tickets.get(`${ticket}_Ticket.functions.pagamentos`) == false ? `Desligado` : `Ligado`}\`\nGerenciar Membro: \`${Tickets.get(`${ticket}_Ticket.functions.gerenciarmembro`) == false ? `Desligado` : `Ligado`}\``)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })


    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("togglecriarcall")
                .setLabel('Criar Call (ON / OFF)')
                .setEmoji(`1128033945053839482`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("togglepoke")
                .setLabel('Poke (ON / OFF)')
                .setEmoji(`1128033973130510476`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("toggleassumir")
                .setLabel('Assumir (ON / OFF)')
                .setEmoji(`1128033992369786901`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("togglerenomear")
                .setLabel('Renomear (ON / OFF)')
                .setEmoji(`1128034029187366912`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("togglepagamentos")
                .setLabel('Pagamentos (ON / OFF)')
                .setEmoji(`1128034052755161138`)
                .setStyle(2)
                .setDisabled(false))

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("togglegerenciarmembro")
                .setLabel('Gerenciar Membros (ON / OFF)')
                .setEmoji(`1128034072875257926`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("returnprincipalconfig")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(4)
                .setDisabled(false))


    interaction.message.edit({ embeds: [embed], components: [row, row2] }).then(u => {
        createCollector(u);
    })
}

function togglesfunctions(interaction, ticket, client) {
    if (interaction.customId == 'togglecriarcall') {
        Tickets.set(`${ticket}_Ticket.functions.criarcall`, !Tickets.get(`${ticket}_Ticket.functions.criarcall`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'togglepoke') {
        Tickets.set(`${ticket}_Ticket.functions.poke`, !Tickets.get(`${ticket}_Ticket.functions.poke`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'toggleassumir') {
        Tickets.set(`${ticket}_Ticket.functions.assumir`, !Tickets.get(`${ticket}_Ticket.functions.assumir`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'togglerenomear') {
        Tickets.set(`${ticket}_Ticket.functions.renomear`, !Tickets.get(`${ticket}_Ticket.functions.renomear`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'togglepagamentos') {
        Tickets.set(`${ticket}_Ticket.functions.pagamentos`, !Tickets.get(`${ticket}_Ticket.functions.pagamentos`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'togglegerenciarmembro') {
        Tickets.set(`${ticket}_Ticket.functions.gerenciarmembro`, !Tickets.get(`${ticket}_Ticket.functions.gerenciarmembro`))
        alterarfunctionsTicket(interaction, ticket, null, client)
    }
    if (interaction.customId == 'ToggleModalPerguntas') {
        Tickets.set(`${ticket}_Ticket.functions.peguntas`, !Tickets.get(`${ticket}_Ticket.functions.peguntas`))
        configuracaoavancadaticket(interaction, ticket, client)
    }
    if (interaction.customId == 'ToggleProtocoloTicket') {
        Tickets.set(`${ticket}_Ticket.functions.protocolo`, !Tickets.get(`${ticket}_Ticket.functions.protocolo`))
        configuracaoavancadaticket(interaction, ticket, client)
    }

}

function configuracaoavancadaticket(interaction, ticket, client) {
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`Escolha baixo qual das configurações avançadas deseja alterar.\n\n Sistema de Modal (Perguntas) - \`${Tickets.get(`${ticket}_Ticket.functions.peguntas`) == false ? `Desligado` : `Ligado`}\`\n Sistema de Protocolo (Visual) - \`${Tickets.get(`${ticket}_Ticket.functions.protocolo`) == false ? `Desligado` : `Ligado`}\`\n\n Categoria Selecionada - ${Tickets.get(`${ticket}_Ticket.Categoria`) == null ? `\`Desligado\`` : `**<#${Tickets.get(`${ticket}_Ticket.Categoria`)}>**`}`)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })


    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("changeButtonTicket")
                .setLabel('Alterar Button')
                .setEmoji(`1128072815438991410`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("configcargoTicket")
                .setLabel('Configurar Cargos')
                .setEmoji(`1128072786447966381`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ToggleModalPerguntas")
                .setLabel('Motivo da Abertura (ON / OFF)')
                .setEmoji(`1128750600503427142`)
                .setStyle(2)
                .setDisabled(false))

    const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("SelecionarumaCategoria")
                .setLabel('Selecionar uma Categoria')
                .setEmoji(`1129235891626450954`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ToggleProtocoloTicket")
                .setLabel('Sistema de Protocolo (ON / OFF)')
                .setEmoji(`1129243829413888000`)
                .setStyle(2)
                .setDisabled(false))

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("returnprincipalconfig")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(4)
                .setDisabled(false))


    interaction.message.edit({ embeds: [embed], components: [row, row1, row2] }).then(u => {
        createCollector(u);
    })
}


function changeButtonTicket(interaction, ticket, client) {

    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Ticket`)
        .setDescription(`Escolha baixo qual das configurações avançadas deseja alterar.`)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })


    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("AlterarNomeButtonTicket")
                .setLabel('Alterar Nome Button')
                .setEmoji(`1128034029187366912`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarEmojiButtonTicket")
                .setLabel('Alterar Emoji Button')
                .setEmoji(`1128072815438991410`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarCorButtonTicket")
                .setLabel('Alterar Cor Button')
                .setEmoji(`1128726637970735254`)
                .setStyle(2)
                .setDisabled(false))

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("configuracaoavancadaticket")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(4)
                .setDisabled(false))

    interaction.message.edit({ embeds: [embed], components: [row, row2] }).then(u => {
        createCollector(u);
    })

}


function configcargoTicket(interaction, ticket, client) {

    var permsTicket = Tickets.get(`${ticket}_Ticket.permsTicket`)

    var resultado = '- <@&' + permsTicket.join(">\n- <@&") + '>';
    if (resultado == '- <@&>') resultado = 'Nenhum cargo definido.'
    const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`${client.user.username} | Gerenciar Cargos Ticket`)
        .setDescription(`Cargos selecionados:\n\n${resultado}`)
        .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const select = new ActionRowBuilder()
        .addComponents(
            new RoleSelectMenuBuilder()
                .setCustomId('ChangeTicketRoleaudakhbda')
                .setPlaceholder('Selecione abaixo qual cargo terá permissão nesse ticket.')
                .setMaxValues(20)

        )

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("configuracaoavancadaticket")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(2)
                .setDisabled(false),
        )
    interaction.message.edit({ embeds: [embed], components: [select, row2] }).then(u => {
        createCollector(u);
    })

}





module.exports = {
    ConfigTicket,
    alterartitleTicket,
    alterardescTicket,
    alterarfunctionsTicket,
    togglesfunctions,
    configuracaoavancadaticket,
    changeButtonTicket,
    configcargoTicket
};