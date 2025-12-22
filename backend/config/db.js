import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB`);
    } catch {
        console.log(`Error: Not connected to MongoDB`);
    }
};

export default connectDB;
