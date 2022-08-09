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

router.post('/', async (req, res) => {
    const org = new organizationModel({
        name: req.body.name,
        description: req.body.description,
        comments: [],
        ratings: []
    });

    try {
        const newOrg = await org.save();
        res.send('Successfully saved org');
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const org = await organizationModel.findById(req.params.id);
        res.send(org);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const org = await organizationModel.findById(req.params.id);
        await org.remove();
        res.send('Successfully deleted');
    } catch (err) {
        console.log(err);
    }
})








export default router;