const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path")
const app = express();

 // eslint-disable-next-line no-undef
 const port = process.env.PORT || 3000
 
app.use(morgan("combined"));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "/public")));
// eslint-disable-next-line no-undef
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
// eslint-disable-next-line no-undef
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
// eslint-disable-next-line no-undef
app.use("/jquery", express.static(path.join(__dirname, "/node_modules/jquery/dist")))
app.set("views", "./src/views");
app.set("view engine", "ejs");


const bookRouter = require("./src/routes/bookRoutes");
app.use("/books", bookRouter)
app.get("/",(req,res)=>{
    // eslint-disable-next-line no-undef
    res.render("index", 
        {
            
            nav: [{ link:"/books", title:"Books" }, 
                // eslint-disable-next-line no-dupe-keys
                { link:"/authors", title:"Authors"
            }
        ],
        title: "Library",
    })
});


app.listen(port, ()=>{
    debug(`Listening to port   ${chalk.green('3000')}`);
})