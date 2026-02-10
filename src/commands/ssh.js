const { SlashCommandBuilder } = require('@discordjs/builders');
const ConnectSSH = require('../api/ssh/connectSSH');
const dotenv = require('dotenv');
const FetchOp = require('../utils/FetchOp');
dotenv.config({ silent: true });

const ssh = new SlashCommandBuilder()
    .setName('ssh')
    .setDescription('COMANDOS PARA SERVIDORES SSH')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('cadastrar')
            .setDescription('EFETUA O CADASTRO DE SERVIDORES SSH')
                .addStringOption(option =>
                    option
                        .setName('serverName')
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
    );

module.exports = {
    data: ssh,

    async execute(interaction) {
        await interaction.deferReply();

        const ApiOp = new FetchOp({ url: `http://localhost:${process.env.PORT}/servers`});

        const host = interaction.options.getString('host');
        const user = interaction.options.getString('user');
        const auth = interaction.options.getString('auth');

        const serverObj = {
            ip:  host,
            username: user,
            auth: auth
        };

        await ApiOp.post(serverObj);
        
    // const server = new ConnectSSH({ serverObj });
    //await server.connect();

    await interaction.editReply(`feito cadastro do servidor com ip ${serverObj.host}`);

    },
};
