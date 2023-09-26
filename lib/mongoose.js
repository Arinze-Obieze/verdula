import mongoose from "mongoose"
export async function InitMongoose() {
    if (mongoose.connection.readyState) {
return mongoose.connection.asPromise();
    }
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}