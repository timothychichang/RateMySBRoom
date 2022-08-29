import express from 'express';
import roomModel from '../models/roomModel.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const rooms = await roomModel.find({});
        res.send(rooms);
    } catch (err) {
        console.log(err);
    }
})

router.post('/', async (req, res) => {
    const room = new roomModel({
        name: req.body.name,
        reviews: [],
        numReviews: 0
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
router.put('/addReview/:id', async (req, res) => {
    try {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formattedDate = `${month}-${day}-${year}`;
        console.log(formattedDate);
        
        const reviewObj = {
            rating: req.body.userRating,
            comment: req.body.userComment,
            user: req.body.userEmail,
            postDate: formattedDate 
        }
        
        await roomModel.updateOne(
            { _id: req.params.id },
            { $push: {reviews: reviewObj} }
        )

        let room = await roomModel.findById(req.params.id);
        room.numReviews = room.numReviews + 1;
        await room.save();

        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})

// delete user review
router.put('/delReview/:id', async (req, res) => {
    try {
        await roomModel.updateOne(
            { _id: req.params.id },
            { $pull: {reviews: req.body} }
        )

        let room = await roomModel.findById(req.params.id);
        room.numReviews = room.numReviews - 1;
        await room.save();
        
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
})






export default router;