import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reviews: {
        type: [{ rating: Number, comment: String, user: String, postDate: String }],
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
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

    if (this.numReviews > 0) {
        let sumRating = 0;
        for (let userReview of this.reviews) {
            sumRating = sumRating + userReview.rating;
        }
        const avgRating = sumRating / this.numReviews;
        return avgRating.toFixed(1);
    }
    else {
        return '-';
    }

})


const roomModel = mongoose.model('room', roomSchema);

export default roomModel;