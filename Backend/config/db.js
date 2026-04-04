import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db connection successfully.');  
    } catch (error) {
        console.log('Db Connection Error',error.message);
    }
}

export default connectDB;