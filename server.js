import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './db.js';

dotenv.config();

const app = express();
app.use(cors());

connectDB();
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit:'1mb' }));



const PORT = process.env.PORT || 8080; 

app.listen(PORT, console.log(`Server running on port ${PORT}`));