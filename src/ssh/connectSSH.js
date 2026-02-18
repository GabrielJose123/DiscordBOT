const { NodeSSH } = require('node-ssh');
const dotenv = require('dotenv');
const { throwDeprecation } = require('node:process');
const { error } = require('node:console');
const HourLog = require('../utils/HourLog');

dotenv.config()

class ConnectSSH {
    constructor({ host, username, auth}) {
        this.ssh = new NodeSSH();        
        this.host = host;
        this.username = username;
        this.auth = auth;
    };
    async connect() {
        await this.ssh.connect({
            host: this.host,
            username: this.username,
            password : this.auth //mudar pra key
        }).then(() => {HourLog('SERVER CONNECTION : OK')})
        .catch(err => {HourLog(`ERROR TRYING CONNECT TO SERVER ${err}`)})
    };
    async command(command) {
            const result = await this.ssh.execCommand(command)
            const log = result.code != 0 ? `Ocorreu um erro no servidor: ${result.stderr}` : result.stdout;
            
            return log;
    };
};

/*const serverKali = new ConnectSSH({
    host: '10.10.1.192', 
    username: 'kali', 
    auth: process.env.SSH_PASSWORD
});

const main = async () => { 
    await serverKali.connect();
    serverKali.command('df -h');
}

main();*/

module.exports = ConnectSSH