import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("connected to db");
        })

        connection.on("error", (error) => {
            console.log("something went wrong in connecting to db make sure db running: ", error);
            
            process.exit()
        })
    } catch (error) {
        console.log("something went wrong in connecting to db");
        console.log(error);
        
    }
}