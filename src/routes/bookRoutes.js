const express = require("express");
const bookRouter = express.Router();


const router = (nav)=>{
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
    
    bookRouter.route("/")
        .get((req,res)=>{
            res.render("booksListView", 
            {
                nav,
            title: "Books center",
            books
        })
    });
    bookRouter.route("/:id").get((req,res)=>{
            const { id } = req.params
            res.render("bookView",
               { 
                   nav,
                   title: "Books center",
                    book: books[id]
                    
                }
            )
        }) 
        return bookRouter;
}




module.exports = router;