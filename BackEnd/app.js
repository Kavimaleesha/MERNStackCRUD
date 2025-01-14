//Password = bdeN4V3mui3Wi67c
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);
app.use("/files", express.static("files"));


mongoose.connect("mongodb+srv://Kavindum:bdeN4V3mui3Wi67c@cluster0.asixmfi.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));


//Register -----------------
//Call Register Model
require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register", async (req, res) => {
    const { name, gmail, password } = req.body;
    try{
        await User.create({ 
            name, 
            gmail, 
            password,
        });
        res.send({status: "ok"});
    }catch(err){
        res.send({status: "err"});
    }
});


//Login -----------------
app.post("/login", async (req, res) => {
    const {gmail, password} = req.body;
    try{
        const user = await User.findOne({gmail});
        if(!user){
        return res.json({err: "User Not Found"});
    }
    if(user.password === password){
        return res.json({status: "ok"});
    }else{
        return res.json({err: "incorret Password"});
    }
 }catch(err){
    console.error(err);
    res.status(500).json({err: "Server Error"});
 }
});

//Pdf Upload -----------------
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./files");
    },
    filename:function(req, file, cb){
        const uniqueSuffix = Date.now()
        cb(null,uniqueSuffix + file.originalname);
    },
});

//Insert Model Part
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");
const upload = multer({storage});

app.post("/uploadfile", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const pdf = req.file.filename;
    try {
        await pdfSchema.create({ title: title, pdf: pdf});
        console.log("PDF Uploaded Successfully");
        res.json({ status: 200 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


app.get("/getFile", async (req, res) => {
    try{
        const data = await pdfSchema.find({});
        res.send({ status: 200,data: data});
    }catch(error){
        console.log("Error: ", error);
        res.status(500).send({status: "error"});
    }
});

//Image Part -----------------

require("./Model/ImgModel");
const ImgSchema = mongoose.model("ImageModel");

const multerimg = require("multer");

const storageimg = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../frontend/src/Components/ImgUploader/files");
        },
        filename: function(req, file, cb){
            const uniqueSuffix = Date.now();
            cb(null, uniqueSuffix + file.originalname);
        },
    });

const uploadimg = multerimg({storage: storage});

//Upload Image
app.post("/uploadImg", uploadimg.single("image"), async (req, res) => {

    console.log(req.body);
    const imageName = req.file.filename;

    try{
        await ImgSchema.create({ image: imageName});
        console.log("Image Uploaded Successfully");
        res.json({ status: "ok" })
    }catch(error){
        res.json({ status: error});
    }
});

//Display Image
app.get("/getImage", async (req, res) => {
    try{
        ImgSchema.find({}).then((data) => {
            res.send({status: "ok", data: data});
    });
}catch(error){
    res.json({status: error});
}
});