

let deploy = require('./deploy.json');
console.log(`\x1b[31m[Version BOT]\x1b[0m Versão atual do BOT: ${deploy.version || 'Não identificado!'}`);


const { AtivarIntents } = require("./dist/FunctionsAll/PermissionAPI/StartIntents.js");
AtivarIntents()


const loadSlashCommands = require("./dist/util/SlashHandler.js");
const loadEvents = require("./dist/util/EventsHandler.js");
const MainClient = require("./dist/util/client.js");
const { Collection } = require("discord.js");

const client = new MainClient();


client.connect()
loadSlashCommands.run(client);
loadEvents.run(client);

client.slashCommands = new Collection();

client.on('ready', async (client) => {
    console.log(`\x1b[36m[INFO]\x1b[0m ${client.user.tag} has started - Serving ${client.guilds.cache.size} servers - Accessing ${client.channels.cache.size} channels - Tracking ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`);

})


client.on("guildCreate", (guild) => {
    if (client.guilds.cache.size > 1) {
        guild.leave();
    }
});

process.on("unhandRejection", (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise);
});
process.on("uncaughtException", (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin);
});
process.on("uncaughtExceptionMonitor", (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin);
});
