import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("MongoDB connect")
    } catch (error) {
         console.error("MongoDB error")   
    }
}