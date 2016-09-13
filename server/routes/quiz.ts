import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
var http = require("http");

const quizRouter:Router = Router();

// get quiz question
quizRouter.post("/", function (request:Request, response:Response, next:NextFunction) {
    let level = request.body.currentLevel; // current difficulty level
    let maxValue = Math.pow(10, 1 + 0.1 * level); // max damage user can do

    // damage = random number between 1 and the max value
    let targetValue = getRandomInclusive(1, maxValue);
    console.log("target val: " + targetValue);

    // generate expressions and modifiers
    let exprTimes = 2;
    let quiz = generateExpression(exprTimes, targetValue, maxValue);
    console.log("list: " + quiz.expr.toString());

    response.json(quiz);
});


// evaluate and return the result & whether answer is correct or not
quizRouter.post("/check", function (request:Request, response:Response, next:NextFunction) {
    let expr = request.body.expr;
    expr = encodeURIComponent(expr);
    console.log(expr);

    http.get("http://api.mathjs.org/v1/?expr=" + expr, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk.toString("utf8"));
            response.json({
                result: chunk.toString("utf8")
            })
        });
    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
    });
});


//////////////////////
// HELPER FUNCTIONS //
//////////////////////
/**
 * Return a random number from min to max inclusively [min, max]
 *
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInclusive(min:number, max:number) {
    if (min > max) {
        let temp = max;
        max = min;
        min = temp;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Keep only allowed operations
 *
 * @param givenValue
 * @param maxValue
 */
function filterAllowedOperators(givenValue:number, maxValue:number) {
    let exprPossible:string[] = ["+", "*", "-", "/"];

    if (givenValue >= maxValue) { // don't go over max
        let toRemove = exprPossible.indexOf("+");
        exprPossible.splice(toRemove, 1);
        console.log("filter +:" + givenValue);
    }
    if (givenValue * 2 > maxValue || givenValue <= 1) { // shouldn't be larger than half of max (to make it interesting/harder)
        let toRemove = exprPossible.indexOf("*");
        exprPossible.splice(toRemove, 1);
        console.log("filter " + givenValue + "*2: " + (givenValue * 2));
    }
    if (givenValue <= 0) { // don't go below 0
        let toRemove = exprPossible.indexOf("-");
        exprPossible.splice(toRemove, 1);
        console.log("filter -:" + givenValue);
    }
    if (isPrime(givenValue) || givenValue == 0) { // don't divide prime numbers; will still result in decimals but reduce weird difficult values
        let toRemove = exprPossible.indexOf("/");
        exprPossible.splice(toRemove, 1);
        console.log("filter /:" + givenValue);
    }

    if (exprPossible.length == 0) {
        //exprPossible.push("+")
        // TODO: will have to test more whether it will ever hits 0 length
    }
    return exprPossible;
}


/**
 * Return true if a prime number that's larger than 1, else false
 *
 * @param value
 * @returns {boolean}
 */
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}


/**
 * Loop through iterations and create an object with a list of puzzle elements and the value given to the user
 *
 * @param exprTimes - how many iterations should the program run through
 * @param targetValue - the damage that user will try to get
 * @param maxValue - the maximum value pre-determined by the difficulty
 * @returns {string[]}
 */
function generateExpression(exprTimes:number, targetValue:number, maxValue:number) {
    let result = {
        expr: [],
        givenValue: 0,
        targetValue: targetValue
    };
    let givenValue = targetValue; // starts out equal to the damage
    let modifier; // current modifier number to be added in the list
    let limit; // max limit of modifier

    for (let i = 0; i < exprTimes; i++) {
        console.log("_____________________________");
        // filter only allowed expressions
        let exprPossible:string[] = filterAllowedOperators(givenValue, maxValue);
        console.log("current value: " + givenValue + "\npossible: " + exprPossible);

        let randomIndex = getRandomInclusive(0, exprPossible.length - 1);
        switch (exprPossible[randomIndex]) {
            case "+":
                limit = maxValue - givenValue;
                modifier = getRandomInclusive(0, limit);

                givenValue = givenValue + modifier;
                console.log("adding.......................: + " + modifier + " = " + givenValue);
                result.expr.push(modifier.toString(), "-");
                break;
            case "*":
                limit = Math.floor(maxValue / givenValue);
                modifier = getRandomInclusive(1, limit);

                givenValue = givenValue * modifier;
                console.log("multiply.....................: * " + modifier + " = " + givenValue);
                result.expr.push(modifier.toString(), "/");
                break;
            case "-":
                modifier = getRandomInclusive(0, givenValue);

                givenValue = givenValue - modifier;
                console.log("subtract.....................: - " + modifier + " = " + givenValue);
                result.expr.push(modifier.toString(), "+");
                break;
            case "/":
                modifier = getRandomInclusive(1, givenValue);

                givenValue = givenValue / modifier;
                console.log("divide.......................: / " + modifier + " = " + givenValue);
                result.expr.push(modifier.toString(), "*");
                break;
            default:
                console.log("ERROR: expression generation had some problems!");
                break;
        }
        console.log("list: " + result.expr.toString());
        console.log("given val: " + givenValue);
    }

    // finalize
    // TODO: truncate/toFix decimals to the thousandth (in front end)
    // TODO: randomize the expr list before returning
    result.expr.sort(function () {
        return .5 - Math.random();
    });
    result.givenValue = givenValue;

    return result;
}


export { quizRouter }
