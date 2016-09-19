import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";

const userRouter:Router = Router();

var User = require("../models/user.js");


// create new unique-name user, but it is still unclaimed
userRouter.post("/", function (request:Request, response:Response, next:NextFunction) {
    var userName = request.body.userName.trim();
    User.findOne({"name": userName}, function (err, user) {
        if (user) {
            // this username has been used before
            if (user.registered) {
                // if it's been claimed already
                console.log("ERR: username is taken");
                response.json({message: "Username is already taken"});
            }
        } else {
            // this username has not been added
            var newUser = new User();
            newUser.name = userName;
            newUser.registered = false;
            newUser.save(function (err, newUser) {
                if (err) { console.error(err.stack); }
                console.log("NEW USER: " + newUser.name);
                response.json(newUser);
            });
        }
    });
});


// clear the account's record and mark username as registered
userRouter.post("/register", function (request:Request, response:Response, next:NextFunction) {
    var userName = request.body.userName.trim();
    User.findOne({"name": userName}, function (err, user) {
        if (user) {
            if (user.registered) {
                // if it's been claimed already
                console.log("ERR: username is taken");
                response.json({message: "Username is already taken"});
            } else {
                user.registered = true;
                user.highScore = 0;
                user.highLevel = 0;
                user.save(function (err, user) {
                    if (err) { console.error(err.stack); }
                    response.json(user);
                });
            }
        } else {
            var newUser = new User();
            newUser.name = userName;
            newUser.registered = true;
            newUser.highScore = 0;
            newUser.highLevel = 0;
            newUser.save(function (err, newUser) {
                if (err) { console.error(err.stack); }
                console.log("NEW USER: " + newUser.name);
                response.json(newUser);
            });
        }
    });
});


//
userRouter.post("/saveScore", function (request:Request, response:Response, next:NextFunction) {

    //var userName = request.body.userName;
    //var user = new User({name: userName});
    //user.save(function (err, user) {
    //    if (err) { console.error(err.stack); }
    //    response.json(user);
    //});
});


export { userRouter }
