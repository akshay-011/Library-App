const mongoose = require("mongoose");

const URL = "mongodb+srv://akshay:akshay@maindb.nxobvau.mongodb.net/?retryWrites=true&w=majority";
const KEY = "AKSHAY6698"

mongoose.connect(URL);
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    avialable:Boolean,
    
    bookId:{
        type: Schema.Types.ObjectId,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    publicationYear:{
        type:String,
        require:true
    },
    genre:{
        type:[String],
        require:true,
    },
    isbnNo:{
        type:String,
        require:true
    },
    comments:{
        type:[
                {
                    username:String,
                    comment:String
                }
            ],
        default:null
    }

},
{
    timestamps:true
},

);

const BookModel = mongoose.model("BookData", bookSchema);

module.exports = BookModel;