import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
var http = require("http");

const quizRouter:Router = Router();

// get quiz question
quizRouter.post("/", function (request:Request, response:Response, next:NextFunction) {
    console.log(request.body);
    let level = request.body.currentLevel;
    let maxValue = Math.pow(10,1+0.1*level);

    // random number between 1 and the max value
    let targetValue = Math.round(Math.random() * (maxValue)) + 1;
    console.log("target val: " + targetValue);

    response.json({
        quiz: "test"
    });
});


// evaluate and return the result & whether answer is correct or not
quizRouter.post("/check", function (request:Request, response:Response, next:NextFunction) {
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

export { quizRouter }
