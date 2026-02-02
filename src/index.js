const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//commands imports
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(item => item.endsWith('.js'));

client.commands = new Collection();

commandsFiles.map((item) => {
    const objCommand = require(path.join(commandsPath,item));
    const command = objCommand.data && objCommand.execute ? client.commands.set(objCommand.data.name, objCommand) : `o comando ${item} nao pode  ser utlizado`
});
console.log(client.commands);


client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, interaction => {
    console.log(interaction);
    client.commands.get('ping').execute(interaction)
});