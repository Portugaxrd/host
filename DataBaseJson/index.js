const {
  JsonDatabase,
} = require("wio.db");

const General = new JsonDatabase({
  databasePath: "./DataBaseJson/configgeral.json"
});

const Tickets = new JsonDatabase({
  databasePath: "./DataBaseJson/Tickets.json"
});

const TicketsSave = new JsonDatabase({
  databasePath: "./DataBaseJson/TicketsSave.json"
});

const TicketsLogs = new JsonDatabase({
  databasePath: "./DataBaseJson/TicketsLogs.json"
});

const PainelTickets = new JsonDatabase({
  databasePath: "./DataBaseJson/PainelTickets.json"
});


const RankTicketsIDs = new JsonDatabase({
  databasePath: "./DataBaseJson/RankTicketsIDs.json"
});

const PerfilMembros = new JsonDatabase({
  databasePath: "./DataBaseJson/PerfilMembros.json"
});













module.exports = {
  Tickets,
  General,
  TicketsSave,
  TicketsLogs,
  PainelTickets,
  RankTicketsIDs,
  PerfilMembros
}