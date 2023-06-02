const mongoose = require("mongoose");

const URL = "mongodb+srv://akshay:akshay@maindb.nxobvau.mongodb.net/?retryWrites=true&w=majority";

try{
    mongoose.connect(URL);
    const Schema = mongoose.Schema;

    // User Schema

    const userSchema = new Schema({
        name:String,
        username:{
            type:String,
            unique:true,
            require:true
        },
        place:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        education:{
            type:String,
            required:true
        },
        contactInfo:{
            type:String,
            required:true
        },
        
        isOnline:Boolean,
        isBlocked:Boolean,
        likedBooks:{
            type:[String],
            default: null
        },
        rentedBook:{
            rented:Boolean,
            bookId:String,
        },
        isAdmin:{
            type:Boolean,
            required:true
        }
        

    });

    const UserModel = mongoose.model("UserDetails", userSchema);

    module.exports = UserModel;
}
catch(err){
    console.log(err);
    console.log("[*] You May need to check Your Connection....");
}
