const { SlashCommandBuilder } = require('@discordjs/builders');
const ConnectSSH = require('../api/ssh/connectSSH');
const dotenv = require('dotenv');
dotenv.config();

const verificarespaco = new SlashCommandBuilder()
    .setName('verificarespaco')
    .setDescription('Verifica espaço de servidores cadastrados');

module.exports = {
    data: verificarespaco,
    async execute(interaction) {
        await interaction.deferReply();
        const server = new ConnectSSH({
            host: '10.10.1.192',
            username: 'kali',
            auth: process.env.SSH_PASSWORD
        });

    await server.connect();

    const result = await server.command('df -h');

    await interaction.editReply(`\`\`\`\n${result}\n\`\`\``);
    }
};
