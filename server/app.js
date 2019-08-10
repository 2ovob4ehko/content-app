import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {serverPort, origin} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: origin}));

app.get('/contents', (req, res) => {
    db.listContents().then(data => res.send(data));
});

app.post('/contents', (req, res) => {
    db.createContent(req.body).then(data => res.send(data));
});

app.delete('/contents/:id', (req, res) => {
    db.deleteContent(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up running on port ${serverPort}`);
});