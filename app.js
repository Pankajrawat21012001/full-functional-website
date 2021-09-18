const express=require("express");
const path=require("path");
const fs=require("fs");
const bodyparser=require("body-parser");
const app=express();
const port=80;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/pankajtechnical1', {useUnifiedTopology: true,useNewUrlParser: true});
}

//Define mongoose Schema
const ContactSchema = new mongoose.Schema({
    // _id: mongoose.Schema.ObjectId,
    name: String,
    phone_number: String,
    email: String,
    message: String,
  });

const Contact = mongoose.model('Contact', ContactSchema);

// To get the static file from static folder 
app.use('/static',express.static("static"));
// express. urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: true }))


// here we are setting template engine which will take changes in our html based on requirement needed we are using pug we can use html also 
app.set('view engine','pug');
// here we are giving from where you have to take the template file 
app.set("views",path.join(__dirname,"views"));


// ENDPOINTS
// endpoints defined in our server that helps to perform operations for a particular client request.
app.get("/",(req,res)=>{
    const params={};
    res.status(200).render("home.pug",params);
});

app.get("/contact",(req,res)=>{
    const params={};
    res.status(200).render("contact.pug",params);
});

app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch((err)=>{
        res.status(400).send("Item was not saved to the Database")
        console.log(err);
    })
});


// app.post("/contact",(req,res)=>{
//     const name=req.body.name
//     const phone_number=req.body.phone_number
//     const email=req.body.email
//     const message=req.body.message
//     res.status(200).render("contact.pug");
//     console.log(`   ${name} ${phone_number} ${email}    ${message}`);
//     fs.writeFileSync("data.txt",`   ${name}   ${phone_number} ${email}    ${message}`)
// });




// START THE SERVER 
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});