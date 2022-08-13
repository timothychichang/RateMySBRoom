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
        type: [Number],
        required: true
    },
    avgRating: {
        type: Number,
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

organizationSchema.virtual('imagePath').get(function() {
    const imageBuffer = new Buffer.from(this.image, 'base64');
    return imageBuffer;
})

const organizationModel = mongoose.model('organization', organizationSchema);

export default organizationModel;