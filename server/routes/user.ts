import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";

const userRouter:Router = Router();

var User = require("../models/user.js");

//
userRouter.post("/saveScore", function (request:Request, response:Response, next:NextFunction) {

    var userName = request.body.userName;
    var user = new User({name: userName});
    user.save(function (err, user) {
        response.json(user);
    });
});


export { userRouter }
