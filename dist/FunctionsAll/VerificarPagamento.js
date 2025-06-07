const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { TicketsSave } = require("../../DataBaseJson");
const axios = require('axios');

async function verificarPagamentos(client) {

    var u = TicketsSave.fetchAll()

    for (let i = 0; i < u.length; i++) {
        const element = u[i];

        if (element?.data?.pagamentos?.Status === 'Pendente') {
            const channel = client.channels.cache.get(element.data.ChannelID);
            if (channel !== undefined) {
                const channel2 = await client.channels.fetch(element.data.ChannelID);
                try {
                    const fetchedMessage = await channel2.messages.fetch(element.data.pagamentos.msg);
                    if (element.data.pagamentos.Type == 'site') {

                        const url = `https://api.mercadopago.com/v1/payments/search?external_reference=${element.data.pagamentos.IDPagamento}`;
                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${element.data.pagamentos.Token}`
                        };

                        axios.get(url, { headers })
                            .then(async (response) => {
                                if (response.status == 200) {
                                    const Data = response.data.results[0]
                                    if (!Data) return
                                    else if (Data.status_detail == 'accredited') {
                                        TicketsSave.set(`${element.ID}.pagamentos`, {})



                                        if (element.data.Assumiu !== null) {

                                            const button222 = new ActionRowBuilder()
                                            button222.addComponents(
                                                new ButtonBuilder()
                                                    .setURL(`${element.data.ChannelURL}`)
                                                    .setLabel("Ir até o Ticket")
                                                    .setStyle(5)
                                                    .setDisabled(false))


                                            try {
                                                const member = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Assumiu);

                                                const embed222 = new EmbedBuilder()

                                                    .setTitle("Compra Aprovada!")
                                                    .setDescription(`Olá ${member.user}\n\num ticket na qual você assumiu teve o PAGAMENTO APROVADO\n\nSegue o botão abaixo para redirecionar ao ticket`)
                                                    .setColor("2b2d31")

                                                await member.send({ embeds: [embed222], components: [button222] })
                                            } catch (error) {

                                            }

                                        }

                                        try {
                                            const member2 = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Usuario);

                                            const button222 = new ActionRowBuilder()
                                            button222.addComponents(
                                                new ButtonBuilder()
                                                    .setURL(`${element.data.ChannelURL}`)
                                                    .setLabel("Ir até o Ticket")
                                                    .setStyle(5)
                                                    .setDisabled(false))

                                            const embed222 = new EmbedBuilder()

                                                .setTitle("Compra Aprovada!")
                                                .setDescription(`Olá ${member2.user}\n\nO pagamento do produto ${element.data.pagamentos.RazaoPagamento} foi APROVADO!\n\nSegue o botão abaixo para redirecionar ao ticket\n\nProduto: \`\`\`${element.data.pagamentos.ProdutosPagamento}\`\`\``)
                                                .setColor("2b2d31")


                                            await member2.send({ embeds: [embed222], components: [button222] })
                                            const Embed = new EmbedBuilder()

                                                .setTitle("Compra Aprovada!")
                                                .setDescription("A compra foi aprovada com sucesso!\n\nEnviamos o produto em seu privado")
                                                .setColor("2b2d31")

                                            fetchedMessage.edit({ embeds: [Embed], components: [], content: `${member2.user}` })
                                        } catch (error) {
                                            const member2 = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Usuario);


                                            const Embed2 = new EmbedBuilder()

                                                .setTitle("Compra Aprovada!")
                                                .setDescription(`A compra foi aprovada com sucesso!\n\nSeu privado está BLOCKEADO!\n\nPortanto vou enviar o produto aqui\`\`\`${element.data.pagamentos.ProdutosPagamento}\`\`\``)
                                                .setColor("2b2d31")

                                            fetchedMessage.edit({ embeds: [Embed2], components: [], content: `${member2.user}` })
                                        }






                                    }
                                }
                            })

                    } else if (element.data.pagamentos.Type == 'pix') {

                        var res = await axios.get(`https://api.mercadopago.com/v1/payments/${element.data.pagamentos.IDPagamento}`, {
                            headers: {
                                Authorization: `Bearer ${element.data.pagamentos.Token}`
                            }
                        })

                        if (res.data.status == 'approved') {
                            TicketsSave.set(`${element.ID}.pagamentos`, {})

                            if (element.data.Assumiu !== null) {

                                const button222 = new ActionRowBuilder()
                                button222.addComponents(
                                    new ButtonBuilder()
                                        .setURL(`${element.data.ChannelURL}`)
                                        .setLabel("Ir até o Ticket")
                                        .setStyle(5)
                                        .setDisabled(false))


                                try {
                                    const member = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Assumiu);

                                    const embed222 = new EmbedBuilder()

                                        .setTitle(`🎉 ${client.user.username} | Pagamento Aprovado 🎉`)
                                        .setDescription(`Olá ${member.user}\n\nUm ticket na qual você assumiu teve o PAGAMENTO APROVADO\n\nSegue o botão abaixo para redirecionar ao ticket`)
                                        .setColor("2b2d31")

                                    await member.send({ embeds: [embed222], components: [button222] })
                                } catch (error) {

                                }
                            }


                            try {
                                const member2 = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Usuario);

                                const button222 = new ActionRowBuilder()
                                button222.addComponents(
                                    new ButtonBuilder()
                                        .setURL(`${element.data.ChannelURL}`)
                                        .setLabel("Ir até o Ticket")
                                        .setStyle(5)
                                        .setDisabled(false))
                                const embed222 = new EmbedBuilder()

                                    .setTitle(`🎉 ${client.user.username} | Pagamento Aprovado 🎉`)
                                    .setDescription(`Olá ${member2.user}\n\nO pagamento do produto ${element.data.pagamentos.RazaoPagamento} foi APROVADO!\n\nSegue o botão abaixo para redirecionar ao ticket\n\nProduto: \`\`\`${element.data.pagamentos.ProdutosPagamento}\`\`\``)
                                    .setColor("2b2d31")


                                await member2.send({ embeds: [embed222], components: [button222] })
                                const Embed = new EmbedBuilder()

                                    .setTitle(`🎉 ${client.user.username} | Pagamento Aprovado 🎉`)
                                    .setDescription("A compra foi aprovada com sucesso!\n\nEnviamos o produto em seu privado")
                                    .setColor("2b2d31")

                                fetchedMessage.edit({ embeds: [Embed], components: [], content: `${member2.user}` })
                            } catch (error) {
                              
                                const member2 = await client.guilds.cache.get(element.data.pagamentos.GuildServerID).members.fetch(element.data.Usuario);


                                const Embed2 = new EmbedBuilder()

                                    .setTitle(`🎉 ${client.user.username} | Pagamento Aprovado 🎉`)
                                    .setDescription(`A compra foi aprovada com sucesso!\n\nSeu privado está BLOCKEADO!\n\nPortanto vou enviar o produto aqui\`\`\`${element.data.pagamentos.ProdutosPagamento}\`\`\``)
                                    .setColor("2b2d31")

                                fetchedMessage.edit({ embeds: [Embed2], components: [], content: `${member2.user}` })
                            }






                        }



                    }



                } catch (error) {

                }

            }
        }

    }
}



module.exports = {
    verificarPagamentos
};