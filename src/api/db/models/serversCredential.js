const { type } = require('node:os');
const typeorm = require('typeorm');
const { CreateDateColunm } = require('typeorm');

module.exports = new typeorm.EntitySchema({
    name: 'Crendentials',
    tableName: 'crendentials_servers',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },

        serverName: {
            type: 'varchar',
            length:255,
            required: true
        },

        username: {
            type: 'varchar',
            length: 255
        },

        ip: {
            type: 'varchar',
            length:255
        },
        
        auth: {
            type: 'varchar',
            length:255
        }
    }
});