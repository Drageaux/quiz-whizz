import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
var http = require("http");

const quizRouter:Router = Router();

// get quiz question
quizRouter.post("/", function (request:Request, response:Response, next:NextFunction) {
    console.log(request.body);
    let level = request.body.currentLevel;
    let maxValue = Math.pow(10, 1 + 0.1 * level);
    let exprList:string[] = [];

    // damage = random number between 1 and the max value
    let targetValue = getRandomInclusive(1, maxValue);
    console.log("target val: " + targetValue);

    // generate expressions and modifiers
    let givenValue = targetValue; // starts out equal to the damage


    // only increase the values if current given value is still smaller than the max value
    let exprTimes = 2;
    let modifier; // current modifier number to be added in the list
    let limit; // max limit of modifier

    for (let i = 0; i < exprTimes; i++) {
        let randomIndex:number;
        if (givenValue >= maxValue) {
            randomIndex = getRandomInclusive(2, 3);
        } else {
            // TODO: delimit the lowest number to be 0
            randomIndex = getRandomInclusive(0, 3);
        }

        switch (randomIndex) {
            case 0:
                console.log("adding...");
                limit = maxValue - givenValue;
                modifier = getRandomInclusive(0, limit);

                givenValue = targetValue + modifier;
                exprList.push(modifier.toString(), "-");
                break;
            case 1:
                console.log("multiplying...");
                limit = Math.floor(maxValue / givenValue);
                modifier = getRandomInclusive(0, limit);

                givenValue = targetValue * modifier;
                exprList.push(modifier.toString(), "/");
                break;
            case 2:
                console.log("subtracting...");
                modifier = getRandomInclusive(0, givenValue);

                givenValue = targetValue - modifier;
                exprList.push(modifier.toString(), "+");
                break;
            case 3:
                console.log("dividing");
                modifier = getRandomInclusive(1, givenValue);

                givenValue = targetValue / modifier;
                exprList.push(modifier.toString(), "*");
                break;
            default:
                console.log("ERROR: expression generation had some problems!");
                break;
        }
    }

    console.log("given val: " + givenValue);
    console.log("list: " + exprList.toString());

    // randomize the list of expressions and modifiers


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


// HELPER FUNCTIONS
function getRandomInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { quizRouter }
