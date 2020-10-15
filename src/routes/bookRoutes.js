const express = require("express");
const {MongoClient, ObjectID} = require("mongodb");
const debug = require("debug")("app: bookRoutes");
const bookRouter = express.Router();


const router = (nav)=>{ 
    bookRouter.use((req,res,next)=>{
        if(req.user){
            next();
        }else{
            res.redirect("/")
        }
    })
    bookRouter.route("/")
        .get((req,res)=>{
            const url = "mongodb://localhost:27017";
            const dbName = "myLibrary";
            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    debug("successfully connected");
                    const db = client.db(dbName)
                    const collection = await db.collection("books");
                    const books = await collection.find().toArray();
            res.render("booksListView", 
            {
                nav,
                title: "Books center",
            books
        }
        );
    }catch(err){
        debug(err.stack)
    }
    client.close();
}())
    });
    bookRouter.route("/:id").get((req,res)=>{
            const { id } = req.params;
            const url = "mongodb://localhost:27017";
            const dbName = "myLibrary";
            (async function mongo(){
                let client;
                try{
                    client =await MongoClient.connect(url);
                    debug("Okay up to now things are okay!!!");
                    const db = client.db(dbName);
                    const collection = await db.collection("books");
                    const book = await collection.findOne({_id: new ObjectID(id) });
                    debug(book);
                    res.render("bookView",
                    { 
                        nav,
                        title: "Books center",
                         book 
                     }
                 );
                }catch(err){
                    debug(err.stack)
                }
            }());
        }) 
        return bookRouter;
}




module.exports = router;