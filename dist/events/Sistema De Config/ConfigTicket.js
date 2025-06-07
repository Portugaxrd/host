const { UpdateStatusVendas, updateMessageConfig, UpdatePagamento, ConfigMP, ToggeMP, TimeMP, ToggleSaldo, bonusSaldo, ConfigSaldo, ConfigSemiAuto, ToggleSemiAuto, PixChangeSemiAuto, configbot, configbotToggle, FunctionCompletConfig, configchannels, configchannelsToggle, CompletConfigChannels, ConfigTermoConfig, ConfigTermo, ConfigCashBack, ToggleTickets, ConfigurarPaymentTicket, ConfigMPTicket, ToggeMPTicket, TimeMPTicket, ConfigSemiAutoTicket, ToggleSemiAutoTicket, configbotTicket, configbotToggleTicket, FunctionCompletConfigTicket } = require("../../FunctionsAll/BotConfig")
const { InteractionType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const { Tickets, General, PainelTickets, TicketsSave, RankTicketsIDs } = require("../../../DataBaseJson");

const { QuickDB } = require("quick.db");
const { alterartitleTicket, alterardescTicket, alteraridTicket, alterarfunctionsTicket, ConfigTicket, togglesfunctions, configuracaoavancadaticket, changeButtonTicket, configcargoTicket } = require("../../FunctionsAll/ConfigTicket");
const TicketOpen = require("../Sistema De Ticket/TicketOpen");
const permissionsInstance = require("../../FunctionsAll/permissionsInstance");
const db = new QuickDB();

module.exports = {
    name: 'interactionCreate',

    run: async (interaction, client) => {

        if (interaction.isChannelSelectMenu()) {
            if (interaction.customId == 'CATEGORIATICKETEXCLUSIVE') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                Tickets.set(`${t.ticket}_Ticket.Categoria`, interaction.values[0])
                configuracaoavancadaticket(interaction, t.ticket, client)
            }
        }

        if (interaction.isButton()) {

            if (interaction.customId == 'infoticket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                var ticketabertos = TicketsSave.fetchAll()

                var ticketsabertos = 0
                for (let ii = 0; ii < ticketabertos.length; ii++) {
                    const element = ticketabertos[ii];

                    try {
                        channela = await client.channels.fetch(element.data.ChannelID)

                        if (element.data.TicketID === `${t.ticket}_Ticket`) {

                            ticketsabertos = ticketsabertos + 1
                        }



                    } catch (error) {

                    }
                }

                var u = RankTicketsIDs.fetchAll()

                function compararPorTotalQtd(a, b) {
                    return b.data.qtd - a.data.qtd;
                }
                var bb = u.sort(compararPorTotalQtd);
                var position = -1;
                for (var i = 0; i < bb.length; i++) {
                    if (bb[i].ID === `${t.ticket}_Ticket`) {
                        position = i + 1;
                        break;
                    }
                }

                if (position == -1) position = 'Nenhum Ticket dessa Categoria foi aberta até o momento.'


                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`Estatísticas do Ticket ( ${t.ticket} )`)
                    .setDescription(`${obterEmoji(33)} | Total de Tickets: ${RankTicketsIDs.get(`${t.ticket}_Ticket.qtd`) == null ? 0 : RankTicketsIDs.get(`${t.ticket}_Ticket.qtd`)}\n📥 | Total de Tickets Abertos: ${ticketsabertos}\n\n${obterEmoji(5)} | Posição no Rank: **${position}º**`)


                interaction.reply({ embeds: [embed], flags: 64 })
            }



            if (interaction.customId == 'deletarTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.message.delete()

                var ii = Tickets.get(`${t.ticket}_Ticket`)

                const channel = client.channels.cache.get(ii.ChannelID);
                channel.messages.fetch(ii.MessageID)
                    .then(async message => {
                        try {
                            await message.delete()
                        } catch (error) {

                        }

                    })

                Tickets.delete(`${t.ticket}_Ticket`)

            }

            if (interaction.customId == 'alterartitleTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                alterartitleTicket(interaction, t.ticket, interaction.user.id, client)

            }

            if (interaction.customId == 'alterarfunctionsTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                alterarfunctionsTicket(interaction, t.ticket, interaction.user.id, client)

            }



            if (interaction.customId == 'alterardescTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                alterardescTicket(interaction, t.ticket, interaction.user.id, client)

            }

            if (interaction.customId == 'configuracaoavancadaticket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                configuracaoavancadaticket(interaction, t.ticket, client)

            }




            if (interaction.customId == 'returnprincipalconfig') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                ConfigTicket(interaction, t.ticket, client, interaction.user.id)

            }


            if (interaction.customId == 'changeButtonTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                changeButtonTicket(interaction, t.ticket, client, interaction.user.id)
            }



            if (interaction.customId == 'configcargoTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                configcargoTicket(interaction, t.ticket, client, interaction.user.id)
            }




            if (interaction.customId == 'SelecionarumaCategoria') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()

                const select = new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                            .setCustomId('CATEGORIATICKETEXCLUSIVE')
                            .setPlaceholder('Selecione abaixo qual será a CATEGORIA de seu TICKET.')
                            .setMaxValues(1)
                            .addChannelTypes(ChannelType.GuildCategory)
                    )

                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("resetcategoriaticketindividual")
                            .setLabel('Resetar Categoria')
                            .setEmoji(`1129240857300713472`)
                            .setStyle(2)
                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId("configuracaoavancadaticket")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),
                    )
                interaction.message.edit({ components: [select, row2] })
            }

            if (interaction.customId == 'resetcategoriaticketindividual') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                Tickets.delete(`${t.ticket}_Ticket.Categoria`)
                configuracaoavancadaticket(interaction, t.ticket, client)
            }



            if (interaction.customId == 'togglecriarcall' || interaction.customId == 'ToggleModalPerguntas' || interaction.customId == 'ToggleProtocoloTicket' || interaction.customId == 'togglepoke' || interaction.customId == 'toggleassumir' || interaction.customId == 'togglerenomear' || interaction.customId == 'togglepagamentos' || interaction.customId == 'togglegerenciarmembro') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                togglesfunctions(interaction, t.ticket, client)
            }



            if (interaction.customId == 'AlterarBannerTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                const modalaAA = new ModalBuilder()
                    .setCustomId('editpainelBanner22')
                    .setTitle(`Alterar Banner do Ticket`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('editpainelBanner22')
                    .setLabel("LINK BANNER:")
                    .setPlaceholder("NOVO BANNER")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);

            }

            if (interaction.customId == 'AlterarMiniaturaTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                const modalaAA = new ModalBuilder()
                    .setCustomId('AlterarMiniaturaTicket')
                    .setTitle(`Alterar Miniatura do Painel`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('AlterarMiniaturaTicket')
                    .setLabel("LINK DA MINIATURA:")
                    .setPlaceholder("NOVO MINIATURA")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);

            }


            if (interaction.customId == 'atualizarmensgaemticket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                try {
                    const channel = client.channels.cache.get(Tickets.get(`${t.ticket}_Ticket.ChannelID`));
                    if (!channel) return

                    const fetchedMessage = await channel.messages.fetch(Tickets.get(`${t.ticket}_Ticket.MessageID`));
                    if (!fetchedMessage) return

                    var gg = Tickets.get(`${t.ticket}_Ticket`)


                    const embed = new EmbedBuilder()
                        .setTitle(gg.settings.title)
                        .setDescription(gg.settings.desc)
                        .setColor('#2b2d31')

                    if (gg.embedconfig.message !== undefined) {
                        if (gg.embedconfig.message.banner !== null) {
                            embed.setImage(gg.embedconfig.message.banner)
                        }
                        if (gg.embedconfig.message.miniatura !== null) {
                            embed.setThumbnail(gg.embedconfig.message.miniatura)
                        }
                    }

                    const row = new ActionRowBuilder()
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${t.ticket}_Ticket`)
                            .setLabel(`${gg.embedconfig.Button.name}`)
                            .setStyle(gg.embedconfig.Button.color)
                            .setEmoji(`${gg.embedconfig.Button.emoji}`)
                            .setDisabled(false),
                    )

                    fetchedMessage.edit({ embeds: [embed], components: [row] });
                } catch (error) {

                }
            }







            if (interaction.customId == 'AlterarEmojiButtonTicket') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                interaction.deferUpdate()
                if (interaction.user.id !== t.user) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
                    .setDescription(`${obterEmoji(9)} | Envie o Emoji abaixo:\n**O emoji tem que estar em um server que o bot também está!**`)
                    .setColor("#2b2d31")

                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()
                        var u = message.content
                        const regex = /<a?:[^\s:]+:\d+>|[\p{Emoji}\u200d]+/u

                        if (regex.test(u)) {

                            Tickets.set(`${t.ticket}_Ticket.embedconfig.Button.emoji`, u)

                            msg.reply({ content: `${obterEmoji(8)} | Emoji do Button atualizado com sucesso` }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 2000);
                            })

                            changeButtonTicket(interaction, t.ticket, client, interaction.user.id)

                        } else {
                            changeButtonTicket(interaction, t.ticket, client, interaction.user.id)
                            return msg.reply({ content: `${obterEmoji(22)}| Você selecionou um EMOJI inválido`, flags: 64 }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 2000);
                            })
                        }
                    })
                    collector.on('end', async (message) => {
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


            if (interaction.customId == 'AlterarCorButtonTicket') {
                var uu = db.table('permissionsmessage33')
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t.user) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
                    .setDescription(`Envie a nova descrição da embed de compra, caso queira use as váriaveis:\n・ \`Azul\`\n・ \`Vermelho\`\n・ \`Verde\`\n・ \`Cinza\``)
                    .setColor("#2b2d31")

                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()
                        var u = message.content

                        if (u !== "Azul" && u !== "Vermelho" && u !== "Verde" && u !== "Cinza") {
                            changeButtonTicket(interaction, t.ticket, client, interaction.user.id)
                            return msg.reply({ content: `${obterEmoji(22)}| Você selecionou uma COR inválida`, flags: 64 }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 2000);
                            })
                        }

                        var colorid = null
                        if (u === "Azul") colorid = 1
                        if (u === "Vermelho") colorid = 4
                        if (u === "Verde") colorid = 3
                        if (u === "Cinza") colorid = 2

                        Tickets.set(`${t.ticket}_Ticket.embedconfig.Button.color`, colorid)

                        msg.reply({ content: `${obterEmoji(8)} | Color do Button atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        changeButtonTicket(interaction, t.ticket, client, interaction.user.id)
                    })
                    collector.on('end', async (message) => {
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


            if (interaction.customId == 'AlterarNomeButtonTicket') {
                var uu = db.table('permissionsmessage33')
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t.user) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Button do Ticket`)
                    .setDescription(`${obterEmoji(9)} | Envie o novo texto para o botão!`)
                    .setColor("#2b2d31")


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()
                        var u = message.content
                        var primeiros25 = u.substring(0, 25);
                        Tickets.set(`${t.ticket}_Ticket.embedconfig.Button.name`, primeiros25)

                        msg.reply({ content: `${obterEmoji(8)} | Texto do Button atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        changeButtonTicket(interaction, t.ticket, client, interaction.user.id)
                    })
                    collector.on('end', async (message) => {
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







        }

        if (interaction.type == InteractionType.ModalSubmit) {
            if (interaction.customId === 'editpainelBanner22') {
                var uu = db.table('permissionsmessage33')
                const t = await uu.get(interaction.message.id)
                const editpainelBanner = interaction.fields.getTextInputValue('editpainelBanner22');

                const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

                if (url.test(editpainelBanner)) {

                    interaction.reply({ flags: 64, content: `${obterEmoji(8)} | Você alterou o BANNER do seu Ticket.` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                    Tickets.set(`${t.ticket}_Ticket.embedconfig.message.banner`, editpainelBanner)
                } else {
                    interaction.reply({ flags: 64, content: `${obterEmoji(22)} | Você inseriu um BANNER invalido para seu Ticket;` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                }
            }


            if (interaction.customId === 'AlterarMiniaturaTicket') {
                var uu = db.table('permissionsmessage33')
                const t = await uu.get(interaction.message.id)
                const AlterarMiniaturaTicket = interaction.fields.getTextInputValue('AlterarMiniaturaTicket');

                const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

                if (url.test(AlterarMiniaturaTicket)) {

                    interaction.reply({ flags: 64, content: `${obterEmoji(8)} | Você alterou a MINIATURA do seu Ticket.` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                    Tickets.set(`${t.ticket}_Ticket.embedconfig.message.miniatura`, AlterarMiniaturaTicket)
                } else {
                    interaction.reply({ flags: 64, content: `${obterEmoji(22)} | Você inseriu uma MINIATURA invalido para seu Ticket;` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                }
            }



        }




        if (interaction.isRoleSelectMenu()) {
            if (interaction.customId == 'ChangeTicketRoleaudakhbda') {
                var uu = db.table('permissionsmessage33')
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                interaction.message.edit()

                Tickets.set(`${t.ticket}_Ticket.permsTicket`, interaction.values)
                configcargoTicket(interaction, t.ticket, client, interaction.user.id)
            }
        }

        if (interaction.isAutocomplete()) {
            if (interaction.commandName == 'config') {

                if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })

                var nomeDigitado = interaction.options.getFocused().toLowerCase();
                var produtosFiltrados = Tickets.filter(x => x?.data?.ID?.toLowerCase().includes(nomeDigitado));
                var produtosSelecionados = produtosFiltrados.slice(0, 25);

                const config = produtosSelecionados.map(x => {

                    return {
                        name: `ID - ${x.data.ID} | Nome - ${x.data.settings.title}`,
                        value: `${x.data.ID}`
                    }
                })

                interaction.respond(!config.length ? [{ name: `Nenhum Ticket registrado foi encontrado`, value: `nada` }] : config);
            }

            if (interaction.commandName == 'criarpainel') {

                if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })

                var nomeDigitado = interaction.options.getFocused().toLowerCase();
                var produtosFiltrados = Tickets.filter(x => x?.data?.ID?.toLowerCase().includes(nomeDigitado));
                var produtosSelecionados = produtosFiltrados.slice(0, 25);

                const config = produtosSelecionados.map(x => {

                    return {
                        name: `ID - ${x.data.ID} | Nome - ${x.data.settings.title}`,
                        value: `${x.data.ID}`
                    }
                })

                interaction.respond(!config.length ? [{ name: `Nenhum Ticket registrado foi encontrado`, value: `nada` }] : config);
            }

            if (interaction.commandName == 'config_painel') {
               
                if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })


                var nomeDigitado = interaction.options.getFocused().toLowerCase();
                var produtosFiltrados = PainelTickets.filter(x => x?.data?.ID?.toLowerCase().includes(nomeDigitado));
                var produtosSelecionados = produtosFiltrados.slice(0, 25);

                const config = produtosSelecionados.map(x => {

                    return {
                        name: `🖥 | Painel - ${x.data.ID}`,
                        value: `${x.data.ID}`
                    }
                })

                interaction.respond(!config.length ? [{ name: `Nenhum Painel registrado foi encontrado`, value: `nada` }] : config);
            }

            if (interaction.commandName == 'set_painel') {
    
                if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })


                var nomeDigitado = interaction.options.getFocused().toLowerCase();
                var produtosFiltrados = PainelTickets.filter(x => x?.data?.ID?.toLowerCase().includes(nomeDigitado));
                var produtosSelecionados = produtosFiltrados.slice(0, 25);

                const config = produtosSelecionados.map(x => {

                    return {
                        name: `🎫 | Painel - ${x.data.ID}`,
                        value: `${x.data.ID}`
                    }
                })

                interaction.respond(!config.length ? [{ name: `Nenhum Painel registrado foi encontrado`, value: `nada` }] : config);
            }

            if (interaction.commandName == 'set') {
                let config2 = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'joaozinhogostoso'
                    }
                };
               
                if (!permissionsInstance.get(interaction.user.id)) return interaction.reply({ content: `❌ | Você não possui permissão para usar esse comando.`, flags: 64 })

                var nomeDigitado = interaction.options.getFocused().toLowerCase();
                var produtosFiltrados = Tickets.filter(x => x?.data?.ID?.toLowerCase().includes(nomeDigitado));
                var produtosSelecionados = produtosFiltrados.slice(0, 25);

                const config = produtosSelecionados.map(x => {

                    return {
                        name: `ID - ${x.data.ID} | Nome - ${x.data.settings.title}`,
                        value: `${x.data.ID}`
                    }
                })

                interaction.respond(!config.length ? [{ name: `Nenhum Ticket registrado foi encontrado`, value: `nada` }] : config);
            }
        }
    }
}
