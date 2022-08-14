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
        ratings: [],
        //avgRating: 0,
    });
    if (req.body.image === null) {
        org.image = '';
    }
    else {
        org.image = req.body.image;
    }
    
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

router.put('/:id/addComment', async (req, res) => {
    try {
        const commentObj = {comment: req.body.comment, user: req.body.userEmail};
        await organizationModel.updateOne(
            {_id: req.params.id},
            { $push: {comments: commentObj} }
        )
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id/delComment', async (req, res) => {
    try {
        await organizationModel.updateOne(
            { _id: req.params.id },
            { $pull: {comments: req.body} }
        )
        res.status(200).send(); 
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id/addRating', async (req, res) => {
    try {
        // update ratings array
        const ratingObj = {rating: req.body.rating, user: req.body.userEmail};
        await organizationModel.updateOne(
            { _id: req.params.id },
            { $push: {ratings: ratingObj} }
        )
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})





export default router;