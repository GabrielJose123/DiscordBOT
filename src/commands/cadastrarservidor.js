const { SlashCommandBuilder } = require('@discordjs/builders');
const ConnectSSH = require('../api/ssh/connectSSH');
const dotenv = require('dotenv');
dotenv.config({ silent: true });

const cadastrarservidor = new SlashCommandBuilder()
    .setName('cadastrarservidor')
    .setDescription('Verifica cadastrar servidor no bot');

module.exports = {
    data: cadastrarservidor,

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
