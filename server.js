import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './db.js';
import roomRoutes from './routes/roomRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit:'1mb' }));

connectDB();

app.use(express.static('frontend/build'));

app.use('/api', roomRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('frontend', 'build', 'index.html'))
})

const PORT = process.env.PORT || 8800; 

app.listen(PORT, console.log(`Server running on port ${PORT}`));