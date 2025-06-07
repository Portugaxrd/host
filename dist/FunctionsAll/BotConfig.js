
const { ButtonBuilder, PermissionFlagsBits, ChannelType, ModalBuilder, TextInputBuilder, EmbedBuilder, ActionRowBuilder, TextInputStyle, ComponentType, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require('discord.js');
const { obterEmoji } = require('../Handler/EmojiFunctions');
const { General, configgeral } = require('../../DataBaseJson');

const { QuickDB } = require("quick.db");
const db = new QuickDB();
var uu = db.table('permissionsmessage')


const editEmbed = {
    content: `⚠ | Use o Comando Novamente!`,
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

async function updateMessageConfig(interaction, user, client) {

    let embed = {
        "color": 5814783,
        "fields": [
            {
                "name": "> Status ticket:",
                "value": `\`${General.get('ConfigGeral').StatusTicket == 'ON' ? `🟢 Ativado` : `🔴 Desativado`}\``
            },
            {
                "name": "> Use os botões abaixo para configurar seu bot:",
                "value": `[Link de Convite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`
            }
        ],
        "author": {
            "name": "Configuração Ticket V2",
            "icon_url": "https://cdn.discordapp.com/emojis/1262947968504565850.webp?size=96&quality=lossless"
        }
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("ToggleTickets")
                .setEmoji(`${General.get('ConfigGeral').StatusTicket == 'ON' ? `<:Ligado:1257790226500161577>` : `<:desligar:1257790227997524010>`}`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ConfigurarPaymentTicket")
                .setLabel('Configurar Pagamento')
                .setEmoji(`<:dinheiro_branco:1242917506247692491>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ConfigurarBotGeral")
                .setLabel('Configurar Bot')
                .setEmoji(`<:1261427946636443720:1272669390835290183>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ConfigurarCanaisTicket")
                .setLabel('Configurar Canais & Cargos')
                .setEmoji(`<:staff:1240114382298546217>`)
                .setStyle(2)
                .setDisabled(false))

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("ConfigurarPainel")
                .setLabel('Configurar Painel')
                .setEmoji(`<:copy:1233200554252042260>`)
                .setStyle(2)
                .setDisabled(false),
        )

    if (interaction.message == undefined) {
        await interaction.reply({ embeds: [embed], components: [row, row2], flags: 64 })
    } else {
        interaction.update({ embeds: [embed], components: [row, row2] })
    }
}

async function ToggleTickets(interaction, user, client) {
    const currentStatus = General.get(`ConfigGeral.StatusTicket`);
    const newStatus = currentStatus === 'ON' ? 'OFF' : 'ON';
    General.set(`ConfigGeral.StatusTicket`, newStatus);

    updateMessageConfig(interaction, user, client)
}



async function ConfigurarPaymentTicket(interaction, user, client) {

}


async function ConfigMPTicket(interaction, user, client) {


    const embed = {
        "color": 5814783,
        "fields": [
            {
                "name": "> Status PIX:",
                "value": `\`${General.get('ConfigGeral').MercadoPagoConfig.PixToggle == 'ON' ? `🟢 Ativado` : `🔴 Desativado`}\``
            },
            {
                "name": "> Status PIX (Site):",
                "value": `\`${General.get('ConfigGeral').MercadoPagoConfig.SiteToggle == 'ON' ? `🟢 Ativado` : `🔴 Desativado`}\``
            },
            {
                "name": "> Tempo máximo para pagar:",
                "value": `\`🕐 ${General.get('ConfigGeral').MercadoPagoConfig.TimePagament} minutos\``
            },
            {
                "name": "> Authorization (Mercado Pago):",
                "value": `${General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP !== "" ? `\`${String(General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP).substring(0, 20)}\`` : '\`🔴 Não definido\`'}`
            }
        ],
        "author": {
            "name": "Configuração Ticket V2 - Pagamentos",
            "icon_url": "https://cdn.discordapp.com/emojis/1262947968504565850.webp?size=96&quality=lossless"
        }
    }

    // const embed = new EmbedBuilder()
    //     .setColor("#2b2d31")
    //     .setAuthor({ name: `${client.user.username}`, iconURL: interaction.guild.iconURL() })
    //     .setThumbnail(interaction.guild.iconURL())
    //     .setDescription(`${obterEmoji(15)} **| Configurar Mercado Pago**\n\n${obterEmoji(18)} | Pix: ${General.get('ConfigGeral').MercadoPagoConfig.PixToggle}\n${obterEmoji(15)} | Pagar pelo Site: ${General.get('ConfigGeral').MercadoPagoConfig.SiteToggle}\n🕗 | Tempo Máximo para pagar: ${General.get('ConfigGeral').MercadoPagoConfig.TimePagament} Minutos\n${obterEmoji(1)} | Access Token: ${General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP !== "" ? `\|\|${General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP}\|\|` : 'Não definido'}`)
    //     .setColor("#2b2d31")

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("PixMPToggleTicket")
                .setEmoji(`${General.get('ConfigGeral').MercadoPagoConfig.PixToggle == 'ON' ? `<:Ligado:1257790226500161577>` : `<:desligar:1257790227997524010>`}`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("SiteMPToggleTicket")
                .setEmoji(`${General.get('ConfigGeral').MercadoPagoConfig.SiteToggle == 'ON' ? `<:Ligado:1257790226500161577>` : `<:desligar:1257790227997524010>`}`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("TimePagamentTicket")
                .setLabel('Tempo para Pagar')
                .setEmoji(`<:lembrar:1229787808936230975>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("TokenAcessMPTicket")
                .setLabel('Alterar Access Token')
                .setEmoji(`<:1264753574316085330:1272669388688064522>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("returnconfigTicket")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(2)
                .setDisabled(false),)
    interaction.update({ embeds: [embed], components: [row] })

}


async function ToggeMPTicket(interaction, user, client) {
    if (interaction.customId == 'PixMPToggleTicket') {
        const currentStatus = General.get(`ConfigGeral.MercadoPagoConfig.PixToggle`);
        const newStatus = currentStatus === 'ON' ? 'OFF' : 'ON';
        General.set(`ConfigGeral.MercadoPagoConfig.PixToggle`, newStatus);
        ConfigMPTicket(interaction, user, client)
    }
    if (interaction.customId == 'SiteMPToggleTicket') {
        const currentStatus = General.get(`ConfigGeral.MercadoPagoConfig.SiteToggle`);
        const newStatus = currentStatus === 'ON' ? 'OFF' : 'ON';
        General.set(`ConfigGeral.MercadoPagoConfig.SiteToggle`, newStatus);
        ConfigMPTicket(interaction, user, client)
    }

    if (interaction.customId == 'TimePagamentTicket') {
        const modalaAAA = new ModalBuilder()
            .setCustomId('tempoMP1232')
            .setTitle(`Alterar Tempo`);

        const newnameboteN = new TextInputBuilder()
            .setCustomId('timeMP')
            .setLabel("TEMPO: (ENTRE 5 A 20 MINUTOS)")
            .setPlaceholder("10")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(256)

        const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
        modalaAAA.addComponents(firstActionRow3);
        await interaction.showModal(modalaAAA);
    }

    if (interaction.customId == 'TokenAcessMPTicket') {
        const modalaAA = new ModalBuilder()
            .setCustomId('tokenMPTicket')
            .setTitle(`Alterar Token`);

        const newnameboteN = new TextInputBuilder()
            .setCustomId('tokenMP')
            .setLabel("TOKEN: APP_USR-2837005141447972-076717-c37...")
            .setPlaceholder("APP_USR-2837005141447972-076717-c37...")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(256)

        const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
        modalaAA.addComponents(firstActionRow3);
        await interaction.showModal(modalaAA);
    }
}


async function TimeMPTicket(interaction, user, client) {
    if (interaction.customId === 'tempoMP1232') {
        const NewTime = interaction.fields.getTextInputValue('timeMP');

        if (/^\d+$/.test(NewTime)) {

            General.set(`ConfigGeral.MercadoPagoConfig.TimePagament`, NewTime)

            await ConfigMPTicket(interaction, user, client)
        } else {
            interaction.reply({ content: `NEGADO: você inseriu em seus VALORES alguma letra`, flags: 64 })
            return
        }
    }
    if (interaction.customId === 'tokenMPTicket') {
        const tokenMP = interaction.fields.getTextInputValue('tokenMP');

        General.set(`ConfigGeral.MercadoPagoConfig.TokenAcessMP`, tokenMP)
        ConfigMPTicket(interaction, user, client)
    }

}



async function configbotTicket(interaction, user, client) {


    const embed = {
        "color": 5814783,
        "fields": [
            {
                "name": "> Nome Atual:",
                "value": `\`${client.user.username}\``
            },
            {
                "name": "> Avatar Atual:",
                "value": `[Avatar](${client.user.displayAvatarURL()})`
            }
        ],
        "author": {
            "name": "Configuração Ticket V2 - BOT",
            "icon_url": "https://cdn.discordapp.com/emojis/1262947968504565850.webp?size=96&quality=lossless"
        }
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("ChangeNameTicket")
                .setLabel('Alterar Nome')
                .setEmoji(`<:cargosease:1233127515141308416>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("ChangeAvatarTicket")
                .setLabel('Alterar Avatar')
                .setEmoji(`<:1264745115809878112:1272715864646483968>`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("returnconfigTicket")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(2)
                .setDisabled(false),)

    await interaction.update({ embeds: [embed], components: [row] })
}


async function configbotToggleTicket(interaction, user, client) {

    if (interaction.customId == 'ChangeNameTicket') {

        const modalaAA = new ModalBuilder()
            .setCustomId('newnamebotticket')
            .setTitle(`Alterar Nome Do BOT`);

        const newnameboteN = new TextInputBuilder()
            .setCustomId('newnamebot')
            .setLabel("NOVO NOME:")
            .setPlaceholder("Novo Nome")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
        modalaAA.addComponents(firstActionRow3);
        await interaction.showModal(modalaAA);

    }

    if (interaction.customId == 'ChangeAvatarTicket') {

        const modalaAA = new ModalBuilder()
            .setCustomId('ChangeAvatarticket')
            .setTitle(`Alterar Avatar Do BOT`);

        const newnameboteN = new TextInputBuilder()
            .setCustomId('ChangeAvatar')
            .setLabel("LINK AVATAR:")
            .setPlaceholder("NOVO AVATAR")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
        modalaAA.addComponents(firstActionRow3);
        await interaction.showModal(modalaAA);

    }
}


async function FunctionCompletConfigTicket(interaction, user, client) {
    if (interaction.customId === 'newnamebotticket') {
        const newnamebot = interaction.fields.getTextInputValue('newnamebot');
        try {
            await client.user.setUsername(newnamebot)
            configbotTicket(interaction, user, client)
        } catch (error) {
            interaction.reply({ flags: 64, content: `ERROR: Sua alteração de NOME falhou, Possiveis motivos: Nome inapropriado, Maximo de caracterias, Nome Generico, Alteração Recente;` })
        }
    }

    if (interaction.customId === 'ChangeAvatarticket') {
        const ChangeAvatar = interaction.fields.getTextInputValue('ChangeAvatar');

        const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

        if (url.test(ChangeAvatar)) {
            try {
                await client.user.setAvatar(`${newavatarbot}`)
                await configbotTicket(interaction, user, client)
                interaction.followUp({ content: `✅ | Seu AVATAR foi alterado com sucesso!` })
            } catch (error) {
                interaction.reply({ flags: 64, content: `ERROR: ocorreu algum erro interno na API do BOT, ou você está alterando muito rapidamente o seu AVATAR.;` })
            }
        } else {
            interaction.reply({ flags: 64, content: `ERROR: Você inseriu um AVATAR invalido para seu BOT;` })
        }
    }
}

async function ConfigurarCanaisTicket(interaction, user, client) {


    let embed = {
        "color": 5814783,
        "fields": [
            {
                "name": "> Canal de logs:",
                "value": `${General.get('ConfigGeral').Channels.ChannelsLogs == null ? `\`🔴 Não definido\`` : `\`🟢\` <#${General.get('ConfigGeral').Channels.ChannelsLogs}>`}`
            },
            {
                "name": "> Canal de avaliação:",
                "value": `${General.get('ConfigGeral').Channels.ChannelsAvaliar == null ? `\`🔴 Não definido\`` : `\`🟢\` <#${General.get('ConfigGeral').Channels.ChannelsAvaliar}>`}`
            },
            {
                "name": "> Categoria de Tickets",
                "value": `${General.get('ConfigGeral').Channels.CategoriaTickets == null ? `\`🔴 Não definido\`` : `\`🟢\` <#${General.get('ConfigGeral').Channels.CategoriaTickets}>`}`
            },
            {
                "name": "> Cargo de Suporte Geral (Todas as categorias):",
                "value": `${General.get('ConfigGeral.cargos.SuporteGeral') == null ? `\`🔴 Não definido\`` : `\`🟢\` <@&${General.get('ConfigGeral.cargos.SuporteGeral')}>`}`
            }
        ],
        "author": {
            "name": "Configuração Ticket V2 - Canais",
            "icon_url": "https://cdn.discordapp.com/emojis/1262947968504565850.webp?size=96&quality=lossless"
        }
    }

    const row2 = new ActionRowBuilder()
        .addComponents(
            new RoleSelectMenuBuilder()
                .setCustomId('cargosSuporteGeral')
                .setPlaceholder('Selecione o cargo de suporte geral')
                .setMinValues(0)
                .setMaxValues(1)
                .setDefaultRoles(General.get('ConfigGeral.cargos.SuporteGeral') == null ? [] : [General.get('ConfigGeral.cargos.SuporteGeral')])
                .setDisabled(false),
        )

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("AlterarChannelLogs")
                .setLabel('Canal de Logs')
                .setEmoji(`1127807338171072522`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarChannelAvaliar")
                .setLabel('Canal de Avaliação')
                .setEmoji(`1127807338171072522`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("AlterarCategoriaTicketsDefaults")
                .setLabel('Categoria Tickets')
                .setEmoji(`1128072815438991410`)
                .setStyle(2)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("returnconfigTicket")
                .setLabel('Voltar')
                .setEmoji(`1106069998331514930`)
                .setStyle(2)
                .setDisabled(false),)

    await interaction.update({ embeds: [embed], components: [row2, row] })
}



module.exports = {
    updateMessageConfig,
    ToggleTickets,
    ConfigurarPaymentTicket,
    ConfigMPTicket,
    ToggeMPTicket,
    TimeMPTicket,
    configbotToggleTicket,
    configbotTicket,
    FunctionCompletConfigTicket,
    ConfigurarCanaisTicket
};