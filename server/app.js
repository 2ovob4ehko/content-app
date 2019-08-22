import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import mkdirp from 'mkdirp';
import fs from 'fs';
import { promisify } from 'util';

import {serverPort, origin} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const unlinkAsync = promisify(fs.unlink)

const uploadPath = './public/uploads/';
mkdirp.sync(uploadPath);
const storage = multer.diskStorage({
   destination: uploadPath,
   filename: (req, file, cb) => {
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
});

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: origin}));

app.get('/contents', (req, res) => {
    db.listContents().then(data => res.send(data));
});

app.post('/contents', (req, res) => {
  if(req.body.id){
    if(req.body.image){
      db.findContent(req.body.id).then(content => {
        if(content.image){
          unlinkAsync('./public'+content.image);
        }
      });
    }
    db.updateContent(req.body).then(data => res.send(data));
  }else{
    db.createContent(req.body).then(data => res.send(data));
  }
});

app.delete('/contents/:id', (req, res) => {
    db.findContent(req.params.id).then(content => {
      if(content.image){
        unlinkAsync('./public'+content.image);
      }
    });
    db.deleteContent(req.params.id).then(data => res.send(data));
});

app.post('/upload', upload.single('temp_image'), (req, res, next) => {
    return res.send({filename: '/uploads/'+req.file.filename});
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up running on port ${serverPort}`);
    console.log('👍');
});
