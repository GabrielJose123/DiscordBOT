const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { log } = require('node:console');
const { Client, GatewayIntentBits, Events } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

const commandsPath = path.join(__dirname, '../commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commandsRead = [];

commandsFiles.forEach(file => {
    const command = require(`../commands/${file}`);
    commandsRead.push(command.data.toJSON());
});

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const saveComma = async () => {
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commandsRead }
    );
};

saveComma()



module.exports = { commandsRead, saveComma };
