import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use mongoose.connect with updated options for Mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
