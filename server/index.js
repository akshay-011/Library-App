// Imports
const express = require('express');
const cors = require("cors");
const UserModel = require('./UserModels');
const session = require("express-session");
const BookModel = require("./BookModel");

// Initialisation
const KEY = "AKSHAY6698"
const PORT = 9876;
const app = new express();

// App use
app.set('trust proxy', 1) 
app.use(session({
    secret:KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:24 * 60 * 60
    }
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));


// Sign Up
app.post("/signup", async (req, res) => {
    var details = req.body;
    details['isOnline'] = false;
    details['isBlocked'] = false;
    details['rentedBook'] = {
        rented:false,
        bookId:''
    };
    details['isAdmin'] = false;

    const doc = new UserModel(details)
    try{
        if(doc.$isValid){
            await doc.save()
            res.status(200).send("Data Uploaded")
        }
        else{
            res.status(400).send("invalid data");
        }
    }
    catch(err){
        if(err.code === 11000){
            res.status(422).send("Duplicate Entry")
        }
        else{
            res.status(408).send(err)
        }
    }
});

// Login Route
app.post("/login", async (req, res) => {
    if(req.session.user){
        return res.status(409).send("Already Logged in");
    }
    try{
        const { username, password } = req.body;
        const user = await UserModel.findOne({username:username});
        if(!user){
            return res.status(407).send("Invalid Username");
        }
        else if( user.password !== password ){
            return res.status(401).send("Invalid Password")
        }
        else if(user.isBlocked){
            res.status(411).send("You have been blocked")
        }
        else{
            if(user.isAdmin){
                req.session['admin'] = true;
                return res.status(222).send("Welcom Admin")
            }
            req.session['user'] = user;
            return res.send(req.session);
        }
    }
    catch(err){
        res.status(500).send("Send Credentials")
    }
})

//user details getting
app.post('/user', (req,res) => {
    console.log("came req here")
    if(req.session.admin === true){
        console.log('came admin here')
        const data = { admin:true };
        return res.status(222).send(data);
    }
    if(req.session.user){
        const data = req.session.user;
        return res.status(200).send(data);
    }
    else{
        return res.status(403).send("Please login")
    }
})

// Book Add
app.post("/add_book", async (req, res) => {
    try{   
        let body = req.body;
        body["avialable"] = true 
        const book = new BookModel(body);
        console.log(book)
        if(book.$isValid()){
            await book.save()
            res.status(200).send("Book added")
        }
        res.status(400).send("Not added Book")
    }
    catch(err){
        console.log(err);   
    }
})

// getting book
app.get("/get_books", async (req, res) => {
    if(req.session.user || req.session.admin ){
        try{
            const doc = await BookModel.find();
            res.send(doc);
        }
        catch(err){
            console.log(err);
            res.staus(500).send("Server Time out")
        }
        }
        else{
            res.status(403).send("Plz login")
        }
})

//Like Book
app.put("/like_book", async (req,res) => {
    if(req.body.id === undefined ){
        return res.status(200).send("pass");
    }
    if(req.body.likes.length === 0){
        return res.status(200).send("oke boy pass");
    }
    var doc = await  UserModel.findOneAndUpdate({_id:req.body.id}, {likedBooks:req.body.likes})
    if(!doc)
        return res.status(410).send("not liked")
    else{
        console.log(req.body.id, req.body.likes);
        return res.send("done");
    }
})


// Sign out
app.post("/logout", async (req,res) => {
    if(!req.session.user){
        return res.status(403).send("Your did'nt logined")
    }
    req.session.destroy();

    return res.send("Done");
})

// admin getting all users
app.get("/get_users", async (req,res) => {
    if(req.session.admin){
        const users = await UserModel.find();
        res.send(users);
    }
    else{
        res.status(403).send("Login as Admin to get this content")
    }
})

// admin deleting user
app.delete("/delete_user", async (req, res) => {
    if(req.session.admin){
        var result = await UserModel.findByIdAndDelete(req.body.id);
        res.status(200).send("Deleted");
    }
    else{
        if(req.session.user){
            var result = await UserModel.findByIdAndDelete(req.session.user._id);
            res.status(200).send("Deleted");
        }
        else{
            res.status(403).send("Plz login");
        }
    }
})

// admin blocking user
app.post("/block_user", async (req, res) => {
    var admin =req.session.admin;
    if(!admin){
        return res.status(403).send("Login as admin");
    }
    else{
        var r = await UserModel.findOneAndUpdate({_id:req.body.id}, {isBlocked:true});
        if(!r){
           return res.status(500).send("Something went wrong");
        }
        else{
            return res.send("Done");
        }

    }
})

app.post("/rent_book", async (req, res) => {
    const {  bookId, userId } = req.body;
    console.log(bookId, userId);
    var r = await UserModel.findByIdAndUpdate({ _id:userId }, {rentedBook: { rented:true, bookId:bookId } })
    var rs = await BookModel.findByIdAndUpdate({_id: bookId }, { avialable:false });
    if(!r){
        return res.status(500).send("Not Updated")
    }
    else{
        return res.status(200).send("Done")
    }
})

// Port Listening
app.listen(PORT, () => {
    console.log(" [*] App listening on port " + PORT);
});