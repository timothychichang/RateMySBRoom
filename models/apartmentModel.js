import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    comments: {
        type: [{ comment: String, user: String }],
        required: true
    },
    ratings: {
        type: [{ rating: Number, user: String }],
        required: true
    },/*
    avgRating: {
        type: Number,
        required: true,
    },*/
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

apartmentSchema.virtual('imagePath').get(function() {
    const imageBuffer = new Buffer.from(this.image, 'base64');
    return imageBuffer;
})

apartmentSchema.virtual('avgRating').get(function() {

    if (this.ratings.length > 0) {
        let sumRating = 0;
        for (let userRating of this.ratings) {
            sumRating = sumRating + userRating.rating;
        }
        const avgRating = sumRating / this.ratings.length;
        return avgRating.toFixed(1);
    }
    else {
        return null;
    }

})

const apartmentModel = mongoose.model('apartment', apartmentSchema);

export default apartmentModel;