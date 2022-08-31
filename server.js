import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import path from 'path';
import {fileURLToPath} from 'url';

import connectDB from './db.js';
import roomRoutes from './routes/roomRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
connectDB();

//app.use(express.static('build'));


app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit:'1mb' }));


app.use('/', roomRoutes);

app.use(express.static('build'));

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8800; 

app.listen(PORT, console.log(`Server running on port ${PORT}`));