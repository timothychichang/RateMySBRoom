import express from 'express';
import organizationModel from '../models/organizationModel.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const orgs = await organizationModel.find({});
        res.send(orgs);
    } catch (err) {
        console.log(err);
    }
})

