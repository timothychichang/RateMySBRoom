import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    /*
    comments: {
        type: [{ comment: String, user: String }],
        required: true
    },
    ratings: {
        type: [{ rating: Number, user: String }],
        required: true
    },*/
    reviews: {
        type: [{ rating: Number, comment: String, user: String }],
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    imageType: {
        type: String,
        required: false
    }
},
{   
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
}
);

roomSchema.virtual('imagePath').get(function() {
    const imageBuffer = new Buffer.from(this.image, 'base64');
    return imageBuffer;
})

roomSchema.virtual('avgRating').get(function() {

    if (this.ratings.length > 0) {
        let sumRating = 0;
        for (let userReview of this.reviews) {
            sumRating = sumRating + userReview.rating;
        }
        const avgRating = sumRating / this.ratings.length;
        return avgRating.toFixed(1);
    }
    else {
        return null;
    }

})

const roomModel = mongoose.model('room', roomSchema);

export default roomModel;