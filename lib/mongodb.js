import * as mongoose from "mongoose";

const connectMongoDB =  async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected Successfully!");
    } catch (error) {
        console.log("Error while connecting to MongoDB",error);
    }
};

export default connectMongoDB;