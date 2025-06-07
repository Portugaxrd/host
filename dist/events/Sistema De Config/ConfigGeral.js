const { UpdateStatusVendas, updateMessageConfig, UpdatePagamento, ConfigMP, ToggeMP, TimeMP, ToggleSaldo, bonusSaldo, ConfigSaldo, ConfigSemiAuto, ToggleSemiAuto, PixChangeSemiAuto, configbot, configbotToggle, FunctionCompletConfig, configchannels, configchannelsToggle, CompletConfigChannels, ConfigTermoConfig, ConfigTermo, ConfigCashBack, ToggleTickets, ConfigurarPaymentTicket, ConfigMPTicket, ToggeMPTicket, TimeMPTicket, ConfigSemiAutoTicket, ToggleSemiAutoTicket, configbotTicket, configbotToggleTicket, FunctionCompletConfigTicket, ConfigurarCanaisTicket } = require("../../FunctionsAll/BotConfig")
const { InteractionType, EmbedBuilder, ChannelType, ChannelSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const { General, Tickets, PainelTickets, PerfilMembros, RankTicketsIDs } = require("../../../DataBaseJson");
const { PainelPrincipal } = require("../../FunctionsAll/PainelFunction");

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
            if (interaction.customId === 'tempoMP1232') {
                TimeMPTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId === 'tokenMPTicket') {
                TimeMPTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId === 'ChangeAvatarticket') {
                FunctionCompletConfigTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId === 'newnamebotticket') {
                FunctionCompletConfigTicket(interaction, interaction.user.id, client)
            }
        }

        if (interaction.isButton()) {


            if (interaction.customId == 'ConfigurarPainel') {
                const produtos = Tickets.fetchAll()
                const paineis = PainelTickets.fetchAll()
                let embed = {
                    "color": 5814783,
                    "fields": [
                      {
                        "name": "> Quantidade de Produtos:",
                        "value": `\`🥊 ${produtos.length} produtos\``,
                        "inline": true
                      },
                      {
                        "name": "> Quantidade de Painéis:",
                        "value": `\`📦 ${paineis.length} painéis\``,
                        "inline": true
                      },
                      {
                        "name": "> Comando Temporarios:",
                        "value": "`🥊 /criar`\n`🥊 /config`\n`🥊 /set`\n\n`🥊 /criarpainel`\n`🥊 /set_painel`\n`🥊 /config_painel`"
                      }
                    ],
                    "author": {
                      "name": "Sistema em desenvolvimento...",
                      "icon_url": "https://cdn.discordapp.com/emojis/1232782650385629299.webp?size=96&quality=lossless"
                    },
                    "footer": {
                      "text": "- Todos sistemas estão funcionando normalmente, pretenderemos apenas otimizar 😀"
                    }
                  }


                return interaction.reply({ embeds: [embed], flags: 64 })
                PainelPrincipal(client, interaction)
            }

            if (interaction.customId === 'ResetwadawdawTicketsandPaineis') {
                interaction.deferUpdate()
                var a = Tickets.fetchAll()
                var b = PainelTickets.fetchAll()

                for (var i = 0; i < a.length; i++) {
                    var obj = a[i];
                    var ID = obj.data.ID;
                    var dd = Tickets.get(`${ID}_Ticket`)
                    try {
                        const channel = await client.channels.fetch(dd.ChannelID);
                        const fetchedMessage = await channel.messages.fetch(dd.MessageID);
                        fetchedMessage.delete()
                    } catch (error) {

                    }
                }

                for (let bbbb = 0; bbbb < b.length; bbbb++) {
                    const element = b[bbbb];
                    try {
                        const channel = await client.channels.fetch(element.data.ChannelID);
                        const fetchedMessage = await channel.messages.fetch(element.data.MessageID);
                        fetchedMessage.delete()
                    } catch (error) {

                    }

                }

                Tickets.deleteAll()
                PainelTickets.deleteAll()
                interaction.channel.send({ content: `${obterEmoji(8)} | Os tickets e paineis foram resetados`, flags: 64 }).then(msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, 3000);
                })

            }

            if (interaction.customId.startsWith('90878f79vbfd78g797g9et6812vgye3gbuoe432')) {
                interaction.deferUpdate()
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Comandos Liberados Para todos os Usuários`)
                    .addFields(
                        {
                            name: `${obterEmoji(1)} /help`,
                            value: `\`Exibe essa mensagem.\``
                        },
                        {
                            name: `${obterEmoji(1)} /perfil`,
                            value: `\`Mostra o perfil de quem enviou o comando.\``
                        },
                        {
                            name: `${obterEmoji(1)} /rank`,
                            value: `\`Mostra o rank de pessoas que mais abriram tickets.\``
                        },
                        {
                            name: `${obterEmoji(1)} /cleardm`,
                            value: `\`Apagar as mensagens do bot da sua dm.\``
                        },

                    )
                    .setFooter({ text: `Página 1/2`, iconURL: interaction.guild.iconURL() })

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("aiygdasigydawdawdw67t2t32bh32yu3")
                            .setLabel('Comandos Adm')
                            .setEmoji(`<:staff:1240114382298546217>`)
                            .setStyle(1)
                            .setDisabled(false),
                    )

                interaction.message.edit({ embeds: [embed], components: [row] }).then(async u => {
                    createCollector(u)
                })
            }

            if (interaction.customId.startsWith('aiygdasigydawdawdw67t2t32bh32yu3')) {
                interaction.deferUpdate()
                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Comandos Liberados Para todos os Usuários`)
                    .setFooter({ text: `Página 2/2`, iconURL: interaction.guild.iconURL() })
                    .addFields(
                        {
                            name: `${obterEmoji(1)} /botconfig`,
                            value: `\`Configura o bot e os canais.\``
                        },
                        {
                            name: `${obterEmoji(1)} /criar`,
                            value: `\`Cria um Ticket para venda.\``
                        },
                        {
                            name: `${obterEmoji(1)} /config`,
                            value: `\`Configura o Ticket selecionado.\``
                        },
                        {
                            name: `${obterEmoji(1)} /set`,
                            value: `\`Seta a mensagem de Ticket.\``
                        },
                        {
                            name: `${obterEmoji(1)} /permadd`,
                            value: `\`Concede a permissão de usar o bot para um usuário.\``
                        },
                        {
                            name: `${obterEmoji(1)} /permremove`,
                            value: `\`Remove a permissão de um usuário\``
                        },
                        {
                            name: `${obterEmoji(1)} /permlista`,
                            value: `\`Ver todos os usuários que tem permissão\``
                        },
                        {
                            name: `${obterEmoji(1)} /personalizar`,
                            value: `\`Personalize uma embed\``
                        },
                        {
                            name: `${obterEmoji(1)} /rankadm`,
                            value: `\`Mostra o rank de pessoas que mais abriram Ticket.\``
                        },
                        {
                            name: `${obterEmoji(1)} /resetar`,
                            value: `\`Reseta as Estatisticas, o Perfil, Rank, etc.\``
                        },
                        {
                            name: `${obterEmoji(1)} /anunciar`,
                            value: `\`Faz o bot enviar um anuncio.\``
                        }
                    )




                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("90878f79vbfd78g797g9et6812vgye3gbuoe432")
                            .setLabel('Comandos de Livre uso.')
                            .setEmoji(`<:staff:1240114382298546217>`)
                            .setStyle(3)
                            .setDisabled(false),
                    )
                interaction.message.edit({ embeds: [embed], components: [row] }).then(async u => {
                    createCollector(u)
                })
            }


            if (interaction.customId == 'resetperfilestatisticasTickets') {
                interaction.deferUpdate()
                PerfilMembros.deleteAll()
                interaction.channel.send({ content: `${obterEmoji(8)} | As estatisticas foram resetadas com sucesso!`, flags: 64 }).then(msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, 3000);
                })
            }

            if (interaction.customId == 'ResasdsadetsadasdasdsadasTicketsandPaineis') {
                interaction.deferUpdate()
                RankTicketsIDs.deleteAll()
                interaction.channel.send({ content: `${obterEmoji(8)} | O Rank de tickets foram resetadas com sucesso!`, flags: 64 }).then(msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, 3000);
                })
            }





            if (interaction.customId == 'ToggleTickets') {
                ToggleTickets(interaction, interaction.user.id, client)
            }

            if (interaction.customId == 'ConfigurarPaymentTicket') {
                ConfigMPTicket(interaction, interaction.user.id, client)
            }

            if (interaction.customId == 'returnconfigTicket') {
                updateMessageConfig(interaction, interaction.user.id, client)
            }



            if (interaction.customId == 'PixMPToggleTicket') {
                ToggeMPTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId == 'SiteMPToggleTicket') {
                ToggeMPTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId == 'TimePagamentTicket') {
                ToggeMPTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId == 'TokenAcessMPTicket') {
                ToggeMPTicket(interaction, interaction.user.id, client)
            }

            if (interaction.customId == 'ConfigurarBotGeral') {
                configbotTicket(interaction, interaction.user.id, client)
            }

            if (interaction.customId == 'ChangeNameTicket') {
                configbotToggleTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId == 'ChangeAvatarTicket') {
                configbotToggleTicket(interaction, interaction.user.id, client)
            }

            if (interaction.customId == 'ConfigurarCanaisTicket') {
                ConfigurarCanaisTicket(interaction, interaction.user.id, client)


            }

            if (interaction.customId == 'AlterarChannelAvaliar') {

                const select = new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                            .setCustomId('canalavaliarticket')
                            .setPlaceholder('Selecione abaixo qual será o CHANNEL de avaliar do seu servidor.')
                            .setMaxValues(1)
                            .addChannelTypes(ChannelType.GuildText)
                    )

                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("ConfigurarCanaisTicket")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),
                    )
                interaction.update({ components: [select, row2] })

            }

            if (interaction.customId == 'AlterarChannelLogs') {

                const select = new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                            .setCustomId('canallogticket')
                            .setPlaceholder('Selecione abaixo qual será o CHANNEL de logs do seu servidor.')
                            .setMaxValues(1)
                            .addChannelTypes(ChannelType.GuildText)
                    )

                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("ConfigurarCanaisTicket")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),
                    )
                interaction.update({ components: [select, row2] })
            }
            if (interaction.customId == 'AlterarCategoriaTicketsDefaults') {

                const select = new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                            .setCustomId('categoriatickets')
                            .setPlaceholder('Selecione abaixo qual será a CATEGORIA de seus TICKETS.')
                            .setMaxValues(1)
                            .addChannelTypes(ChannelType.GuildCategory)
                    )

                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("ConfigurarCanaisTicket")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),
                    )
                interaction.update({ components: [select, row2] })
            }

        }

        if (interaction.isChannelSelectMenu()) {
            if (interaction.customId == 'canallogticket') {
                General.set('ConfigGeral.Channels.ChannelsLogs', interaction.values[0])
                ConfigurarCanaisTicket(interaction, interaction.user.id, client)
            }
            if (interaction.customId == 'canalavaliarticket') {
                General.set('ConfigGeral.Channels.ChannelsAvaliar', interaction.values[0])
                ConfigurarCanaisTicket(interaction, interaction.user.id, client)
            }


            if (interaction.customId == 'categoriatickets') {
                General.set('ConfigGeral.Channels.CategoriaTickets', interaction.values[0])
                ConfigurarCanaisTicket(interaction, interaction.user.id, client)
            }
        }
    }
}
