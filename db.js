import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {dbName: 'data'});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;