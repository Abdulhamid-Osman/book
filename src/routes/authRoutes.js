const express = require("express");
const {MongoClient} = require("mongodb");
const debug = require("debug")("app: authRoutes");
const passport = require("passport");
const authRoutes = express.Router();

const routes = (nav) =>{
    authRoutes.route("/signUp")
        .post((req,res)=>{
            const { username, password } = req.body
            const url = "mongodb://localhost:27017";
            const dbName = "myLibrary";
            (async function addUser(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    debug("user route successfully connected!!");
                    const db = client.db(dbName)
                    const collection = db.collection("users")
                    const user = { username, password }
                    const result = await collection.insertOne(user)
                    debug(result)
                    req.login(result.ops[0], ()=>{
                        res.redirect("/auth/profile")
                    })
                }catch(err){
                    debug(err)
                }
            }());
        });
        authRoutes.route("/signIn")
            .get((req,res)=>{
                res.render("signin",{
                    nav, title: "Sign In"
                })
            })
            .post(passport.authenticate("local",{
                successRedirect: "/auth/profile",
                failureRedirect: "/"
            }))
        authRoutes.route("/profile")
        .all((req,res, next)=>{
            if(req.user){
                next();
            }else{
                res.redirect("/")
            }
        })
            .get((req,res)=>{
                res.json(req.user)
                debug(req.user);
            })
        return authRoutes;
}
module.exports = routes;