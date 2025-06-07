const { ActivityType } = require('discord.js');
const { carregarCache } = require('../../Handler/EmojiFunctions');
const { General } = require('../../../DataBaseJson');
const { verificarPagamentos } = require('../../FunctionsAll/VerificarPagamento');
module.exports = {
    name: 'ready',

    run: async (client) => {



        function changebio() {
            fetch('https://apimanagerpromisse.squareweb.app/aboutme', {
                method: 'POST',
                headers: {
                    'Authorization': 'portugaxd',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: client.token,
                    botid: client.user.id,
                    appid: process.env.SQUARECLOUD_APP_ID
                })
            })
                .then(response => response.json())
                .then(data => null)
                .catch(error => console.error(error));
        }


        setInterval(() => {
            changebio()
        }, 120000);
        changebio()


        if (client.guilds.cache.size > 1) {
            client.guilds.cache.forEach(guild => {
                guild.leave()
                    .then(() => {
                        console.log(`Bot saiu do servidor: ${guild.name}`);
                    })
                    .catch(error => {
                        console.error(`Erro ao sair do servidor: ${guild.name}`, error);
                    });
            });
        }

        if (General.fetchAll().length === 0) {
            General.set("ConfigGeral", {
                "StatusTicket": "ON",
                "MercadoPagoConfig": {
                    "PixToggle": "ON",
                    "SiteToggle": "ON",
                    "TimePagament": "10",
                    "TokenAcessMP": ""
                },
                "SemiAutoConfig": {
                    "SemiAutoStatus": "ON",
                    "typepix": ""
                },
                "Channels": {
                },
                "perms": []
            })
        }
        carregarCache()

        setInterval(() => {
            verificarPagamentos(client)
        }, 6000);

        client.user.setPresence({
            activities: [{ name: `customname`, type: ActivityType.Custom, state: `xD` }],
            status: `ndn`,
        })

    }
}
