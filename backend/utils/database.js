import mongoose from "mongoose";

const connectDb = async(req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log(`Database connected`);
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;