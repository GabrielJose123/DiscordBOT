const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { commandsRead } = require('./deployCommands/deploy-commands');

const dotenv = require('dotenv');
const { exec } = require('node:child_process');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const fs = require('node:fs');
const path = require('node:path');
const { execute } = require('./commands/git');

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(item => item.endsWith('.js'));

client.commands = new Collection();

commandsFiles.map((item) => {
    const objCommand = require(path.join(commandsPath,item));
    const command = objCommand.data && objCommand.execute ? client.commands.set(objCommand.data.name, objCommand) : `o comando ${item} nao pode  ser utlizado`
});

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);

const executeCommand = interaction => {
    interaction.isChatInputCommand() && client.commands.get(interaction.commandName)?.execute(interaction);
};

client.on(Events.InteractionCreate,executeCommand);