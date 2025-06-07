const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ComponentType } = require("discord.js");
const { PerfilMembros } = require("../../DataBaseJson");
const { obterEmoji } = require("../Handler/EmojiFunctions");








function paginascreate(interaction, title, blocks) {
    const pages = splitIntoPages(blocks);
    let pageNumber = 1;

    const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setDescription(pages[pageNumber - 1])
        .setColor("#2b2d31")
        .setFooter({ text: `Página ${pageNumber}/${pages.length}` });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("primeirapagina")
                .setEmoji(`⏮`)
                .setStyle(2)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId("paginaanterior")
                .setEmoji(`⬅`)
                .setStyle(2)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId("selecionarpagina")
                .setLabel('Go To Page')
                .setEmoji(`📄`)
                .setStyle(3)
                .setDisabled(pages.length === 1),
            new ButtonBuilder()
                .setCustomId("paginaseguinte")
                .setEmoji(`➡`)
                .setStyle(2)
                .setDisabled(pages.length === 1),
            new ButtonBuilder()
                .setCustomId("ultimapagina")
                .setEmoji(`⏭`)
                .setStyle(2)
                .setDisabled(pages.length === 1)
        );

    interaction.reply({ embeds: [embed], components: [row], flags: 64 }).then(msg => {
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

        collector.on('collect', i => {
            let newPageNumber = pageNumber;

            switch (i.customId) {
                case 'primeirapagina':

                    newPageNumber = 1;
                    break;
                case 'ultimapagina':

                    newPageNumber = pages.length;
                    break;
                case 'paginaseguinte':

                    newPageNumber = Math.min(pageNumber + 1, pages.length);
                    break;
                case 'paginaanterior':

                    newPageNumber = Math.max(pageNumber - 1, 1);
                    break;
                case 'selecionarpagina':
                    i.deferUpdate();
                    askPageSelection(interaction, pages, title);
                    return;
                default:
                    break;
            }

            if (newPageNumber !== pageNumber) {
                pageNumber = newPageNumber;
                i.deferUpdate();
                updateMessageWithPages(pages, pageNumber, interaction, title);
            }
        });

    });
}

function askPageSelection(interaction, pages, title) {
    const promptEmbed = new EmbedBuilder()
        .setTitle(`Selecione uma página de ${title}`)
        .setDescription('Digite o número da página que deseja visualizar:')
        .setColor("#2b2d31");

    interaction.channel.send({ embeds: [promptEmbed] }).then(message => {
        const filter = m => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 30000 });

        collector.on('collect', m => {
            const inputPageNumber = parseInt(m.content);
            if (isNaN(inputPageNumber) || inputPageNumber < 1 || inputPageNumber > pages.length) {
                interaction.reply('Página inválida. Por favor, insira um número de página válido.').then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(error => {

                        });
                    }, 3000);
                });
            } else {
                pageNumber = inputPageNumber;
                updateMessageWithPages(pages, pageNumber, interaction, title);
            }
            m.delete().catch(error => {

            });
            message.delete().catch(error => {

            });
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.delete().catch(error => {
                });
            }
        });
    });
}

function updateMessageWithPages(pages, pageNumber, interaction, title) {
    const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setDescription(pages[pageNumber - 1])
        .setColor("#2b2d31")
        .setFooter({ text: `Página ${pageNumber}/${pages.length}` });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("primeirapagina")
                .setEmoji(`⏮`)
                .setStyle(2)
                .setDisabled(pageNumber === 1),
            new ButtonBuilder()
                .setCustomId("paginaanterior")
                .setEmoji(`⬅`)
                .setStyle(2)
                .setDisabled(pageNumber === 1),
            new ButtonBuilder()
                .setCustomId("selecionarpagina")
                .setLabel('Go To Page')
                .setEmoji(`📄`)
                .setStyle(3)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("paginaseguinte")
                .setEmoji(`➡`)
                .setStyle(2)
                .setDisabled(pageNumber === pages.length),
            new ButtonBuilder()
                .setCustomId("ultimapagina")
                .setEmoji(`⏭`)
                .setStyle(2)
                .setDisabled(pageNumber === pages.length)
        );

    interaction.editReply({ embeds: [embed], components: [row] }).catch(error => {
    });
}

function splitIntoPages(blocks) {
    const pages = [];
    let currentPage = '';

    for (let i = 0; i < blocks.length; i++) {
        currentPage += blocks[i] + '\n\n';

        if ((i + 1) % 10 === 0) {
            pages.push(currentPage);
            currentPage = '';
        }
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
}



function RankAdm(interaction) {
    var u = PerfilMembros.fetchAll()
    var blocks = []
    u.sort((a, b) => b.data.Abriu - a.data.Abriu);
    for (let iiiiii = 0; iiiiii < u.length; iiiiii++) {
        const element = u[iiiiii]?.ID
        const abertos = u[iiiiii]?.data?.Abriu
        const assumidios = u[iiiiii]?.data?.assumidos


        if (iiiiii === 0) {
            emoji = '🥇';
        } else if (iiiiii === 1) {
            emoji = '🥈';
        } else if (iiiiii === 2) {
            emoji = '🥉';
        } else {
            emoji = '🏅';
        }
        blocks.push(`${emoji} | **__${iiiiii + 1}°__** - <@${element}> - ${element}\n${obterEmoji(33)} | Tickets Abertos: **${(abertos == undefined ? '0': abertos)}**\n🙋‍♂️ | Tickets Assumidos: **${(assumidios == undefined ? '0': assumidios)}**`);
    }
    const embed = new EmbedBuilder()
        .setTitle(`Erro - Sistema de Vendas`)
        .setDescription(`Não encontrei nada desse tipo cadastrado no bot!`)
        .setColor("#2b2d31")
    if (blocks == 0) return interaction.reply({ embeds: [embed], flags: 64 }).then(msg => {
        setTimeout(async () => {
            try {
                await msg.delete
            } catch (error) {

            }
        }, 3000);
    })

    var title = 'Rank ADM:'
    paginascreate(interaction, title, blocks);
}



function Rank(interaction) {
    var u = PerfilMembros.fetchAll()
    var blocks = []
    u.sort((a, b) => b.data.Abriu - a.data.Abriu);
    for (let iiiiii = 0; iiiiii < u.length; iiiiii++) {
        const element = u[iiiiii].ID


        if (iiiiii === 0) {
            emoji = '🥇';
        } else if (iiiiii === 1) {
            emoji = '🥈';
        } else if (iiiiii === 2) {
            emoji = '🥉';
        } else {
            emoji = '🏅';
        }

        blocks.push(`${emoji} | **__${iiiiii + 1}°__** - <@${element}> - ${element}`);
    }
    const embed = new EmbedBuilder()
        .setTitle(`Erro - Sistema de Vendas`)
        .setDescription(`Não encontrei nada desse tipo cadastrado no bot!`)
        .setColor("#2b2d31")
    if (blocks == 0) return interaction.reply({ embeds: [embed], flags: 64 }).then(msg => {
        setTimeout(async () => {
            try {
                await msg.delete
            } catch (error) {

            }
        }, 3000);
    })

    var title = 'Rank:'
    paginascreate(interaction, title, blocks);
}


module.exports = {
    Rank,
    RankAdm
};