const { SlashCommandBuilder } = require('@discordjs/builders');
const ConnectSSH = require('../api/ssh/connectSSH');
const dotenv = require('dotenv');
dotenv.config();

const ssh = new SlashCommandBuilder()
    .setName('ssh')
    .setDescription('COMANDOS PARA SERVIDORES SSH')
   /*.addSubcommand(sub => 
        sub
        .setName('cadastrar')
        .options
    ); */


module.exports = {
    data: ssh,
    async execute(interaction) {
        await interaction.deferReply();

        
        const server = new ConnectSSH({
            host: '10.10.1.187',
            username: 'root',
            auth: 'Kr14t1v4!'
        });

    await server.connect();

    const result = await server.command('df -h');

    await interaction.editReply(`\`\`\`\n${result}\n\`\`\``);
    }
}; 
