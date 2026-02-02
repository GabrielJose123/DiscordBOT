const { REST, Routes } = require('discord.js');
const { log } = require('node:console');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config()

const commandsPath = path.join(__dirname, '..');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

commandsFiles.forEach(file => {
    const command = require(`../${file}`);
    commands.push(command.data.toJSON());
});

const rest = new REST({ version: 10}).setToken(process.env.TOKEN);

const saveComma = async () => {
    await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
    )
}

saveComma()
.then(() => {
    console.log(`comandos lidos: ${commands.length}`);
    console.log('comandos registrados com sucesso');
}).catch(err => console.error(err));