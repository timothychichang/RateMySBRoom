import express from 'express';
import roomModel from '../models/roomModel.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const rooms = await roomModel.find({});
        res.send(room);
    } catch (err) {
        console.log(err);
    }
})

router.post('/', async (req, res) => {
    const room = new roomModel({
        name: req.body.name,
        reviews: []
    });
    if (req.body.image === null) {
        room.image = '';
    }
    else {
        room.image = req.body.image;
    }
    
    try {
        const newRoom = await room.save();
        res.send('Successfully saved');
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const room = await roomModel.findById(req.params.id);
        res.send(room);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const room = await roomModel.findById(req.params.id);
        await room.remove();
        res.send('Successfully deleted');
    } catch (err) {
        console.log(err);
    }
})

// add new user review
router.put('/:id', async (req, res) => {
    try {
        const reviewObj = {
            rating: req.body.userRating,
            comment: req.body.userComment,
            user: req.body.userEmail 
        }
        await roomModel.updateOne(
            {_id: req.params.id },
            { $push: {reviews: reviewObj} }
        )
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})



/*
router.put('/:id/addComment', async (req, res) => {
    try {
        const commentObj = {comment: req.body.comment, user: req.body.userEmail};
        await apartmentModel.updateOne(
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
        await apartmentModel.updateOne(
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
        await apartmentModel.updateOne(
            { _id: req.params.id },
            { $push: {ratings: ratingObj} }
        )
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})
*/




export default router;