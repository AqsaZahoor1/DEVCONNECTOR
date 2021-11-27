// For Db Connection

const mongoose = require("mongoose");   //like imports
const config = require("config");       // like imports

const db = config.get("mongoURI");      // making db global variable

const connectDB =  async() => {
    
    try {
        await mongoose.connect(db);    //as it returns a promise object
        console.log("MongoDb Connected.....")
    }
    catch (error)
    {
        console.log(error);
        process.exit(1);
    }
    
}

module.exports = connectDB;