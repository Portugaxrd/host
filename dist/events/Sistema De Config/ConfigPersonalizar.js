const { DefaultMessages, produtos } = require("../../../DataBaseJson");
const { UpdateStatusVendas, updateMessageConfig, UpdatePagamento, ConfigMP, ToggeMP, TimeMP, ToggleSaldo, bonusSaldo, ConfigSaldo, ConfigSemiAuto, ToggleSemiAuto, PixChangeSemiAuto, configbot, configbotToggle, FunctionCompletConfig, configchannels, configchannelsToggle, CompletConfigChannels, ConfigTermoConfig, ConfigTermo } = require("../../FunctionsAll/BotConfig")
const { InteractionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const { StartPersonalizarMessage, buttonedits, emojieditmessagedault, editemoji, editemojiFunctions } = require("../../FunctionsAll/Personalizar");
const { QuickDB } = require("quick.db");
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const db = new QuickDB();
var uu = db.table('permissionsmessage2')
module.exports = {
    name: 'interactionCreate',


    run: async (interaction, client) => {


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
                time: 120000
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
        if (interaction.type == InteractionType.ModalSubmit) {
            if (interaction.customId === 'iddoemoji') {
                interaction.deferUpdate()
                editemojiFunctions(interaction, client)
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId.startsWith('editpersonalizarembed')) {
                interaction.deferUpdate()

                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return

                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
                    .setDescription(`Envie o novo título da embed de compra, caso queira use as váriaveis:\n・ \`#{nome}\`\n・ \`#{preco}\`\n・ \`#{estoque}\``)
                    .setColor("#2b2d31")



                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        DefaultMessages.set(`ConfigGeral.embedtitle`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | Título atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        StartPersonalizarMessage(interaction, client, interaction.user.id)
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

            if (interaction.customId.startsWith('editpersonalizardesc')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
                    .setDescription(`Envie a nova descrição da embed de compra, caso queira use as váriaveis:\n・ \`#{desc}\`\n・ \`#{nome}\`\n・ \`#{preco}\`\n・ \`#{estoque}\``)
                    .setColor("#2b2d31")
                    .setImage('https://media.discordapp.net/attachments/1023331568644800532/1066084266661904574/image.png')


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        DefaultMessages.set(`ConfigGeral.embeddesc`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | Descrição atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        StartPersonalizarMessage(interaction, client, interaction.user.id)
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



            if (interaction.customId.startsWith('editpersonalizarrodape')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
                    .setDescription(`${obterEmoji(9)} | Envie o novo rodapé!`)
                    .setColor("#2b2d31")


                interaction.message.edit({ embeds: [embed], components: [] }).then(msg => {
                    const filter = message => message.author.id === interaction.user.id
                    const collector = interaction.channel.createMessageCollector({ filter: filter, time: 120000, limit: 1 })
                    collector.on('collect', async (message) => {
                        message.delete()
                        collector.stop()

                        DefaultMessages.set(`ConfigGeral.embedrodape`, message.content)

                        msg.reply({ content: `${obterEmoji(8)} | Rodapé atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        StartPersonalizarMessage(interaction, client, interaction.user.id)
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


            if (interaction.customId.startsWith('attallmessagesdiscordjsprodutos')) {
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return interaction.deferUpdate()
                var a = produtos.fetchAll()
                interaction.reply({ content: `${obterEmoji(8)} | Todas mensagens atualizadas.`, flags: 64 })
                for (var i = 0; i < a.length; i++) {
                    var obj = a[i];
                    var ID = obj.data.ID;

                    var s = produtos.get(`${ID}_${interaction.guild.id}.settings.estoque`)
                    var dd = produtos.get(`${ID}_${interaction.guild.id}`)

                    const embeddesc = DefaultMessages.get(`ConfigGeral`)


                    var modifiedEmbeddesc = embeddesc.embeddesc
                        .replace('#{desc}', produtos.get(`${ID}_${interaction.guild.id}.settings.desc`))
                        .replace('#{nome}', produtos.get(`${ID}_${interaction.guild.id}.settings.name`))
                        .replace('#{preco}', Number(produtos.get(`${ID}_${interaction.guild.id}.settings.price`)).toFixed(2))
                        .replace('#{estoque}', Object.keys(s).length);

                    var modifiedEmbeddesc2 = embeddesc.embedtitle
                        .replace('#{nome}', produtos.get(`${ID}_${interaction.guild.id}.settings.name`))
                        .replace('#{preco}', Number(produtos.get(`${ID}_${interaction.guild.id}.settings.price`)).toFixed(2))
                        .replace('#{estoque}', Object.keys(s).length)



                    const embed = new EmbedBuilder()
                        .setTitle(modifiedEmbeddesc2)
                        .setDescription(modifiedEmbeddesc)
                        .setColor(`${dd.embedconfig.color == null ? '#2b2d31' : dd.embedconfig.color}`)

                    if (dd.embedconfig.banner !== null) {
                        embed.setImage(dd.embedconfig.banner)
                    }
                    if (dd.embedconfig.miniatura !== null) {
                        embed.setThumbnail(dd.embedconfig.miniatura)
                    }

                    if(DefaultMessages.get(`ConfigGeral.embedrodape`) !== null){
                        embed.setFooter({text: DefaultMessages.get(`ConfigGeral.embedrodape`)})
                      }

                    var color = null
                    if (embeddesc.colorbutton == 'Vermelho') {
                        color = 4
                    } else if (embeddesc.colorbutton == 'Azul') {
                        color = 1
                    } else if (embeddesc.colorbutton == 'Verde') {
                        color = 3
                    } else if (embeddesc.colorbutton == 'Cinza') {
                        color = 2
                    } else {
                        color = 3
                    }

                    const row = new ActionRowBuilder()
                    if (embeddesc.emojibutton == null) {
                        row.addComponents(
                            new ButtonBuilder()
                                .setCustomId(`${ID}_${interaction.guild.id}`)
                                .setLabel(`${DefaultMessages.get(`ConfigGeral.textbutton`) == null ? 'Comprar' : DefaultMessages.get(`ConfigGeral.textbutton`)}`)
                                .setStyle(color)
                                .setEmoji('1120562080710402168')
                                .setDisabled(false),
                        )
                    } else {
                        row.addComponents(
                            new ButtonBuilder()
                                .setCustomId(`${ID}_${interaction.guild.id}`)
                                .setLabel(`${DefaultMessages.get(`ConfigGeral.textbutton`) == null ? 'Comprar' : DefaultMessages.get(`ConfigGeral.textbutton`)}`)
                                .setStyle(color)
                                .setEmoji(DefaultMessages.get(`ConfigGeral.emojibutton`))
                                .setDisabled(false),
                        )
                    }




                    try {
                        const channel = await client.channels.fetch(dd.ChannelID);
                        const fetchedMessage = await channel.messages.fetch(dd.MessageID);

                        await fetchedMessage.edit({ embeds: [embed], components: [row] });
                    } catch (error) {
                   
                    }
                }

            }


            if (interaction.customId.startsWith('resetdefaultpersonalizar')) {

                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return interaction.deferUpdate()

                DefaultMessages.set(`ConfigGeral`, {
                    embeddesc: "```\n#{desc}```\n🪐 **| Nome: #{nome}**\n💸 **| Preço: __R$#{preco}__**\n📦 **| Estoque: __#{estoque}__**",
                    embedtitle: "#{nome} | Produto",
                })

                StartPersonalizarMessage(interaction, client, interaction.user.id)
                interaction.reply({ content: `${obterEmoji(8)} | Embed Resetada com Sucesso!` }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 2000);
                })
            }




            if (interaction.customId.startsWith('editpersonalizarbutton')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                buttonedits(interaction, client)


            }


            if (interaction.customId.startsWith('returnashdawgviduwado1787231')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                StartPersonalizarMessage(interaction, client, interaction.user.id)
            }

            if (interaction.customId.startsWith('emojibuttonuhdu8widpwodw')) {
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return interaction.deferUpdate()
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
                            DefaultMessages.set(`ConfigGeral.emojibutton`, u)

                            msg.reply({ content: `${obterEmoji(8)} | Emoji do Button atualizado com sucesso` }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 2000);
                            })

                            buttonedits(interaction, client)

                        } else {
                            buttonedits(interaction, client)
                            return interaction.reply({ content: `${obterEmoji(22)}| Você selecionou um EMOJI inválido`, flags: 64 })
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


            if (interaction.customId.startsWith('colorbuttonaDJAWGVKJL')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
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
                            buttonedits(interaction, client)
                            return msg.reply({ content: `${obterEmoji(22)}| Você selecionou uma COR inválida`, flags: 64 }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 2000);
                            })
                        }

                        DefaultMessages.set(`ConfigGeral.colorbutton`, u)

                        msg.reply({ content: `${obterEmoji(8)} | Color do Button atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        buttonedits(interaction, client)
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




            if (interaction.customId.startsWith('177627tg23y9f7e6rt8623nuhy28fyg')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar`)
                    .setDescription(`Clique no que você deseja personalizar:`)
                    .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("idhasigfgsiuydasygud9sa6d8d87sdbysagbd")
                            .setLabel('Alterar Emojis Padrões')
                            .setEmoji(`1123365701479039106`)
                            .setStyle(1)
                            .setDisabled(false),)

                interaction.message.edit({ embeds: [embed], components: [row] }).then(u => {
                    createCollector(u)
                })
            }




            if (interaction.customId.startsWith('RETURN881239131231')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar`)
                    .setDescription(`Clique no que você deseja personalizar:`)
                    .setFooter({ text: `${client.user.username} - Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("idhasigfgsiuydasygud9sa6d8d87sdbysagbd")
                            .setLabel('Alterar Emojis Padrões')
                            .setEmoji(`1123365701479039106`)
                            .setStyle(1)
                            .setDisabled(false),)

                interaction.message.edit({ embeds: [embed], components: [row] }).then(u => {
                    createCollector(u)
                })
            }

            if (interaction.customId.startsWith('idhasigfgsiuydasygud9sa6d8d87sdbysagbd')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                emojieditmessagedault(interaction, client)
            }



            if (interaction.customId.startsWith('wadawdawdwadwadwdwdwdwdaw2323232321212')) {
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return interaction.deferUpdate()
                editemoji(interaction, client)
            }

            if (interaction.customId.startsWith('textbuttonasdkunaodygawdiakw')) {
                interaction.deferUpdate()
                var t = await uu.get(interaction.message.id)
                if (interaction.user.id !== t) return
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Personalizar Mensagem de Compra`)
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
                        DefaultMessages.set(`ConfigGeral.textbutton`, primeiros25)

                        msg.reply({ content: `${obterEmoji(8)} | Texto do Button atualizado com sucesso` }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 2000);
                        })

                        buttonedits(interaction, client)
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