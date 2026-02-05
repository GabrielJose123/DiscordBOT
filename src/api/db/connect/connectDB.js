const typeorm = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const db = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        require('../models/serversCredential')
    ],
});

const connect = async () => {
    await db.initialize()
    .then(() => console.log('DB CONNECT: OK'))
    .catch((err) => console.log(`DB CONNECT FAILED: ${err}`));
}

module.exports = {db, connect};