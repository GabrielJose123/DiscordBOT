const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;

const db = require('./db/connect/connectDB');
db.connect();

const sshRoute = require('./routes/sshRouters');
app.use('/servers', sshRoute);

app.listen(port, () => {console.log(`SERVER RUNNING IN http://localhost:${port}`)});


