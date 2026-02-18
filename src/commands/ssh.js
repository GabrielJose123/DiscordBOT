const { SlashCommandBuilder } = require('@discordjs/builders');
const ConnectSSH = require('../ssh/connectSSH');
const dotenv = require('dotenv');
const FetchOp = require('../utils/FetchOp');
const HourLog = require('../utils/HourLog');
const { text } = require('express');
const botWrite = require('../utils/BotWrite');
dotenv.config({ silent: true });

const ssh = new SlashCommandBuilder()
    .setName('ssh')
    .setDescription('COMANDOS PARA SERVIDORES SSH')
    .addSubcommand(subcommand =>
        subcommand
            .setName('cadastrar')
            .setDescription('EFETUA O CADASTRO DE SERVIDORES SSH')
                .addStringOption(option =>
                    option
                        .setName('servername')
                        .setDescription('Nome do servidor que sera referenciado pelo bot')
                        .setRequired(true)
                )
                
                .addStringOption(option =>       
                    option
                        .setName('host')
                        .setDescription('IP ou host do servidor')
                        .setRequired(true)
                    )

                .addStringOption(option =>
                    option
                        .setName('user')
                        .setDescription('Usuário SSH')
                        .setRequired(true)
                    )

                .addStringOption(option =>
                    option
                        .setName('auth')
                        .setDescription('Senha ou caminho da chave (somente testes)')
                        .setRequired(true)
                    )
    )

    .addSubcommand(subcommand =>
        subcommand
            .setName('listarservers')
            .setDescription('Lista servidores cadastrados')
    )
    .addSubcommand(subcommand => 
        subcommand
            .setName('verificarespaco')
            .setDescription('verifica espaco em um dos servidores conectados')
                .addStringOption(option =>
                    option
                        .setName('server')
                        .setDescription("Digite um dos servidor que queira verificar o espaco")
                        .setRequired(true)
                )
    )

const ApiOp = new FetchOp({ url: `http://localhost:${process.env.PORT}/servers`});

const saveServe = async (interaction) => {
    const serverObj = {
        serverName: interaction.options.getString('servername'),
        ip: interaction.options.getString('host'),
        username: interaction.options.getString('user'),
        auth: interaction.options.getString('auth')
    };
    try {
        await ApiOp.post(serverObj);
        HourLog(`THE SERVER ${serverObj.serverName} HAS BEEN SAVED successful`);
        botWrite(interaction, `Servidor: ${serverObj.serverName} salvo com sucesso`);
    }catch (err){HourLog(`THE SERVER ${serverObj.serverName} DON´T CAN SAVED BECAUSE: ${err}`)}
};

const getServer = async (interaction) => {
    const serverNames = [];
    const data = await ApiOp.get();

    Object.entries(data).map(([idx,item]) => {
        serverNames.push(item.serverName); 
    });

    botWrite(interaction, `${serverNames}`);
};

const verSpace = async (interaction) => {
    const ApiOp = new FetchOp({ url: `http://localhost:${process.env.PORT}/servers`});
    const serverData = await ApiOp.get();
    
    const serverReq = interaction.options.getString("server")

    const serverTarget = Object.values(serverData).find(item => item.serverName === serverReq);

    !serverTarget && botWrite(interaction, `Servidor ${serverReq} não encontrado.`);

    const serverObj = {
        username: serverTarget.username,
        host: serverTarget.ip,
        auth: serverTarget.auth
    };

    console.log(serverObj);

    const conn = new ConnectSSH(serverObj)
    try {
        HourLog(`TRYING CONNECT INTO SERVER ${serverTarget.username}`);
        serverConn = true;
        await conn.connect();
        botWrite(interaction, `\`\`\`${await conn.command('df -h')}\`\`\``);
    }catch(err){ HourLog(`CONNECT HAS FAILED BECAUSE: ${err}`)};

};

module.exports = {
    data: ssh,

    async execute(interaction) {
        await interaction.deferReply();

        const subcommands = {
            cadastrar: () => saveServe(interaction),
            listarservers: () => getServer(interaction),
            verificarespaco: () => verSpace(interaction)
        };

        const subCommInput = interaction.options.getSubcommand();

        subCommInput in subcommands ? await subcommands[subCommInput]() : botWrite(interaction, 'COMANDO igitado nao existe');

    },
};
