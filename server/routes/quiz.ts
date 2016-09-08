import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
var http = require("http");

const quizRouter:Router = Router();

// get quiz question
quizRouter.post("/", function (request:Request, response:Response, next:NextFunction) {


    // test
    http.get("http://api.mathjs.org/v1/?expr=2*(7-3)", (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk.toString("utf8"));
            response.json({
                number: chunk.toString("utf8")
            })
        });
    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
    });

});

// evaluate and return the result & whether answer is correct or not
quizRouter.post("/check", function (request:Request, response:Response, next:NextFunction) {

    //pbkdf2(request.body.password, user.salt, 10000, length, function (err, hash) {
    //    if (err) {
    //        console.log(err);
    //    }
    //
    //    // check if password is active
    //    if (hash.toString("hex") === user.hashedPassword) {
    //
    //        const token = sign({"user": user.username, permissions: []}, secret, { expiresIn: "7d" });
    //        response.json({"jwt": token});
    //
    //    } else {
    //        response.json({message: "Wrong password"});
    //    }
    //
    //});
});

export { quizRouter }
