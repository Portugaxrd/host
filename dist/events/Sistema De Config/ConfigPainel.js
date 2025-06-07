const { UpdateStatusVendas, updateMessageConfig, UpdatePagamento, ConfigMP, ToggeMP, TimeMP, ToggleSaldo, bonusSaldo, ConfigSaldo, ConfigSemiAuto, ToggleSemiAuto, PixChangeSemiAuto, configbot, configbotToggle, FunctionCompletConfig, configchannels, configchannelsToggle, CompletConfigChannels, ConfigTermoConfig, ConfigTermo, ConfigCashBack, ToggleTickets, ConfigurarPaymentTicket, ConfigMPTicket, ToggeMPTicket, TimeMPTicket, ConfigSemiAutoTicket, ToggleSemiAutoTicket, configbotTicket, configbotToggleTicket, FunctionCompletConfigTicket, ConfigurarCanaisTicket } = require("../../FunctionsAll/BotConfig")
const { InteractionType, EmbedBuilder, ChannelType, ChannelSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, TextInputStyle, TextInputBuilder, ModalBuilder } = require('discord.js');
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const emojiRegex = require('emoji-regex');
const { QuickDB } = require("quick.db");
const { configembedpainelTicket, PrimaryConfigMessage, atualizarmensagempainel, configticketsspainel } = require("../../FunctionsAll/PainelSettings");
const { PainelTickets, Tickets } = require("../../../DataBaseJson");
const db = new QuickDB();
var uu = db.table('painelsettings')
module.exports = {
    name: 'interactionCreate',

    run: async (interaction, client) => {


        if (interaction.isStringSelectMenu()) {

            if (interaction.customId === 'changeemojipainelTicket') {
                interaction.deferUpdate()
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`Envie o emoji para trocar no Painél:`)
                    .setColor("#2b2d31")

                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()


                        function verificarEmoji(mensagem) {
                            const emojiRegexPattern = emojiRegex();
                            const regex = /<a?:[^\s:]+:\d+>|[\p{Emoji}\u200d]+/u

                            return emojiRegexPattern.test(mensagem) || regex.test(mensagem);
                        }

                        if (verificarEmoji(message.content) == false) return interaction.channel.send({ content: `${obterEmoji(22)} | Você tentou colocar um emoji invalido ou inexistente` }).then(u => {
                            configticketsspainel(interaction, client)
                            setTimeout(async () => {
                                try {
                                    await u.delete()
                                } catch (error) {

                                }
                            }, 3000);
                        })

                        Tickets.set(`${interaction.values[0]}.painel.emoji`, message.content)
                        configticketsspainel(interaction, client)
                        interaction.channel.send({ content: `${obterEmoji(8)} | Você alterou o emoji de um Ticket.` }).then(u => {

                            setTimeout(async () => {
                                try {
                                    await u.delete()
                                } catch (error) {

                                }
                            }, 3000);
                        })
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

            if (interaction.values[0] === 'nada') {
                interaction.deferUpdate()
            }
        }



        if (interaction.type == InteractionType.ModalSubmit) {

            if (interaction.customId === 'editpainelcolorTicket') {
                const editpainelcolorTicket = interaction.fields.getTextInputValue('editpainelcolorTicket');
                const t = await uu.get(interaction.message.id)

                var regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                var isHexadecimal = regex.test(editpainelcolorTicket);

                if (isHexadecimal) {

                    PainelTickets.set(`${t.id}.settings.color`, editpainelcolorTicket)
                    configembedpainelTicket(interaction, client)
                    interaction.deferUpdate()
                } else {
                    interaction.reply({ flags: 64, content: `${obterEmoji(22)} | Você inseriu um COR diferente de HexaDecimal;` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                }
            }





            if (interaction.customId === 'editpainelBannerTicket') {
                const t = await uu.get(interaction.message.id)
                const editpainelBannerTicket = interaction.fields.getTextInputValue('editpainelBannerTicket');

                const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

                if (url.test(editpainelBannerTicket)) {

                    interaction.reply({ flags: 64, content: `${obterEmoji(8)} | Você alterou o BANNER do seu Produto.` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                    PainelTickets.set(`${t.id}.settings.banner`, editpainelBannerTicket)
                    configembedpainelTicket(interaction, client)
                } else {
                    interaction.reply({ flags: 64, content: `${obterEmoji(22)} | Você inseriu um BANNER invalido para seu BOT;` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                }
            }


            if (interaction.customId === 'editpainelMiniaturaTicket') {
                const t = await uu.get(interaction.message.id)
                const editpainelMiniaturaTicket = interaction.fields.getTextInputValue('editpainelMiniaturaTicket');

                const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

                if (url.test(editpainelMiniaturaTicket)) {

                    interaction.reply({ flags: 64, content: `${obterEmoji(8)} | Você alterou a MINIATURA do seu Ticket.` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                    PainelTickets.set(`${t.id}.settings.miniatura`, editpainelMiniaturaTicket)
                    configembedpainelTicket(interaction, client)
                } else {
                    interaction.reply({ flags: 64, content: `${obterEmoji(22)} | Você inseriu uma MINIATURA invalido para seu BOT;` }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 3000);
                    })
                }
            }




            if (interaction.customId === 'changesequenciaprodutosTicket') {
                const t = await uu.get(interaction.message.id)
                const idproduto = interaction.fields.getTextInputValue('idproduto');
                const newposicaoproduto = interaction.fields.getTextInputValue('newposicaoproduto');

                if (!PainelTickets.get(`${t.id}.produtos`).includes(idproduto)) return interaction.reply({ content: `${obterEmoji(22)} | Error: O Ticket não está cadastrado nesse painel!` }).then(m => {
                    configticketsspainel(interaction, client)
                    setTimeout(async () => {
                        try {
                            await m.delete()
                        } catch (error) { }
                    }, 2000);
                })

                var produtos2 = PainelTickets.get(`${t.id}.produtos`)

                const indexProduto = produtos2.indexOf(idproduto);

                if (indexProduto !== -1 && newposicaoproduto >= 0 && newposicaoproduto < produtos2.length) {
                    produtos2.splice(newposicaoproduto, 0, produtos2.splice(indexProduto, 1)[0]);


                } else {
                    interaction.reply({ content: `${obterEmoji(21)} | Posição inválida!` }).then(m => {
                        configticketsspainel(interaction, client)
                        setTimeout(async () => {
                            try {
                                await m.delete()
                            } catch (error) { }
                        }, 2000);
                    })
                }

                PainelTickets.set(`${t.id}.produtos`, produtos2)

                configticketsspainel(interaction, client)
                interaction.deferUpdate()
            }



        }


        if (interaction.isButton()) {

            if (interaction.customId === 'editpainelembedTicket') {
                interaction.deferUpdate()

                var t = await uu.get(interaction.message.id)


                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`**Título Atual:**
${PainelTickets.get(`${t.id}.settings.title`)}
Envie o novo título abaixo:`)
                    .setColor("#2b2d31")



                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        PainelTickets.set(`${t.id}.settings.title`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | Título atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        configembedpainelTicket(interaction, client)
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


            if (interaction.customId === 'editpaineldescTicket') {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`**Descrição Atual:**\n
${PainelTickets.get(`${t.id}.settings.desc`)}
Envie a nova descrição abaixo:`)
                    .setColor("#2b2d31")


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        PainelTickets.set(`${t.id}.settings.desc`, message.content)

                        interaction.channel.send({ content: `${obterEmoji(8)} | Descrição atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        configembedpainelTicket(interaction, client)
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

            if (interaction.customId === 'editpainelrodapeTicket') {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`**Rodapé Atual:**
${PainelTickets.get(`${t.id}.settings.rodape`) == null ? 'Sem Rodapé' : PainelTickets.get(`${t.id}.settings.rodape`)}
Envie o novo rodapé abaixo:`)
                    .setColor("#2b2d31")


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        PainelTickets.set(`${t.id}.settings.rodape`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | Rodapé atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        configembedpainelTicket(interaction, client)
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

            if (interaction.customId === 'editpainelplaceholderTicket') {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`**Rodapé Atual:**\n${PainelTickets.get(`${t.id}.settings.placeholder`) == null ? '\`Envie o novo Texto abaixo:\`' : PainelTickets.get(`${t.id}.settings.placeholder`)}\nEnvie o novo Texto abaixo:`)
                    .setColor("#2b2d31")


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        PainelTickets.set(`${t.id}.settings.placeholder`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | PlaceHolder atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        configembedpainelTicket(interaction, client)
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

            if (interaction.customId === 'editpainelcolorTicket') {
                const t = await uu.get(interaction.message.id)
                const modalaAA = new ModalBuilder()
                    .setCustomId('editpainelcolorTicket')
                    .setTitle(`${obterEmoji(1)} | Alterar Cor Painel`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('editpainelcolorTicket')
                    .setLabel("Nova Cor do seu Bot. (Hexadecimal):")
                    .setPlaceholder("#FF0000, #FF69B4, #FF1493")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);

            }


            if (interaction.customId === 'editpainelBannerTicket') {
                const t = await uu.get(interaction.message.id)
                const modalaAA = new ModalBuilder()
                    .setCustomId('editpainelBannerTicket')
                    .setTitle(`Alterar Banner do Painel`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('editpainelBannerTicket')
                    .setLabel("LINK BANNER:")
                    .setPlaceholder("NOVO BANNER")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);

            }



            if (interaction.customId === 'editpainelMiniaturaTicket') {
                const t = await uu.get(interaction.message.id)
                const modalaAA = new ModalBuilder()
                    .setCustomId('editpainelMiniaturaTicket')
                    .setTitle(`${obterEmoji(1)} | Alterar Miniatura do Painel`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('editpainelMiniaturaTicket')
                    .setLabel("LINK DA MINIATURA:")
                    .setPlaceholder("NOVO MINIATURA")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);

            }








            if (interaction.customId === 'diasodusadsa78das6y7dsbdbuas') {
                var t = await uu.get(interaction.message.id)
                interaction.deferUpdate()
                if (t.user !== interaction.user.id) return
                PrimaryConfigMessage(t.id, interaction, client, t.user)
            }
            if (interaction.customId === 'configembedpainelTicket') {
                var t = await uu.get(interaction.message.id)
                interaction.deferUpdate()
                if (t.user !== interaction.user.id) return
                configembedpainelTicket(interaction, client)
            }

            if (interaction.customId === 'atualizarmensagempainelTicket') {
                var t = await uu.get(interaction.message.id)
                interaction.deferUpdate()
                if (t.user !== interaction.user.id) return
                atualizarmensagempainel(interaction.guild.id, t.id, client, interaction.user.id)
            }


            if (interaction.customId === 'configprodutospainelTicket') {
                var t = await uu.get(interaction.message.id)
                interaction.deferUpdate()
                if (t.user !== interaction.user.id) return
                configticketsspainel(interaction, client)
            }

            if (interaction.customId === 'AlterarButtoneSelectTicket') {

                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                
                var ii = PainelTickets.get(`${t.id}`)

                if (ii.produtos.length > 5) return interaction.reply({ content: `${obterEmoji(22)} | Você só pode alterar para Button caso tenha menos de 5 tickets nesse PAINEL!!`, flags: 64 })

                PainelTickets.set(`${t.id}.type`, PainelTickets.get(`${t.id}.type`) == 'Button' ? 'Select' : 'Button')
                configticketsspainel(interaction, client)
                interaction.deferUpdate()
            }



            if (interaction.customId === 'deletarpainelTicket') {
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.message.delete()

                var ii = PainelTickets.get(`${t.id}`)

                const channel = client.channels.cache.get(ii.ChannelID);
                channel.messages.fetch(ii.MessageID)
                    .then(async message => {
                        try {
                            await message.delete()
                        } catch (error) {

                        }

                    })

                PainelTickets.delete(`${t.id}`)


            }


            if (interaction.customId === 'changesequenciaprodutosTicket') {
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                const modalaAA = new ModalBuilder()
                    .setCustomId('changesequenciaprodutosTicket')
                    .setTitle(`${obterEmoji(1)} | Alterar Posição`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('idproduto')
                    .setLabel("ID DO Ticket:")
                    .setPlaceholder("Coloque o id do Ticket aqui.")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                const newnameboteN2 = new TextInputBuilder()
                    .setCustomId('newposicaoproduto')
                    .setLabel("NOVA POSIÇÃO:")
                    .setPlaceholder("Ex: 1")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                const firstActionRow2 = new ActionRowBuilder().addComponents(newnameboteN2);
                modalaAA.addComponents(firstActionRow3, firstActionRow2);
                await interaction.showModal(modalaAA);
            }



            if (interaction.customId === 'removeprodutopainelTicket') {

                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()
                interaction.deferUpdate()
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`Envie o ID do Ticket que você deseja remover do painel:`)
                    .setColor("#2b2d31")

                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()
                        if (Tickets.get(`${message.content}_Ticket`) == null) return interaction.reply({ content: `${obterEmoji(22)} | Error: Ticket Inexistente!` }).then(m => {
                            configticketsspainel(interaction, client)
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        if (!PainelTickets.get(`${t.id}.produtos`).includes(message.content)) return interaction.reply({ content: `${obterEmoji(22)} | Error: O Ticket não está cadastrado nesse painel!` }).then(m => {
                            configticketsspainel(interaction, client)
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        var uuuuuuu = message.content
                        PainelTickets.pull(`${t.id}.produtos`, (element, index, array) => `element.${uuuuuuu}`)
                        configticketsspainel(interaction, client)
                        interaction.channel.send({ content: `${obterEmoji(8)} | o Ticket ${message.content} foi removido deste painel.` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })
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












            if (interaction.customId === 'addprodutopainelTicket') {
                var t = await uu.get(interaction.message.id)
                if (t.user !== interaction.user.id) return interaction.deferUpdate()

                var ii = PainelTickets.get(`${t.id}`)


                if (ii.type == 'Button') {
                    if (ii.produtos.length >= 5) return interaction.reply({ content: `${obterEmoji(22)} | Você só pode adicionar mais de 5 Tickets Nesse painel caso altere para SELECT!`, flags: 64 })
                }
                
                interaction.deferUpdate()
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Gerenciar Painel`)
                    .setDescription(`Envie o ID do Ticket que você queira adicionar no painel:`)
                    .setColor("#2b2d31")

                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()



                        if (Tickets.get(`${message.content}_Ticket`) == null) return interaction.channel.send({ content: `${obterEmoji(22)} | Error: Ticket Inexistente!` }).then(m => {
                            configticketsspainel(interaction, client)
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        if (PainelTickets.get(`${t.id}.produtos`).includes(message.content)) return interaction.channel.send({ content: `${obterEmoji(22)} | Error: Este Ticket Já Existe nesse Painel!` }).then(m => {
                            configticketsspainel(interaction, client)
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        PainelTickets.push(`${t.id}.produtos`, message.content)
                        interaction.channel.send({ content: `${obterEmoji(8)} | o Ticket ${message.content} foi adicionado neste painel.` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })


                        configticketsspainel(interaction, client)
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

    }
}