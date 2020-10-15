const express = require("express");
const {MongoClient} = require("mongodb");
const debug = require("debug")("app: adminRouter");
const adminRouter = express.Router();

const books = [
    {
        title: "Kenya",
        genre: "Historical",
        author: "Abdulhamid",
        read: false
    },
    {
        title: "Tanzania",
        genre: "country",
        author: "Osman",
        read: false
    },
    {
        title: "Somalia",
        genre: "poem",
        author: "Abdullahi",
        read: false
    },
    {
        title: "Zambia",
        genre: "war and history",
        author: "Mohamed",
        read: false
    },
    {
        title: "Ethipia",
        genre: "Historical and merits",
        author: "Abdi",
        read: false
    },
    {
        title: "Egypt",
        genre: "Historical",
        author: "Umar",
        read: false
    },
    
];
const router = ()=>{
    adminRouter.route("/")
        .get((req,res)=>{
            const url = "mongodb://localhost:27017";
            const dbName = "myLibrary";
            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    debug("successfully connected");
                    const db = client.db(dbName)
                    const response = await db.collection("books").insertMany(books);
                    res.json(response);  
                }catch(err){
                    debug(err.stack);
                }
                client.close();
            }());
        });
        return adminRouter;
};
module.exports = router;