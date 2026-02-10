const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({ debug: false });
const port = process.env.PORT;

const db = require('./db/connect/connectDB');
db.connect();

const sshRoute = require('./routes/sshRoutes');
const HourLog = require('../utils/HourLog');
app.use('/servers', sshRoute);

app.listen(port, () => {HourLog(`SERVER RUNNING IN http://localhost:${port}`)});


