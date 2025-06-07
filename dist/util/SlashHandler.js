const fs = require('fs');

module.exports = {
    run: (client) => {
        const SlashsArray = []
        fs.readdir(`./dist/commands/`, (erro, pasta) => {
            pasta.forEach(subpasta => {
                fs.readdir(`./dist/commands/${subpasta}/`, (erro, arquivos) => {
                    arquivos.forEach(arquivo => {
                        if (!arquivo?.endsWith('.js')) return
                        arquivo = require(`../commands/${subpasta}/${arquivo}`)
                        if (!arquivo?.name) return;
                        client.slashCommands.set(arquivo?.name, arquivo)
                        SlashsArray.push(arquivo)
                    })
                })
            })
        });

        client.on("ready", async () => {
            await client.application.commands.set(SlashsArray).then(() => {
                console.log(`\x1b[36m[Slash Commands]\x1b[0m Commands loaded successfully!`);
            }).catch((err) => {
                console.error(err)
            })
        })
    }
};
