"use strict";
var express_1 = require("express");
var http = require("http");
var quizRouter = express_1.Router();
exports.quizRouter = quizRouter;
// get quiz question
quizRouter.post("/", function (request, response, next) {
    var level = request.body.currentLevel; // current difficulty level
    var maxValue = Math.pow(10, 1 + 0.1 * level); // max damage user can do
    // damage = random number between 1 and the max value
    var targetValue = getRandomInclusive(1, maxValue);
    console.log("target val: " + targetValue);
    // generate expressions and modifiers
    var exprTimes = 2;
    var quiz = generateExpression(exprTimes, targetValue, maxValue);
    console.log("list: " + quiz.expr.toString());
    response.json(quiz);
});
// evaluate and return the result & whether answer is correct or not
quizRouter.post("/check", function (request, response, next) {
    var expr = request.body.expr;
    expr = encodeURIComponent(expr);
    console.log(expr);
    http.get("http://api.mathjs.org/v1/?expr=" + expr, function (res) {
        console.log("STATUS: " + res.statusCode);
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk.toString("utf8"));
            response.json({
                result: chunk.toString("utf8")
            });
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
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
function getRandomInclusive(min, max) {
    if (min > max) {
        var temp = max;
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
function filterAllowedOperators(givenValue, maxValue) {
    var exprPossible = ["+", "*", "-", "/"];
    if (givenValue >= maxValue) {
        var toRemove = exprPossible.indexOf("+");
        exprPossible.splice(toRemove, 1);
        console.log("filter +:" + givenValue);
    }
    if (givenValue * 2 > maxValue || givenValue <= 1) {
        var toRemove = exprPossible.indexOf("*");
        exprPossible.splice(toRemove, 1);
        console.log("filter " + givenValue + "*2: " + (givenValue * 2));
    }
    if (givenValue <= 0) {
        var toRemove = exprPossible.indexOf("-");
        exprPossible.splice(toRemove, 1);
        console.log("filter -:" + givenValue);
    }
    if (isPrime(givenValue) || givenValue == 0) {
        var toRemove = exprPossible.indexOf("/");
        exprPossible.splice(toRemove, 1);
        console.log("filter /:" + givenValue);
    }
    if (exprPossible.length == 0) {
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
function generateExpression(exprTimes, targetValue, maxValue) {
    var result = {
        expr: [],
        givenValue: 0,
        targetValue: targetValue
    };
    var givenValue = targetValue; // starts out equal to the damage
    var modifier; // current modifier number to be added in the list
    var limit; // max limit of modifier
    for (var i = 0; i < exprTimes; i++) {
        console.log("_____________________________");
        // filter only allowed expressions
        var exprPossible = filterAllowedOperators(givenValue, maxValue);
        console.log("current value: " + givenValue + "\npossible: " + exprPossible);
        var randomIndex = getRandomInclusive(0, exprPossible.length - 1);
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
                while (givenValue % modifier != 0) {
                    modifier = getRandomInclusive(1, givenValue);
                }
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
    result.expr.sort(function () {
        return .5 - Math.random();
    });
    result.givenValue = givenValue;
    return result;
}
//# sourceMappingURL=quiz.js.map