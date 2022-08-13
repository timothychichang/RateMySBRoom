import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
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

organizationSchema.virtual('imagePath').get(function() {
    const imageBuffer = new Buffer.from(this.image, 'base64');
    return imageBuffer;
})

organizationSchema.virtual('avgRating').get(function() {

    if (this.ratings.length > 0) {
        let sumRating = 0;
        for (let userRating of this.ratings) {
            sumRating = sumRating + userRating.rating;
        }
        const avgRating = sumRating / this.ratings.length;
        return avgRating;
    }
    else {
        return null;
    }

})

const organizationModel = mongoose.model('organization', organizationSchema);

export default organizationModel;