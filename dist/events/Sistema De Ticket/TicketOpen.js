const { UpdateStatusVendas, updateMessageConfig, UpdatePagamento, ConfigMP, ToggeMP, TimeMP, ToggleSaldo, bonusSaldo, ConfigSaldo, ConfigSemiAuto, ToggleSemiAuto, PixChangeSemiAuto, configbot, configbotToggle, FunctionCompletConfig, configchannels, configchannelsToggle, CompletConfigChannels, ConfigTermoConfig, ConfigTermo, ConfigCashBack, ToggleTickets, ConfigurarPaymentTicket, ConfigMPTicket, ToggeMPTicket, TimeMPTicket, ConfigSemiAutoTicket, ToggleSemiAutoTicket, configbotTicket, configbotToggleTicket, FunctionCompletConfigTicket, ConfigurarCanaisTicket } = require("../../FunctionsAll/BotConfig")
const { InteractionType, EmbedBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder, StringSelectMenuBuilder, ChannelType, UserSelectMenuBuilder, AttachmentBuilder, Embed } = require('discord.js');
const { obterEmoji } = require("../../Handler/EmojiFunctions");
const { Tickets, General, TicketsSave, TicketsLogs, RankTicketsIDs, PerfilMembros } = require("../../../DataBaseJson");
const mercadopago = require("mercadopago");
const { createAudioResource, joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, entersState, AudioPlayerStatus } = require('@discordjs/voice');
const lastButtonReactions = {};

const { QuickDB } = require("quick.db");
const { getCache } = require("../../FunctionsAll/PermissionAPI/PermissionGet");
const db = new QuickDB();

module.exports = {
    name: 'interactionCreate',

    run: async (interaction, client) => {

        if (interaction.isRoleSelectMenu()) {
            if (interaction.customId == 'cargosSuporteGeral') {
                let roles = interaction.values[0]
                if (roles == undefined) {
                    await General.delete('ConfigGeral.cargos.SuporteGeral')
                } else {

                    await General.set('ConfigGeral.cargos.SuporteGeral', roles)

                }
                await ConfigurarCanaisTicket(interaction)

                if (roles) {
                    interaction.followUp({ content: `${obterEmoji(8)} | Você alterou o cargo de suporte geral para ${interaction.guild.roles.cache.get(roles)}`, flags: 64 })

                } else {
                    interaction.followUp({ content: `${obterEmoji(8)} | Você removeu o cargo de suporte geral`, flags: 64 })
                }


            }
        }


        if (interaction.isButton()) {
            if (interaction.customId === 'denyaddplayer') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var user2
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        var user3 = element.data.requisicao.IDAdicionou
                        var user2 = element.data.requisicao.IDUser
                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return

                        interaction.message.delete()

                        const member = await interaction.guild.members.fetch(user2);
                        const member2 = await interaction.guild.members.fetch(user3);

                        try {

                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Sua solicitação foi NEGADA!")
                                .setDescription(`👀 Olá ${member2.user}\n\nO Staff ${interaction.user} recusou sua solicitação para adicionar o MEMBRO ${member.user} em seu TICKET!`)
                                .setColor("2b2d31")

                            await member2.send({ embeds: [embed] })
                        } catch (error) {

                        }
                    }
                }
            }


            if (interaction.customId === 'acceptaddmember') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var user2
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        var user2 = element.data.requisicao.IDUser
                        var user3 = element.data.requisicao.IDAdicionou
                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return
                        channelToEdit = client.channels.cache.get(element.data.ChannelID);
                        interaction.message.edit({ embeds: [], components: [], content: `${obterEmoji(8)} | O usuário <@${user2}> foi adicionado nesse TICKET.` })
                        try { await channelToEdit.permissionOverwrites.edit(user2, { ViewChannel: true }); } catch (error) { }

                        const member = await interaction.guild.members.fetch(user2);
                        const member2 = await interaction.guild.members.fetch(user3);

                        try {

                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Adicionado em um Ticket")
                                .setDescription(`👀 Olá ${member.user}\n\nO Staff ${interaction.user} te adicionou em um ticket pendente\n O mesmo está te aguardando no ticket <#${element.data.ChannelID}>`)
                                .setFooter({ text: "Caso queira ser redirecionado, use o botão abaixo" })
                                .setColor("2b2d31")

                            const row = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setLabel('Ir até o Ticket')
                                    .setEmoji("1127807114430119988")
                                    .setURL(element.data.ChannelURL)
                                    .setStyle(5)
                            );

                            await member.send({ embeds: [embed], components: [row] })
                        } catch (error) {

                        }

                        try {

                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Sua solicitação foi aceita!")
                                .setDescription(`👀 Olá ${member2.user}\n\nO Staff ${interaction.user} aceitou sua solicitação para adicionar o MEMBRO ${member.user} em seu TICKET!\n O mesmo está te aguardando no ticket <#${element.data.ChannelID}>`)
                                .setFooter({ text: "Caso queira ser redirecionado, use o botão abaixo" })
                                .setColor("2b2d31")

                            const row = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setLabel('Ir até o Ticket')
                                    .setEmoji("1127807114430119988")
                                    .setURL(element.data.ChannelURL)
                                    .setStyle(5)
                            );

                            await member2.send({ embeds: [embed], components: [row] })
                        } catch (error) {

                        }


                    }
                }
            }
        }

        if (interaction.isUserSelectMenu()) {

            if (interaction.customId == 'dfsajkfsaighfasuhdfsa6q78ehfeh8f8e6') {
                const member = await interaction.guild.members.fetch(interaction.values[0]);
                var get = TicketsSave.fetchAll()

                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)

                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.update({ components: [], embeds: [], content: `${obterEmoji(22)} | Você não possui PERMISSÃO para remover nenhum usuário desse TICKET.` })

                        const member2 = await interaction.guild.members.fetch(member);
                        channelToEdit = client.channels.cache.get(element.data.ChannelID);


                        interaction.update({ components: [], embeds: [], content: `${obterEmoji(8)} | Você removeu o usuário ${member2.user} do TICKET!` })

                        try { await channelToEdit.permissionOverwrites.edit(member2.user.id, { ViewChannel: false }); } catch (error) { }

                        try {

                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Removido de um TICKET!")
                                .setDescription(`👀 Olá ${member2.user}\n\nO Staff ${interaction.user} te removeu de um ticket`)
                                .setColor("2b2d31")


                            member2.send({ embeds: [embed], content: `${member2.user}` })
                        } catch (error) {

                        }


                    }
                }

            }



            if (interaction.customId == '7dya8f0ya6f8obyaf8ayfta96f7afbasft9as') {
                const member = await interaction.guild.members.fetch(interaction.values[0]);
                var get = TicketsSave.fetchAll()

                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)

                        if (h.some(cargoId => interaction.member.roles.cache.has(cargoId))) {

                            channelToEdit = client.channels.cache.get(element.data.ChannelID);
                            try { await channelToEdit.permissionOverwrites.edit(member.user.id, { ViewChannel: true }); } catch (error) { }


                            interaction.update({ content: `${obterEmoji(8)} | Você adicionou o usuário ${member.user} nesse TICKET!`, components: [], embeds: [], flags: 64 })

                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Adicionado em um Ticket")
                                .setDescription(`👀 Olá ${member.user}\n\nO Staff ${interaction.user} te adicionou em um ticket pendente\n O mesmo está te aguardando no ticket <#${element.data.ChannelID}>`)
                                .setFooter({ text: "Caso queira ser redirecionado, use o botão abaixo" })
                                .setColor("2b2d31")

                            const row = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setLabel('Ir até o Ticket')
                                    .setEmoji("1127807114430119988")
                                    .setURL(element.data.ChannelURL)
                                    .setStyle(5)
                            );

                            try {
                                await member.send({ embeds: [embed], components: [row] })
                            } catch (error) {

                            }

                        } else {

                            interaction.update({ content: `${obterEmoji(8)} | Foi enviado uma solicitação para aceitarem adicionar o usuário ${member.user} nesse TICKET!`, components: [], embeds: [], flags: 64 })

                            if (element.data.Assumiu !== null) {
                                const embed = new EmbedBuilder()

                                    .setTitle("🚨 Requisição Ticket")
                                    .setDescription(`👀 Olá <@${element.data.Assumiu}>\n\nO Usuário ${interaction.user} está querendo adicionar o MEMBRO \`${member.user.username}\` ao TICKET\n Clique abaixo para aceitar ou negar a solicitação.`)
                                    .setFooter({ text: "Caso queira ser redirecionado, use o botão abaixo" })
                                    .setColor("2b2d31")

                                const row = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Ir até o Ticket')
                                        .setEmoji("1127807114430119988")
                                        .setURL(element.data.ChannelURL)
                                        .setStyle(5)
                                );

                                const member2 = await interaction.guild.members.fetch(element.data.Assumiu);

                                try {
                                    await member2.send({ embeds: [embed], components: [row] })
                                } catch (error) {

                                }

                            }


                            const embed = new EmbedBuilder()

                                .setTitle("🚨 Requisição Adicionar Membro")
                                .setDescription(`👀 O Usuário ${interaction.user} está querendo adicionar o MEMBRO ${member.user} ao TICKET\n Clique abaixo para aceitar ou negar a solicitação.`)
                                .setColor("2b2d31")

                            const row = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setLabel('Aceitar Requisição')
                                    .setEmoji("1130618382295765014")
                                    .setCustomId("acceptaddmember")
                                    .setStyle(2),
                                new ButtonBuilder()
                                    .setLabel('Negar Requisição')
                                    .setEmoji("1130618545697456158")
                                    .setCustomId("denyaddplayer")
                                    .setStyle(4),
                            );

                            interaction.channel.send({ embeds: [embed], components: [row] }).then(msg => {
                                TicketsSave.set(`${element.ID}.requisicao.IDUser`, member.user.id)
                                TicketsSave.set(`${element.ID}.requisicao.IDAdicionou`, interaction.user.id)
                            })


                        }
                    }
                }
            }


            if (interaction.customId == 'removermembercallticket') {

                const member = await interaction.guild.members.fetch(interaction.values[0]);
                var get = TicketsSave.fetchAll()

                var tttt
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        tttt = element.data.ChannelVoiceID
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.deferUpdate()
                    }
                }

                channelToEdit = client.channels.cache.get(tttt);

                try { await channelToEdit.permissionOverwrites.edit(member.user.id, { ViewChannel: false }); } catch (error) { }

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Call de Suporte')
                        .setEmoji("1128033945053839482")
                        .setURL(bbbb)
                        .setStyle(5)
                );
                const row2 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Adicionar Membro (CALL)')
                        .setEmoji("1129816192895426580")
                        .setCustomId('addmembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Remover Membro (CALL)')
                        .setEmoji("1129816384621252641")
                        .setCustomId('removermembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Finalizar Chamado (CALL)')
                        .setEmoji("1129816299732733973")
                        .setCustomId('closecallticket')
                        .setStyle(4),
                );

                interaction.message.edit({ components: [row2, row] })
                interaction.reply({ content: `Você removeu o usuário ${member.user} \`${member.user.id}\` com  sucesso no canal de voz.`, flags: 64 })


            }


            if (interaction.customId == 'addmembercallticket') {

                const member = await interaction.guild.members.fetch(interaction.values[0]);
                var get = TicketsSave.fetchAll()

                var tttt
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        tttt = element.data.ChannelVoiceID
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.deferUpdate()
                    }
                }

                channelToEdit = client.channels.cache.get(tttt);

                try { await channelToEdit.permissionOverwrites.edit(member.user.id, { ViewChannel: true }); } catch (error) { }

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Call de Suporte')
                        .setEmoji("1128033945053839482")
                        .setURL(bbbb)
                        .setStyle(5)
                );
                const row2 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Adicionar Membro (CALL)')
                        .setEmoji("1129816192895426580")
                        .setCustomId('addmembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Remover Membro (CALL)')
                        .setEmoji("1129816384621252641")
                        .setCustomId('removermembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Finalizar Chamado (CALL)')
                        .setEmoji("1129816299732733973")
                        .setCustomId('closecallticket')
                        .setStyle(4),
                );

                interaction.message.edit({ components: [row2, row] })
                interaction.reply({ content: `Você adicionou o usuário ${member.user} \`${member.user.id}\` com  sucesso no canal de voz.`, flags: 64 })


                const row3 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Visualizar a Chamada')
                        .setEmoji("1129816054982508694")
                        .setURL(bbbb)
                        .setStyle(5)
                );

                const embed = new EmbedBuilder()
                    .setColor("2b2d31")
                    .setTitle("Adicionado em uma Chamada! 🚨")
                    .setDescription(`Olá ${member.user}\n\nAlgúem adicionou você em uma chamada!!\n\nO mesmo está te aguardando na call...\n\nPara redirecionar para a call clique abaixo`)
                    .setFooter({ iconURL: `${member.user.displayAvatarURL()}`, text: `O servidor ${interaction.guild.name} Agradece sua colaboração!` });

                try {
                    await member.send({ embeds: [embed], components: [row3] })
                } catch (error) {

                }

            }
        }

        if (interaction.type == InteractionType.ModalSubmit) {

            if (interaction.customId === 'PagamentosTicket') {
                const valor = interaction.fields.getTextInputValue('valor');
                const razao = interaction.fields.getTextInputValue('razao');
                const produto = interaction.fields.getTextInputValue('produto');

                if (isNaN(valor)) return interaction.update({ content: `${obterEmoji(22)} | Você inseriu um VALOR inválido em sua criação de pagamento.`, components: [], flags: 64 }).then(msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, 4000);
                })


                interaction.update({ content: `🔄 Verificando o Status de seu TOKEN....`, components: [] }).then(async msgg => {

                    const axios = require('axios');
                    await axios.get('https://api.mercadopago.com/v1/payment_methods', {
                        headers: {
                            'Authorization': `Bearer ${General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP}`
                        }
                    })
                        .then(async (data) => {


                            var get = TicketsSave.fetchAll()
                            for (let i = 0; i < get.length; i++) {
                                const element = get[i];
                                if (element.data.ChannelID == interaction.channel.id) {
                                    TicketsSave.set(`${element.ID}.pagamentos.RazaoPagamento`, razao)
                                    TicketsSave.set(`${element.ID}.pagamentos.ValorPagamento`, valor)
                                    TicketsSave.set(`${element.ID}.pagamentos.ProdutosPagamento`, produto)

                                }
                            }

                            const embed = new EmbedBuilder()
                                .setColor("#2b2d31")
                                .setTitle(`${client.user.username} | Sistema de pagamento`)
                                .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n${obterEmoji(12)} **| Produto(s):**\n${razao}\n${obterEmoji(14)} **| Valor:**\nR$${Number(valor).toFixed(2)}
                    `)
                                .setFooter({ text: `Escolha a forma de pagamento utilizando os botões abaixo:` })


                            const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("22222chec2222koultp2222222ix")
                                        .setLabel('Pix')
                                        .setEmoji(`1116578131667599432`)
                                        .setStyle(1)
                                        .setDisabled(false),
                                    new ButtonBuilder()
                                        .setCustomId("2222che222ckoutsit222eeee")
                                        .setLabel('Pagar no Site')
                                        .setEmoji(`1097965960356450464`)
                                        .setStyle(1)
                                        .setDisabled(false),
                                    new ButtonBuilder()
                                        .setCustomId("222stopco22mpracancellastfase222")
                                        .setEmoji(`<a:xanimado:1258101250411597887>`)
                                        .setStyle(4)
                                        .setDisabled(false),)

                            interaction.channel.send({ embeds: [embed], components: [row] })


                            interaction.editReply({ content: `${obterEmoji(8)} | Pagamento Gerado com sucesso.`, components: [] })



                        })
                        .catch(async error => {
                            await interaction.editReply({ content: `${obterEmoji(22)} | Error Mercado Pago: ${error.response.data.message}`, components: [], flags: 64 })
                        });



                })


            }


            if (interaction.customId === 'opensticket222') {
                const motivo = interaction.fields.getTextInputValue('motivo');
                const desc = interaction.fields.getTextInputValue('desc');

                await interaction.reply({ content: `🔄 | Estamos gerando seu TICKET.`, flags: 64 })
                TicketOpen(motivo, desc)
            }

            if (interaction.customId === 'newnameticket') {
                const name = interaction.fields.getTextInputValue('newnameticket');

                interaction.channel.setName(`📁・${name}`)

                interaction.update({ content: `${obterEmoji(8)} | ${interaction.user}, você alterou o nome do canal para *📁・${name}*`, components: [] }).then(msg => {
                    setTimeout(async () => {
                        try { await msg.delete() } catch (error) { }
                    }, 3000);
                })
            }
        }


        if (interaction.isStringSelectMenu()) {
            if (interaction.values[0] === 'RenomearTicket') {
                const modalaAA = new ModalBuilder()
                    .setCustomId('newnameticket')
                    .setTitle(`👋 | Altere o nome do ticket!`);
                const newnameboteN = new TextInputBuilder()
                    .setCustomId('newnameticket')
                    .setLabel("Digite qual será novo NOME do ticket:")
                    .setPlaceholder("Exemplo: Joãozinho 01")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)


                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                modalaAA.addComponents(firstActionRow3);
                await interaction.showModal(modalaAA);
            }


            if (interaction.values[0] === 'EnviarPoke') {
                var get = TicketsSave.fetchAll()

                var d
                var b


                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        d = element.data.Usuario
                        b = element.data.ChannelURL
                    }
                }

                const member = await interaction.guild.members.fetch(d);

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Visualizar o Ticket')
                        .setEmoji("1127807114430119988")
                        .setURL(b)
                        .setStyle(5)
                );

                const embed = new EmbedBuilder()
                    .setColor("2b2d31")
                    .setTitle("POKADO em um Ticket! 🚨")
                    .setDescription(`Olá ${member.user}\n\nAlgúem POKOU você em um ticket aberto!!\n\nO mesmo está aguardando por uma resposta...`)
                    .setFooter({ iconURL: `${member.user.displayAvatarURL()}`, text: `O servidor ${interaction.guild.name} Agradece sua colaboração!` });

                try {
                    await member.send({ embeds: [embed], components: [row] })
                } catch (error) {

                }


                interaction.update({ content: `${obterEmoji(8)} | ${interaction.user}, você pokou o usuário ${member.user} com sucesso.`, components: [] }).then(msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, 3000);
                })
            }


            if (interaction.values[0] === 'NotificarStaff') {

                const now = Date.now();
                const memberId = interaction.user.id;
                if (lastButtonReactions[memberId] && now - lastButtonReactions[memberId] < 900000) {
                    return interaction.update({ components: [], content: `${obterEmoji(22)} | Você só pode Notificar um STAFF a cada 15 minutos.` });
                }

                var get = TicketsSave.fetchAll()
                var d
                var ee
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {

                        if (element.data.Assumiu == null) return interaction.update({ components: [], content: `${obterEmoji(22)} | Seu TICKET não foi assumido por nenhum STAFF!` })
                        d = element.data.Assumiu
                        ee = element.data.ChannelURL
                    }
                }

                const member = await interaction.guild.members.fetch(d);

                const embed = new EmbedBuilder()

                    .setTitle(":rotating_light: Ticket Pendente")
                    .setColor("2b2d31")
                    .setDescription(`:alarm_clock: Olá <@${d}>,\n\n:dash: Um ticket na qual você assumiu, o ${interaction.user} está aguardando sua resposta.\n\n🛑 Peço que clique no botão abaixo para redirecionar para o ticket`)
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Ir até o Ticket')
                            .setEmoji(`1127807114430119988`)
                            .setURL(ee)
                            .setStyle(5)
                            .setDisabled(false),)
                try {
                    interaction.update({ components: [], content: `${obterEmoji(8)} | O Staff na qual assumiu o TICKET foi avisado que você está precisando de uma RESPOSTA!` })
                    await member.send({ embeds: [embed], components: [row] })
                    lastButtonReactions[memberId] = now;
                } catch (error) {
                    lastButtonReactions[memberId] = now;
                    interaction.update({ components: [], content: `${obterEmoji(8)} | O Staff na qual assumiu o TICKET está com sua DM fechado, portanto irei marcando ele aqui.` })
                    interaction.channel.send({ content: `❗ ${member.user} o membro ${interaction.user} está precisando de uma resposta, como seu PRIVADO estava fechado tive que marca-lo aqui!!` })
                }

            }

            if (interaction.values[0] === 'PagamentosTicket') {



                const modalaAA = new ModalBuilder()
                    .setCustomId('PagamentosTicket')
                    .setTitle(`💵 | Sistema de Pagamento`);

                const newnameboteN = new TextInputBuilder()
                    .setCustomId('valor')
                    .setLabel("Valor do pagamento?")
                    .setPlaceholder("Exemplo: 1.05")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)


                const newnamebote2 = new TextInputBuilder()
                    .setCustomId('razao')
                    .setLabel("Razão do Pagamento?")
                    .setPlaceholder("Exemplo: Compra de um Sistema (TICKET)")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMaxLength(200)
                    .setRequired(true)


                const newnamebote3 = new TextInputBuilder()
                    .setCustomId('produto')
                    .setLabel("O que será entregue após aprovado?")
                    .setPlaceholder("Exemplo: skw38654@yahoo.com:Chess#00")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMaxLength(200)
                    .setRequired(true)

                const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                const firstActionRow2 = new ActionRowBuilder().addComponents(newnamebote2);
                const firstActionRow1 = new ActionRowBuilder().addComponents(newnamebote3);
                modalaAA.addComponents(firstActionRow3, firstActionRow2, firstActionRow1);
                await interaction.showModal(modalaAA);


            }


            if (interaction.values[0] === 'addmemberticketind') {

                const embed = new EmbedBuilder()
                    .setTitle(":busts_in_silhouette:  Gerenciando Usuários no Ticket")
                    .setDescription(`:arrow_right: Selecione abaixo no SELECT MENU quem você deseja adicionar ao ticket\n\n:mega: Lembre-se, ao adicionar o membro, ele terá permissão de visualizar o ticket e será avisado no privado\n\n:pushpin: Caso queira REMOVER do canal, use a opção REMOVER USUÁRIO`)
                    .setColor("2b2d31")

                const select = new ActionRowBuilder()
                    .addComponents(
                        new UserSelectMenuBuilder()
                            .setCustomId('7dya8f0ya6f8obyaf8ayfta96f7afbasft9as')
                            .setPlaceholder('Selecione abaixo qual membro deseja adicionar no TICKET!')
                    )
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("voltarmessageaddmember")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),)


                interaction.update({ embeds: [embed], components: [select, row2] })
            }


            if (interaction.values[0] === 'removememberticketind') {

                const embed = new EmbedBuilder()
                    .setTitle(":busts_in_silhouette:  Gerenciando Usuários no Ticket")
                    .setDescription(`:arrow_right: Selecione abaixo no SELECT MENU quem você deseja remover do ticket\n\n:mega: Lembre-se, ao remover o membro, ele perderá permissão de visualizar o ticket e será avisado no privado\n\n:pushpin: Caso queira ADICIONAR novamente ao canal, use a opção ADICIONAR USUÁRIO`)
                    .setColor("2b2d31")

                const select = new ActionRowBuilder()
                    .addComponents(
                        new UserSelectMenuBuilder()
                            .setCustomId('dfsajkfsaighfasuhdfsa6q78ehfeh8f8e6')
                            .setPlaceholder('Selecione abaixo qual membro deseja adicionar no TICKET!')
                    )
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("voltarmessageaddmember")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),)


                interaction.update({ embeds: [embed], components: [select, row2] })
            }


            if (interaction.values[0] === 'CreateCall') {

                var d
                var b
                var ttt
                var e
                var get = TicketsSave.fetchAll()
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        d = element.data.Usuario
                        b = element.data.ChannelURL
                        e = element.ID
                        ttt = Tickets.get(`${element.data.TicketID}.permsTicket`)
                    }
                }



                const member = await interaction.guild.members.fetch(d);

                const targetChannel = client.channels.cache.find(channel => channel.type === ChannelType.GuildVoice && channel.name === member.user.username);

                if (targetChannel) return interaction.update({ content: `${obterEmoji(22)} | ${interaction.user}, esse ticket já possui um canal de voz ABERTO.`, components: [], flags: 64 })

                interaction.update({ content: `🔄 | Estamos gerando a call de suporte.`, components: [] })

                interaction.guild.channels.create({
                    name: `${member.user.username}`,

                    type: ChannelType.GuildVoice,

                    parent: interaction.channel.parentId,



                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: member.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        },
                        ...(ttt && ttt.length > 0
                            ? ttt.map(function (id) {
                                return {
                                    id: id,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel
                                    ],
                                };
                            })
                            : [])
                    ],

                }).then(async channel => {

                    TicketsSave.set(`${e}.ChannelVoiceID`, channel.id)
                    TicketsSave.set(`${e}.ChannelVoiceURL`, channel.url)

                    interaction.editReply({ content: `${obterEmoji(8)} | ${interaction.user} você criou um canal de voz para atendimento, [CLIQUE AQUI](${channel.url}) para acessar.`, components: [] }).then(msg => {
                        setTimeout(async () => {
                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }, 4000);
                    })

                    const saira = new EmbedBuilder()
                        .setDescription(`➡ **CALL ${member.user.username}** iniciado por **${interaction.user}**. \n\n🧨 Segue abaixo diversas **FUNÇÕES** com interação apenas com o **CHAT DE VOZ**.`)
                        .setFooter({ iconURL: `${interaction.user.displayAvatarURL()}`, text: `A cada 2 minutos e feito a verificação se possui mais de 1 pessoa no CANAL.` })
                        .setColor("#2b2d31")

                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Call de Suporte')
                            .setEmoji("1128033945053839482")
                            .setURL(channel.url)
                            .setStyle(5)
                    );
                    const row2 = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Adicionar Membro (CALL)')
                            .setEmoji("1129816192895426580")
                            .setCustomId('addmembercallticket')
                            .setStyle(2),
                        new ButtonBuilder()
                            .setLabel('Remover Membro (CALL)')
                            .setEmoji("1129816384621252641")
                            .setCustomId('removermembercallticket')
                            .setStyle(2),
                        new ButtonBuilder()
                            .setLabel('Finalizar Chamado (CALL)')
                            .setEmoji("1129816299732733973")
                            .setCustomId('closecallticket')
                            .setStyle(4),
                    );


                    interaction.channel.send({ embeds: [saira], components: [row2, row], content: `${member.user}` }).then(msgg => {



                        const interval = setInterval(() => {
                            if (channel.members.size <= 0) {
                                channel.delete().catch(e => null);
                                const sair = new EmbedBuilder()
                                    .setDescription(`❗ A CALL com nome **${channel.name}** foi finalizado por inatividade.`)
                                    .setColor("#2b2d31");

                                msgg.edit({ embeds: [sair], components: [] }).catch(e => null);
                                clearInterval(interval);
                            }
                        }, 120000);
                    })
                })
            }

        }

        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'selectopenticket') {
                interaction.message.edit()
                var tt = Tickets.fetchAll()
                const resultado = tt.find(item => item.ID === interaction.values[0]);
                if (resultado) {

                    var get = Tickets.get(`${interaction.values[0]}.functions.peguntas`)
                    var getOn = General.get(`ConfigGeral.StatusTicket`)

                    if (getOn == 'OFF') return interaction.reply({ content: `${obterEmoji(22)} | Sistema de Ticket está desligado no momento, volte mais tarde.`, flags: 64 })
                    if (get == true) {
                        const modalaAA = new ModalBuilder()
                            .setCustomId('opensticket222')
                            .setTitle(`👋 | Motivo de seu Suporte?`);

                        const newnameboteN = new TextInputBuilder()
                            .setCustomId('motivo')
                            .setLabel("QUAL É O MOTIVO DO TICKET?")
                            .setPlaceholder("Dúvida")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)


                        const newnamebote2 = new TextInputBuilder()
                            .setCustomId('desc')
                            .setLabel("QUAL É O A DESCRIÇÃO?")
                            .setPlaceholder("Queria saber mais informações sobre...")
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(300)
                            .setRequired(true)

                        const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                        const firstActionRow2 = new ActionRowBuilder().addComponents(newnamebote2);
                        modalaAA.addComponents(firstActionRow3, firstActionRow2);
                        await interaction.showModal(modalaAA);

                        TicketsSave.set(`${interaction.user.id}.TicketID`, interaction.values[0])
                    } else if (get == false) {
                        TicketsSave.set(`${interaction.user.id}.TicketID`, interaction.values[0])
                        await interaction.reply({ content: `🔄 | Estamos gerando seu TICKET.`, flags: 64 })

                        TicketOpen()
                    }

                }
            }
        }

        if (interaction.isButton()) {
            var tt = Tickets.fetchAll()

            const resultado = tt.find(item => item.ID === interaction.customId);
            if (resultado) {

                var get = Tickets.get(`${interaction.customId}.functions.peguntas`)
                var getOn = General.get(`ConfigGeral.StatusTicket`)

                if (getOn == 'OFF') return interaction.reply({ content: `${obterEmoji(22)} | Sistema de Ticket está desligado no momento, volte mais tarde.`, flags: 64 })
                if (get == true) {
                    const modalaAA = new ModalBuilder()
                        .setCustomId('opensticket222')
                        .setTitle(`👋 | Motivo de seu Suporte?`);

                    const newnameboteN = new TextInputBuilder()
                        .setCustomId('motivo')
                        .setLabel("QUAL É O MOTIVO DO TICKET?")
                        .setPlaceholder("Dúvida")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)


                    const newnamebote2 = new TextInputBuilder()
                        .setCustomId('desc')
                        .setLabel("QUAL É O A DESCRIÇÃO?")
                        .setPlaceholder("Queria saber mais informações sobre...")
                        .setStyle(TextInputStyle.Paragraph)
                        .setMaxLength(300)
                        .setRequired(true)

                    const firstActionRow3 = new ActionRowBuilder().addComponents(newnameboteN);
                    const firstActionRow2 = new ActionRowBuilder().addComponents(newnamebote2);
                    modalaAA.addComponents(firstActionRow3, firstActionRow2);
                    await interaction.showModal(modalaAA);

                    TicketsSave.set(`${interaction.user.id}.TicketID`, interaction.customId)
                } else if (get == false) {
                    TicketsSave.set(`${interaction.user.id}.TicketID`, interaction.customId)
                    await interaction.reply({ content: `🔄 | Estamos gerando seu TICKET.`, flags: 64 })
                    TicketOpen()
                }

            }



            if (interaction.customId === '2222che222ckoutsit222eeee') {

                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var RazaoPagamento
                var ValorPagamento
                var IDSaveTicket
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        IDSaveTicket = element.ID
                        RazaoPagamento = element.data.pagamentos.RazaoPagamento
                        ValorPagamento = element.data.pagamentos.ValorPagamento
                    }
                }

                var tt = General.get('ConfigGeral')

                let forFormat = Date.now() + tt.MercadoPagoConfig.TimePagament * 60 * 1000

                let timestamp = Math.floor(forFormat / 1000)

                mercadopago.configurations.setAccessToken(General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP);
                const ID = `PAYMENTEE${generateCode(35)}`
                var preference = {
                    items: [
                        {
                            title: `Pagamento - ${interaction.guild.name}`,
                            unit_price: Number(ValorPagamento),
                            quantity: 1,
                        },
                    ],
                    external_reference: ID
                };
                mercadopago.preferences
                    .create(preference)
                    .then(async function (data) {




                        const embed = new EmbedBuilder()
                            .setColor("#2b2d31")
                            .setTitle(`${client.user.username} | Sistema de pagamento`)
                            .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n${obterEmoji(12)} **| Produto(s):**\n${RazaoPagamento}\n${obterEmoji(14)} **| Valor:**\nR$${Number(ValorPagamento).toFixed(2)}\n${obterEmoji(7)} **| Pagamento expira em:**\n<t:${timestamp}> (<t:${timestamp}:R>)`)
                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de 15 segundos`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('Realizar o Pagamento')
                                    .setEmoji(`1097965960356450464`)
                                    .setURL(data.body.init_point)
                                    .setStyle(5)
                                    .setDisabled(false),
                                new ButtonBuilder()
                                    .setCustomId("222stopco22mpracancellastfase222")
                                    .setEmoji(`<a:xanimado:1258101250411597887>`)
                                    .setStyle(4)
                                    .setDisabled(false),)
                        interaction.message.edit({ embeds: [embed], components: [row] }).then(async msg => {
                            setTimeout(async () => {
                                try {
                                    await msg.delete()
                                } catch (error) {

                                }
                            }, General.get(`ConfigGeral.MercadoPagoConfig.TimePagament`) * 60000);

                            TicketsSave.set(`${IDSaveTicket}.pagamentos.IDPagamento`, ID)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Status`, `Pendente`)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Type`, `site`)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Channel`, interaction.channel.id)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.msg`, msg.id)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Token`, General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.GuildServerID`, interaction.guild.id)

                        })
                    })

            }



            if (interaction.customId === '22222chec2222koultp2222222ix') {

                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var RazaoPagamento
                var ValorPagamento
                var IDSaveTicket
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        IDSaveTicket = element.ID
                        RazaoPagamento = element.data.pagamentos.RazaoPagamento
                        ValorPagamento = element.data.pagamentos.ValorPagamento
                    }
                }

                var tt = General.get('ConfigGeral')

                let forFormat = Date.now() + tt.MercadoPagoConfig.TimePagament * 60 * 1000

                let timestamp = Math.floor(forFormat / 1000)

                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`${client.user.username} | Sistema de pagamento`)
                    .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n${obterEmoji(12)} **| Produto(s):**\n${RazaoPagamento}\n${obterEmoji(14)} **| Valor:**\nR$${Number(ValorPagamento).toFixed(2)}\n${obterEmoji(7)} **| Pagamento expira em:**\n<t:${timestamp}> (<t:${timestamp}:R>)`)
                    .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de 15 segundos`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("pixcolauiaekufeabuduyaduyawud")
                            .setLabel('Pix Copia e Cola')
                            .setEmoji(`1116578131667599432`)
                            .setStyle(1)
                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId("qrcodepixticket781w97wgduysdf")
                            .setLabel('Qr Code')
                            .setEmoji(`1092087249438527568`)
                            .setStyle(1)
                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId("222stopco22mpracancellastfase222")
                            .setEmoji(`<a:xanimado:1258101250411597887>`)
                            .setStyle(4)
                            .setDisabled(false),)

                interaction.message.edit({ embeds: [embed], components: [row] }).then(async msg => {
                    setTimeout(async () => {
                        try {
                            await msg.delete()
                        } catch (error) {

                        }
                    }, General.get(`ConfigGeral.MercadoPagoConfig.TimePagament`) * 60000);

                    var payment_data = {
                        transaction_amount: Number(ValorPagamento),
                        description: `Pagamento - ${interaction.guild.name}`,
                        payment_method_id: 'pix',
                        payer: {
                            email: `${interaction.user.id}@gmail.com`,
                            first_name: `Victor André`,
                            last_name: `Ricardo Almeida`,
                            identification: {
                                type: 'CPF',
                                number: '15084299872'
                            },

                            address: {
                                zip_code: '86063190',
                                street_name: 'Rua Jácomo Piccinin',
                                street_number: '971',
                                neighborhood: 'Pinheiros',
                                city: 'Londrina',
                                federal_unit: 'PR'
                            }
                        }
                    }
                    mercadopago.configurations.setAccessToken(General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP);
                    await mercadopago.payment.create(payment_data)
                        .then(async function (data) {
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.IDPagamento`, data.body.id)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Type`, `pix`)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.QrCode`, data.body.point_of_interaction.transaction_data.qr_code_base64)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.PixCopiaeCola`, data.body.point_of_interaction.transaction_data.qr_code)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Channel`, interaction.channel.id)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.msg`, msg.id)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Status`, `Pendente`)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.Token`, General.get('ConfigGeral').MercadoPagoConfig.TokenAcessMP)
                            TicketsSave.set(`${IDSaveTicket}.pagamentos.GuildServerID`, interaction.guild.id)
                        })
                })
            }




            if (interaction.customId == 'pixcolauiaekufeabuduyaduyawud') {
                var get = TicketsSave.fetchAll()
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.pagamentos.PixCopiaeCola
                    }
                }
                interaction.reply({ content: `${bbbb}`, flags: 64 })
            }

            if (interaction.customId == 'qrcodepixticket781w97wgduysdf') {
                var get = TicketsSave.fetchAll()
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.pagamentos.QrCode
                    }
                }


                const buffer = Buffer.from(bbbb, "base64");
                const attachment = new AttachmentBuilder(buffer, { name: "payment.png" });

                interaction.reply({ files: [attachment], flags: 64 })
            }











            if (interaction.customId === 'closecallticket') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.ChannelVoiceID
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para finalizar a CALL.`, flags: 64 })
                            }
                        }
                    }
                }





                const channelToDelete = client.channels.cache.get(bbbb);

                try {
                    await channelToDelete.delete()
                } catch (error) {

                }

                interaction.message.delete()

            }
            if (interaction.customId === '222stopco22mpracancellastfase222') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para finalizar a CALL.`, flags: 64 })
                            }
                        }
                    }
                }
                interaction.message.delete()
            }


            if (interaction.customId === 'removermembercallticket') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para remover membros da CALL.`, flags: 64 })
                            }
                        }
                    }
                }


                const select = new ActionRowBuilder()
                    .addComponents(
                        new UserSelectMenuBuilder()
                            .setCustomId('removermembercallticket')
                            .setPlaceholder('Selecione abaixo qual membro deseja remover da CALL.')
                    )
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("voltarmessagecall")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),)
                interaction.message.edit({ components: [select, row2] })

            }


            if (interaction.customId === 'addmembercallticket') {
                var get = TicketsSave.fetchAll()
                interaction.deferUpdate()
                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para adicionar membros na CALL.`, flags: 64 })
                            }
                        }
                    }
                }


                const select = new ActionRowBuilder()
                    .addComponents(
                        new UserSelectMenuBuilder()
                            .setCustomId('addmembercallticket')
                            .setPlaceholder('Selecione abaixo qual membro deseja adicionar na CALL.')
                    )
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("voltarmessagecall")
                            .setLabel('Voltar')
                            .setEmoji(`1106069998331514930`)
                            .setStyle(4)
                            .setDisabled(false),)
                interaction.message.edit({ components: [select, row2] })

            }

            if (interaction.customId === 'voltarmessagecall') {
                interaction.deferUpdate()

                var get = TicketsSave.fetchAll()

                var bbbb
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        bbbb = element.data.ChannelVoiceURL
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return
                    }
                }

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Call de Suporte')
                        .setEmoji("1128033945053839482")
                        .setURL(bbbb)
                        .setStyle(5)
                );

                const row2 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Adicionar Membro (CALL)')
                        .setEmoji("1129816192895426580")
                        .setCustomId('addmembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Remover Membro (CALL)')
                        .setEmoji("1129816384621252641")
                        .setCustomId('removermembercallticket')
                        .setStyle(2),
                    new ButtonBuilder()
                        .setLabel('Finalizar Chamado (CALL)')
                        .setEmoji("1129816299732733973")
                        .setCustomId('closecallticket')
                        .setStyle(4),
                );

                interaction.message.edit({ components: [row2, row] })
            }

            if (interaction.customId === 'PainelStaff') {
                var get = TicketsSave.fetchAll()

                let t

                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        t = Tickets.get(`${element.data.TicketID}`)
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para adicionar membros na CALL.`, flags: 64 })
                            }
                        }
                    }
                }


                const renomearTicket = t.functions.renomear
                const enviarPoke = t.functions.poke
                const criarCall = t.functions.criarcall
                const pagamentos = t.functions.pagamentos

                const selectMenuOptions = [];

                // Verifica se pelo menos uma das variáveis é verdadeira
                // Adiciona o item "Renomear Ticket" se 'renomearTicket' for verdadeiro
                if (renomearTicket) {
                    selectMenuOptions.push({
                        label: 'Renomear Ticket',
                        emoji: '1128034029187366912',
                        value: 'RenomearTicket',
                    });
                }

                // Adiciona o item "Enviar um Poke" se 'enviarPoke' for verdadeiro
                if (enviarPoke) {
                    selectMenuOptions.push({
                        label: 'Enviar um Poke',
                        emoji: '1128033973130510476',
                        value: 'EnviarPoke',
                    });
                }

                // Adiciona o item "Criar uma Call" se 'criarCall' for verdadeiro
                if (criarCall) {
                    selectMenuOptions.push({
                        label: 'Criar uma Call',
                        emoji: '1128033945053839482',
                        value: 'CreateCall',
                    });
                }

                // Adiciona o item "Pagamentos" se 'pagamentos' for verdadeiro
                if (pagamentos) {
                    selectMenuOptions.push({
                        label: 'Pagamentos',
                        emoji: '1128034052755161138',
                        value: 'PagamentosTicket',
                    });
                }

                if (selectMenuOptions == 0) return interaction.reply({ content: `${obterEmoji(22)} | Nenhuma função está ativada no momento.`, flags: 64 })

                const style2row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Selecione a categoria para abrir um ticket.')
                        .addOptions(selectMenuOptions),
                );



                interaction.reply({ components: [style2row], flags: 64 })
            }





            if (interaction.customId === 'PainelMembro') {

                const selectMenuOptions = [];
                selectMenuOptions.push({
                    label: 'Notificar Staff (Assumiu)',
                    emoji: '1130647035310264341',
                    value: 'NotificarStaff',
                });
                selectMenuOptions.push({
                    label: 'Adicionar Membro',
                    emoji: '1129816192895426580',
                    value: 'addmemberticketind',
                });
                selectMenuOptions.push({
                    label: 'Remover Membro',
                    emoji: '1129816384621252641',
                    value: 'removememberticketind',
                });

                const style2row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Selecione qual função deseja mexer.')
                        .addOptions(selectMenuOptions),
                );

                interaction.reply({ components: [style2row], flags: 64 })
            }

            if (interaction.customId === 'voltarmessageaddmember') {
                const selectMenuOptions = [];
                selectMenuOptions.push({
                    label: 'Adicionar Membro',
                    emoji: '1129816192895426580',
                    value: 'addmemberticketind',
                });
                selectMenuOptions.push({
                    label: 'Remover Membro',
                    emoji: '1129816384621252641',
                    value: 'removememberticketind',
                });

                const style2row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Selecione qual função deseja mexer.')
                        .addOptions(selectMenuOptions),
                );

                interaction.update({ components: [style2row], flags: 64, embeds: [] })
            }






            if (interaction.customId === 'AssumirTicket') {
                var get = TicketsSave.fetchAll()
                var user
                var ID
                var ID2
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        user = element.data.Usuario
                        ID2 = element.data.TicketID
                        ID = element.ID
                        var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                        t = Tickets.get(`${element.data.TicketID}`)
                        if (getCache(interaction.user.id, 'users') !== true) {
                            if (interaction.guild.ownerId !== interaction.user.id) {
                                if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para assumir o ticket.`, flags: 64 })
                            }
                        }
                    }
                }
                await interaction.deferUpdate()
                const member = await interaction.guild.members.fetch(user);

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Ir para o Ticket')
                        .setURL(TicketsSave.get(`${ID}.ChannelURL`))
                        .setStyle(5)
                );


                const embed2 = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setDescription(`**${member.user}** O seu **TICKET** foi assumido pelo usuário ${interaction.user}, clique no **BOTÃO** para ir ao **TICKET**`)

                try {
                    await member.send({ embeds: [embed2], components: [row] })
                } catch (error) {

                }

                if (PerfilMembros.get(`${interaction.user.id}.assumidos`) == null) {
                    PerfilMembros.set(`${interaction.user.id}.assumidos`, 1)
                } else {
                    PerfilMembros.set(`${interaction.user.id}.assumidos`, PerfilMembros.get(`${interaction.user.id}.assumidos`) + 1)
                }
                TicketsSave.set(`${ID}.Assumiu`, interaction.user.id)

                const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setDescription(`**${member.user}** O seu **TICKET** foi assumido pelo usuário ${interaction.user}, Continue a conversa abaixo para resolvermos juntos.`)

                interaction.channel.send({ embeds: [embed], content: `${member.user}` })


                const row2222 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("SairdoTicket")
                            .setEmoji('<:seta_direita:1257790236524806165>')
                            .setLabel('Sair do Canal')
                            .setStyle(2)

                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId("PainelStaff")
                            .setEmoji('<:staff:1232782650385629299>')
                            .setLabel('Painel Staff')
                            .setStyle(2)

                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId("PainelMembro")
                            .setEmoji('1129270282478162054')
                            .setLabel('Painel Membro')
                            .setStyle(2)

                            .setDisabled(false),
                    )

                if (Tickets.get(`${ID2}.functions.assumir`) == true) {
                    row2222.addComponents(
                        new ButtonBuilder()
                            .setCustomId("AssumirTicket")
                            .setEmoji('<:1289361391513505804:1289647551787569267>')
                            .setLabel('Assumir Ticket')
                            .setStyle(2)

                            .setDisabled(true),
                    );
                }

                const row22222 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("FinalizarTicket")
                            .setEmoji('<:lixo:1229787813046915092>')
                            .setLabel('Finalizar Ticket')
                            .setStyle(2)

                            .setDisabled(false),)


                let embed22 = interaction.message.embeds[0]
                embed22.fields[1].value = `${interaction.user}`




                interaction.message.edit({ components: [row2222, row22222], embeds: [embed22] })



            }

            if (interaction.customId === 'SairdoTicket') {

                var get = TicketsSave.fetchAll()

                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {
                        if (interaction.user.id !== element.data.Usuario) return interaction.deferUpdate()
                    }
                }

                if (TicketsSave.get(`${interaction.user.id}.Assumiu`) !== null) {
                    try {
                        var getyy = TicketsSave.get(interaction.user.id)
                        const member = await interaction.guild.members.fetch(TicketsSave.get(`${interaction.user.id}.Assumiu`));

                        const embed = new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`❗ ${interaction.user}, O usuário ${interaction.user} \`${interaction.user.id}\` saiu do TICKET que você assumiu. [CLIQUE AQUI](${getyy.ChannelURL}) para encontra-lo.`)

                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setEmoji(`1129252149327568916`)
                                    .setLabel('・Ir para o Ticket')
                                    .setStyle(5)
                                    .setURL(`${getyy.ChannelURL}`));
                        member.send({ embeds: [embed], components: [row], flags: 64 })
                    } catch (error) { }
                }


                const embed = new EmbedBuilder()
                    .setDescription(`*${interaction.user} finalizou o seu **ATENDIMENTO** após clicar para sair do ticket*`)
                    .setColor("#2b2d31")


                const row1 = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId('FinalizarTicket')
                        .setEmoji('1129270500795883530')
                        .setLabel('Finalizar Ticket')
                        .setStyle(4))



                interaction.reply({ components: [row1], embeds: [embed] })


                interaction.message.edit({ components: [row1] })

                try { await interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: false }); } catch (error) { }


            }
        }



        async function TicketOpen(motivo, desc) {

            var TicketID = TicketsSave.get(`${interaction.user.id}.TicketID`)

            var t = Tickets.get(`${TicketID}.permsTicket`)
            var cat2 = Tickets.get(`${TicketID}.Categoria`)
            var cat = General.get(`ConfigGeral.Channels.CategoriaTickets`)

            var catfinal = cat !== null ? cat2 !== null ? cat2 : cat : cat2 !== null ? cat2 : null;
            const channel = client.channels.cache.get(catfinal);
            if (channel == undefined) catfinal = null

            var name
            if (Tickets.get(`${TicketID}.functions.protocolo`) == true) {
                name = protocolo(6)
                var getyy = TicketsSave.get(interaction.user.id)
                if (getyy !== null) {
                    const channel = client.channels.cache.get(getyy.ChannelID);
                    if (channel !== undefined) {
                        const embed = new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`${obterEmoji(22)} ${interaction.user}, Você já possui um TICKET em andamento [CLIQUE AQUI](${getyy.ChannelURL}) para encontra-lo.`)

                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setEmoji(`1129252149327568916`)
                                    .setLabel('・Ir para o Ticket')
                                    .setStyle(5)
                                    .setURL(`${getyy.ChannelURL}`));
                        interaction.editReply({ embeds: [embed], components: [row], content: ``, flags: 64 })
                        return
                    }
                }
            } else {
                name = interaction.user.username
                var getyy = TicketsSave.get(interaction.user.id)
                if (getyy !== null) {
                    const channel = client.channels.cache.get(getyy.ChannelID);

                    if (channel !== undefined) {
                        const embed = new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`${obterEmoji(22)} ${interaction.user}, Você já possui um TICKET em andamento [CLIQUE AQUI](${getyy.ChannelURL}) para encontra-lo.`)

                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setEmoji(`1129252149327568916`)
                                    .setLabel('・Ir para o Ticket')
                                    .setStyle(5)
                                    .setURL(`${getyy.ChannelURL}`));
                        interaction.editReply({ embeds: [embed], components: [row], content: ``, flags: 64 })
                        return
                    }
                }
            }

            let staffPrincipal = General.get('ConfigGeral.cargos.SuporteGeral') 

            try {
                await interaction.guild.channels.create({
                    name: `📂・ticket-${name}`,
                    parent: catfinal,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        // Verifica se staffPrincipal é válido antes de adicionar
                        ...(staffPrincipal ? [{
                            id: staffPrincipal,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory,
                            ],
                        }] : []),
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        ...(t && t.length > 0
                            ? t.map(function (id) {
                                // Verifica se o cargo existe antes de adicionar
                                const role = interaction.guild.roles.cache.get(id);
                                if (role) { // Se o cargo for válido, adiciona ao permissionOverwrites
                                    return {
                                        id: role.id,
                                        allow: [
                                            PermissionsBitField.Flags.ViewChannel,
                                            PermissionsBitField.Flags.SendMessages,
                                        ],
                                    };
                                }
                                return null; // Se não for válido, não adiciona
                            }).filter(overwrite => overwrite !== null) // Filtra os nulls
                            : []
                        )
                    ],
                }).then(async channel => {


                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setEmoji(`1129252149327568916`)
                                .setLabel('・Ir para o Ticket')
                                .setStyle(5)
                                .setURL(`${channel.url}`));

                    interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(`Green`)
                                .setDescription(`${obterEmoji(8)} | ${interaction.user}, seu TICKET foi aberto [CLIQUE AQUI](${channel.url}) para encontra-lo.`)
                        ], components: [row], flags: 64, content: ``
                    })



                    if (Tickets.get(`${TicketID}.functions.protocolo`) == true) {
                        channel.setTopic(`Canal de TICKET com protocolo ${name} vinculado ao ${interaction.user.username}`)
                    } else {
                        channel.setTopic(`Canal de TICKET do usuário ${interaction.user.username}`)
                    }

                    var name2 = name.toUpperCase();



                    const row2222 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("SairdoTicket")
                                .setEmoji('<:seta_direita:1257790236524806165>')
                                .setLabel('Sair do Canal')
                                .setStyle(2)

                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId("PainelStaff")
                                .setEmoji('<:staff:1232782650385629299>')
                                .setLabel('Painel Staff')
                                .setStyle(2)

                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId("PainelMembro")
                                .setEmoji('1129270282478162054')
                                .setLabel('Painel Membro')
                                .setStyle(2)

                                .setDisabled(false),
                        )

                    if (Tickets.get(`${TicketID}.functions.assumir`) == true) {
                        row2222.addComponents(
                            new ButtonBuilder()
                                .setCustomId("AssumirTicket")
                                .setEmoji('<:1289361391513505804:1289647551787569267>')
                                .setLabel('Assumir Ticket')
                                .setStyle(2)

                                .setDisabled(false),
                        );
                    }

                    const row22222 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("FinalizarTicket")
                                .setEmoji('<:lixo:1229787813046915092>')
                                .setLabel('Finalizar Ticket')
                                .setStyle(2)

                                .setDisabled(false),)

                    let embed = {
                        "description": `- Olá ${interaction.user}, seja bem vindo(a) ao nosso sistema de atendimento.\n- Aguarde um de nossos atendentes lhe atender!`,
                        "color": 5814783,
                        "fields": [
                            {
                                "name": "> `👤 Informações`",
                                "value": `\`\`\`Motivo: ${desc == undefined ? `Não informado` : `${motivo}`}\nDescrição: ${desc == undefined ? `Não informado` : `${desc}`}\`\`\``,
                                "inline": true
                            },
                            {
                                "name": "> `😀 Assumido por:`",
                                "value": "`Ticket não assumido 😥`",
                                "inline": true
                            }
                        ],
                        "author": {
                            "name": "Sistema de Ticket - " + String(TicketID).split('_')[0],
                            "icon_url": `${interaction.user.displayAvatarURL({ dynamic: true })}`
                        },
                        "footer": {
                            "text": `- Sistema de ticket exclusivo do(a) servidor: ${interaction.guild.name}`,
                            "timestamp": new Date()
                        }
                    }

                    if (interaction.guild.iconURL() !== null) {
                        embed.footer.icon_url = interaction.guild.iconURL({ dynamic: true })
                    }

                    await channel.send({ embeds: [embed], components: [row2222, row22222] })
                    if (desc == undefined) {
                        channel.send(`> ${interaction.user}, por favor adiante o **ASSUNTO** para podermos redirecionar melhor o seu atendimento.`)
                    }

                    if (staffPrincipal) {
                        channel.send({ content: `${staffPrincipal !== null ? `<@&${staffPrincipal}>` : ``}` }).then(async msg => {

                            try {
                                await msg.delete()
                            } catch (error) {

                            }
                        }
                        )
                    }

                    TicketsSave.set(interaction.user.id, { ChannelID: channel.id, ChannelURL: channel.url, CategoriaID: catfinal, Protocolo: name, Usuario: interaction.user.id, Assumiu: null, TicketID: TicketID, pagamentos: {}, requisicao: {}, horarioinicio: new Date().getTime() })

                    var LogTickets = General.get(`ConfigGeral.Channels.ChannelsLogs`)

                    if (LogTickets !== null) {

                        const channel33 = client.channels.cache.get(LogTickets);

                        if (channel33 !== undefined) {

                            const iniciolog = new EmbedBuilder()

                                .setDescription(`❗  \`TICKET ${name}\` aberto por **${interaction.user.username}** para acessar [**CLIQUE AQUI**](${channel.url}).`)
                                .setColor("#2b2d31")

                            channel33.send({ embeds: [iniciolog] }).then(msg00 => {
                                TicketsLogs.set(`${msg00.id}`, { IDMessage: msg00.id, ChannelIDLog: msg00.channel.id, ChannelIDTicket: channel.id })
                            })


                        }
                    }
                })
            } catch (error) {
                console.log(error)
                interaction.editReply({ content: `${obterEmoji(22)} | Infelizmente, não foi possivel abrir ticket. \nPossiveis Motivos:\n- 50 Tickets abertos.\n- Categoria inválida.` })
            }
        }
        if (interaction.type == InteractionType.ModalSubmit) {

            if (interaction.customId === 'avaasdasliaasdsadasdcaogerallllsdasdasdadasd') {

                interaction.deferUpdate()
                const desc = interaction.fields.getTextInputValue('2');

                var uu = db.table('avaliarrrrr')
                var estrelas = await uu.get(`${interaction.user.id}.resultado`, resultado)

                if (estrelas == 1 || estrelas == 2 || estrelas == 3 || estrelas == 4 || estrelas == 5) {


                    function transformarEmEstrelas(numero) {
                        return '\u2B50'.repeat(numero);
                    }

                    var channela
                    try {
                        channela = await client.channels.fetch(General.get(`ConfigGeral.Channels.ChannelsAvaliar`))
                    } catch (error) {

                    }

                    var tttttt = TicketsSave.get(interaction.user.id)

                    const embed = new EmbedBuilder()
                        .setTitle(`❤️ | Nova Avaliação`)
                        .setColor("Random")
                        .addFields(
                            { name: `👥 | Avaliação Enviada Por:`, value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                            { name: `👷‍♂️ | Quem assumiu Ticket:`, value: `${tttttt.Assumiu === null ? 'Não assumido' : `<@${tttttt.Assumiu}> - \`${interaction.user.id}\``}` },
                            { name: `💥 | Protocolo:`, value: `\`${tttttt.Protocolo}\`` },
                            { name: `🥰 | Nota:`, value: `${transformarEmEstrelas(estrelas)} (${estrelas}/5)` },
                            { name: `⭐ | Avaliação:`, value: `${desc}` },
                            { name: `⏰ | Data/Horário:`, value: `<t:${Math.ceil(Date.now() / 1000)}> (<t:${Math.ceil(Date.now() / 1000)}:R>)` }
                        )

                    try {
                        await channela.send({ embeds: [embed] })
                        await interaction.message.edit({ content: `${obterEmoji(8)} | Avaliação enviada`, components: [], flags: 64 }).then(msgaaaa => {
                            setTimeout(async () => {
                                try {
                                    await msgaaaa.delete()
                                } catch (error) {

                                }
                            }, 30000);
                        })


                    } catch (error) {
                        interaction.message.edit({ content: `${obterEmoji(22)} | Canal de avaliação invalido!`, components: [], flags: 64 }).then(msgaaaa => {
                            setTimeout(async () => {
                                try {
                                    await msgaaaa.delete()
                                } catch (error) {

                                }
                            }, 30000);
                        })
                        return
                    }


                } else {
                    return interaction.message.edit({ content: `${obterEmoji(22)} | Avaliação incorreta.`, components: [], flags: 64 }).then(msgaaaa => {
                        setTimeout(async () => {
                            try {
                                await msgaaaa.delete()
                            } catch (error) {

                            }
                        }, 30000);
                    })
                }
            }
        }

        if (interaction.isButton()) {

            if (interaction.customId == '1avaliar2' || interaction.customId == '2avaliar2' || interaction.customId == '3avaliar2' || interaction.customId == '4avaliar2' || interaction.customId == '5avaliar2') {

                var aaa = interaction.customId
                var resultado = aaa.replace(/avaliar2/, "");

                function transformarEmEstrelas(numero) {
                    return '\u2B50'.repeat(numero);
                }
                var uu = db.table('avaliarrrrr')
                uu.set(`${interaction.user.id}.resultado`, resultado)


                const modala = new ModalBuilder()
                    .setCustomId('avaasdasliaasdsadasdcaogerallllsdasdasdadasd')
                    .setTitle(`⭐ | Avaliar`);

                const AdicionarNoTicket = new TextInputBuilder()
                    .setCustomId('2')
                    .setLabel(`AVALIAÇÃO - ${transformarEmEstrelas(resultado)} (${resultado})`)
                    .setPlaceholder("Escreva uma breve avaliação aqui.")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)

                const firstActionRow = new ActionRowBuilder().addComponents(AdicionarNoTicket);

                modala.addComponents(firstActionRow);
                if (!interaction.deferred) {
                    await interaction.showModal(modala);
                }
            }



            if (interaction.customId === 'FinalizarTypeScript') {
                interaction.channel.delete()
            }

            if (interaction.customId === 'typescript') {
                typescript(interaction.message.id)
            }

            if (interaction.customId === 'FinalizarTicket') {

                var get = TicketsSave.fetchAll()
                var get2 = TicketsLogs.fetchAll()
                for (let i = 0; i < get.length; i++) {
                    const element = get[i];
                    if (element.data.ChannelID == interaction.channel.id) {

                        for (let ii = 0; ii < get2.length; ii++) {
                            const element2 = get2[ii];

                            if (element2.data.ChannelIDTicket == element.data.ChannelID) {
                                var h = Tickets.get(`${element.data.TicketID}.permsTicket`)
                                t = Tickets.get(`${element.data.TicketID}`)
                                if (getCache(interaction.user.id, 'users') !== true) {
                                    if (interaction.guild.ownerId !== interaction.user.id) {
                                        if (!h.some(cargoId => interaction.member.roles.cache.has(cargoId))) return interaction.reply({ content: `${obterEmoji(22)} | Você não tem permissão para finalizar o ticket.`, flags: 64 })
                                    }
                                }

                                await interaction.deferUpdate()

                                interaction.message.channel.messages.fetch().then(async (messages) => {


                                    let output = messages
                                        .filter((m) => m.author.bot !== true)
                                        .map((m) => {
                                            return {
                                                content: `${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`,
                                                author: m.author.username,
                                                timestamp: m.createdTimestamp,
                                                avatar: m.author.displayAvatarURL()
                                            };
                                        });

                                    let collectionMessages = [];

                                    output.forEach((message) => {
                                        collectionMessages.push(message);
                                    });

                                    TicketsLogs.set(`${element2.ID}.LogsMessage`, collectionMessages)
                                    TicketsLogs.set(`${element2.ID}.Protocolo`, element.data.Protocolo)

                                    if (RankTicketsIDs.get(`${element.data.TicketID}.qtd`) == null) {
                                        RankTicketsIDs.set(`${element.data.TicketID}.qtd`, 1)
                                    } else {
                                        RankTicketsIDs.set(`${element.data.TicketID}.qtd`, RankTicketsIDs.get(`${element.data.TicketID}.qtd`) + 1)
                                    }


                                    if (PerfilMembros.get(`${element.data.Usuario}.Abriu`) == null) {
                                        PerfilMembros.set(`${element.data.Usuario}.Abriu`, 1)
                                    } else {
                                        PerfilMembros.set(`${element.data.Usuario}.Abriu`, PerfilMembros.get(`${element.data.Usuario}.Abriu`) + 1)
                                    }





                                    try {
                                        const channel33 = client.channels.cache.get(element2.data.ChannelIDTicket);
                                        const fetchedMessages = await channel33.messages.fetch({ limit: 100 })
                                        const messagesToDelete = fetchedMessages.filter(msg => msg.deletable);


                                        await channel33.bulkDelete(messagesToDelete);
                                    } catch (error) {
                                        console.log(error)
                                    }

                                    try { await interaction.channel.permissionOverwrites.edit(element.data.Usuario, { ViewChannel: false }); } catch (error) { }

                                    const embed = new EmbedBuilder()

                                        .setTitle("🎉 O ticket foi FINALIZADO")
                                        .setDescription(`👥 Quem Fechou: ${interaction.user}\n\n👥 Quem Abriu: <@${element.data.Usuario}>\n\n📣 O usuário foi retirado do ticket, caso queira ver as LOGS do ticket, clique no botão abaixo.`)
                                        .setFooter({ text: `🚨 Irei fechar esse canal em 1 minuto` })

                                    const row = new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setEmoji("🔗")
                                                .setLabel('・Ir até a LOG')
                                                .setStyle(5)
                                                .setURL(`https://discord.com/channels/${interaction.guild.id}/${General.get(`ConfigGeral.Channels.ChannelsLogs`)}`));



                                    var LogTickets = General.get(`ConfigGeral.Channels.ChannelsLogs`)

                                    if (LogTickets !== null) {
                                        const channel33 = client.channels.cache.get(LogTickets);
                                        if (channel33 !== undefined) {
                                            interaction.channel.send({ embeds: [embed], components: [row] })

                                            const fimlog = new EmbedBuilder()

                                                .setTitle(`${obterEmoji(30)} Sistema de Ticket-LOGS`)
                                                .setDescription(`${obterEmoji(9)} Usúario que abriu:\n> <@${element.data.Usuario}> \`${element.data.Usuario}\`\n\n${obterEmoji(9)} Usúario que fechou:\n> ${interaction.user} \`${interaction.user.id}\`\n\n${obterEmoji(31)} Protocolo do ticket:\n\`${element.data.Protocolo}\`\n${obterEmoji(32)} Horario da abertura:\n <t:${Math.round(element.data.horarioinicio / 1000)}:d> <t:${Math.round(element.data.horarioinicio / 1000)}:T>\n${obterEmoji(32)} Horario do fechamento:\n <t:${Math.round(new Date().getTime() / 1000)}:d> <t:${Math.round(new Date().getTime() / 1000)}:T>`)
                                                .setFooter({ text: `Segue abaixo a opção para visualizar o typescript (LOG) das mensagens.` })
                                                .setColor("#2b2d31")

                                            const fimlogassumir = new EmbedBuilder()

                                                .setTitle(`${obterEmoji(30)} Sistema de Ticket-LOGS`)
                                                .setDescription(`${obterEmoji(9)} Usúario que abriu:\n> <@${element.data.Usuario}> \`${element.data.Usuario}\`\n\n${obterEmoji(9)} Usúario que fechou:\n> ${interaction.user} \`${interaction.user.id}\`\n\n${obterEmoji(9)} Usúario que assumiu:\n> <@${element.data.Assumiu}> \`${element.data.Assumiu}\`\n\n${obterEmoji(31)} Protocolo do ticket:\n\`${element.data.Protocolo}\`\n${obterEmoji(32)} Horario da abertura:\n <t:${Math.round(element.data.horarioinicio / 1000)}:d> <t:${Math.round(element.data.horarioinicio / 1000)}:T>\n${obterEmoji(32)} Horario do fechamento:\n <t:${Math.round(new Date().getTime() / 1000)}:d> <t:${Math.round(new Date().getTime() / 1000)}:T>`)
                                                .setFooter({ text: `Segue abaixo a opção para visualizar o typescript (LOG) das mensagens.` })
                                                .setColor("#2b2d31")

                                            const typescript = new ActionRowBuilder()
                                                .addComponents(
                                                    new ButtonBuilder()
                                                        .setCustomId("typescript")
                                                        .setEmoji('1104552040962723853')
                                                        .setLabel('TypeScript Channel (Log Message)')
                                                        .setStyle(2)

                                                        .setDisabled(false),
                                                )

                                            const channel333 = client.channels.cache.get(element2.data.ChannelIDLog);
                                            if (element.data.Assumiu !== null) {
                                                channel333.messages.fetch(element2.data.IDMessage).then(msg => msg.edit({ embeds: [fimlogassumir], content: ``, components: [typescript] }))
                                            } else {
                                                channel333.messages.fetch(element2.data.IDMessage).then(msg => msg.edit({ embeds: [fimlog], content: ``, components: [typescript] }))
                                            }





                                        } else {
                                            interaction.channel.send({ embeds: [embed], components: [] })
                                        }
                                    } else {
                                        interaction.channel.send({ embeds: [embed], components: [] })
                                    }

                                    setTimeout(async () => {
                                        try {
                                            await interaction.channel.delete()
                                        } catch (error) {

                                        }

                                    }, 60000);





                                    try {
                                        const member = await interaction.guild.members.fetch(element.data.Usuario);
                                        const joao = new EmbedBuilder()

                                            .setTitle(`${obterEmoji(21)} | SEU TICKET FOI FECHADO`)
                                            .setDescription(`**${obterEmoji(13)} Ticket aberto por:**\n\`${member.user.username}\`\n**${obterEmoji(22)} | Ticket fechado por:**\n\`${interaction.user.username}\`\n**📅 | Data & Hora:**\n<t:${Math.round(new Date().getTime() / 1000)}> (<t:${Math.round(new Date().getTime() / 1000)}:R>)`)
                                            .setFooter({ text: `${client.user.username}` })
                                            .setTimestamp()


                                        const row2222 = new ActionRowBuilder()
                                            .addComponents(
                                                new ButtonBuilder()
                                                    .setCustomId('1avaliar2')
                                                    .setLabel('1')
                                                    .setEmoji('⭐')
                                                    .setStyle(2)
                                                    .setDisabled(false),
                                                new ButtonBuilder()
                                                    .setCustomId('2avaliar2')
                                                    .setLabel('2')
                                                    .setEmoji('⭐')
                                                    .setStyle(2)
                                                    .setDisabled(false),
                                                new ButtonBuilder()
                                                    .setCustomId('3avaliar2')
                                                    .setLabel('3')
                                                    .setEmoji('⭐')
                                                    .setStyle(2)
                                                    .setDisabled(false),
                                                new ButtonBuilder()
                                                    .setCustomId('4avaliar2')
                                                    .setEmoji('⭐')
                                                    .setLabel('4')
                                                    .setStyle(2)
                                                    .setDisabled(false),
                                                new ButtonBuilder()
                                                    .setCustomId('5avaliar2')
                                                    .setEmoji('⭐')
                                                    .setLabel('5')
                                                    .setStyle(2)
                                                    .setDisabled(false),)



                                        await member.send({ embeds: [joao] })
                                        await member.send({ components: [row2222] }).then(msgaaaa => {
                                            setTimeout(async () => {
                                                try {
                                                    await msgaaaa.delete()
                                                } catch (error) {

                                                }
                                            }, 120000);
                                        })

                                    } catch (error) {

                                    }



                                })



                            }

                        }
                    }
                }




            }
        }





        async function typescript(idmessage) {
            var verificar = TicketsLogs.get(`${idmessage}`);

            if (verificar.LogsMessage == 0) return interaction.reply({ content: `${obterEmoji(22)} | Nenhuma mensagem foi enviada nesse TICKET!`, flags: 64 })

            let achando = await interaction.guild.channels.cache.find(a => a.topic === `TypeScript - ${verificar.Protocolo}`);

            if (achando) return interaction.reply({ content: `${obterEmoji(22)} ${interaction.user}, já existe um TypeScript em andamento do ticket - \`${verificar.Protocolo}\``, flags: 64 }).then(msg => {
                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        if (error.code == 10008) {
                            return
                        }
                    }
                }, 5000)
                return
            })


            interaction.reply({ content: `${obterEmoji(9)} ${interaction.user}, estamos gerando o *TypeScript* deste canal aguarde alguns segundos.` }).then(async msgaa => {

                interaction.guild.channels.create({
                    name: `📂・typescript-${verificar.Protocolo}`,

                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        },

                    ],


                }).then(async channel => {

                    await channel.createWebhook({
                        name: 'Some-username',
                        avatar: 'https://i.imgur.com/AfFp7pu.png',
                    }).catch(console.error);





                    channel.setTopic(`TypeScript - ${verificar.Protocolo}`)


                    const embedp = new EmbedBuilder()

                        .setDescription(`❗ Segue abaixo o **TYPESCRIPT** do ticket com protocolo \`${verificar.Protocolo}\`.\n\n> Esse canal será finalizado após 15 minutos de sua abertura.`)
                        .setColor("#2b2d31")

                    channel.send({ embeds: [embedp], content: `${interaction.user}` })
                    setTimeout(async () => {
                        const webhooks = await channel.fetchWebhooks();
                        const webhook = webhooks.find(wh => wh.token);

                        const sendPromises = verificar.LogsMessage.reverse().map(m =>
                            webhook.send({ avatarURL: m.avatar, username: m.author, content: `<t:${Math.ceil(m.timestamp / 1000)}>: ${m.content}` })
                        );

                        Promise.all(sendPromises)
                            .then(() => {

                                const logcanal = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`)
                                            .setLabel("Ir até o TypeScript")
                                            .setStyle(5)

                                            .setDisabled(false),
                                    )
                                const finalizar = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId("FinalizarTypeScript")
                                            .setEmoji('997711823006617600')
                                            .setLabel('Fechar TypeScript')
                                            .setStyle(2)

                                            .setDisabled(false),
                                    )

                                channel.send({ components: [finalizar], content: `${obterEmoji(9)} ${interaction.user}, terminamos de gerar o *TypeScript* do ticket de protocolo *${verificar.Protocolo}*.` })
                                msgaa.edit({ content: `${obterEmoji(8)} ${interaction.user}, o TypeScript do ticket *${verificar.Protocolo}* foi gerado para acessar clique abaixo:`, components: [logcanal] }).then(tt => {
                                    setTimeout(async () => {
                                        tt.delete()
                                    }, 30000)

                                    setTimeout(async () => {
                                        channel.delete()
                                    }, 900000)
                                }
                                )
                            })
                    }, 2000)

                })
            })
        }

    }
}


function protocolo(n) {
    const randomizar = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'
    let text = ''
    for (var i = 0; i < n + 1; i++) text += randomizar.charAt(Math.floor(Math.random() * randomizar.length))
    return text;
}

function generateCode(length) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}
