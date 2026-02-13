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
            .setName('conectar')
            .setDescription('conectar em um dos servidores cadastrados')
                .addStringOption(option =>
                    option
                        .setName('servers')
                        .setDescription("Digite um dos servidores cadastrados que deseja se conectar")
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
        
    }catch (err){HourLog(`THE SERVER ${serverObj.serverName} DON´T CAN SAVED BECAUSE: ${err}`)}
};

const getServer = async (interaction) => {
    const serverNames = [];
    const data = await ApiOp.get();

    Object.entries(data).map(([idx,item]) => {
        serverNames.push(item.serverName); 
    });

    botWrite(interaction, `${serverNames}`)
    
};

const connectSrv = async (interaction) => {
    const ApiOp = new FetchOp({ url: `http://localhost:${process.env.PORT}/servers`});
    const serverData = await ApiOp.get();

    const servertarget = Object.values(serverData).filter(item => {
        return item.serverName == `${interaction.options.getSubcommand()}`;
    });

    const serverObj = {
        username: servertarget.username,
        host: servertarget.ip,
        auth: servertarget.auth
    };

    HourLog(`TRYING CONNECT INTO SERVER ${servertarget.username}`);

    const conn = new ConnectSSH(serverObj)
    try {
        await conn.connect()
        HourLog(`CONNECT SERVER SUCCESFUL`);
        serverConn = true;
    }catch(err){ HourLog(`CONNECT HAS FAILED BECAUSE: ${err}`)};

    return conn
};


let sshConn;

const verSpace = async (server, interaction) => {
    sshConn 
    ? botWrite(interaction,server.command('df -h') )
    : botWrite(interaction,'Conecte em um servidor' )
};

module.exports = {
    data: ssh,

    async execute(interaction) {
        await interaction.deferReply();

        const subcommands = {
            cadastrar: () => saveServe(interaction),
            listarservers: () => getServer(interaction),
            conectar: () => connectSrv(interaction),
            verificarespaco: verSpace(connectSrv(interaction),interaction)
        };

        const subCommInput = interaction.options.getSubcommand();

        subCommInput in subcommands ? await subcommands[subCommInput]() : botWrite(interaction, 'COMANDO igitado nao existe');

    },
};
