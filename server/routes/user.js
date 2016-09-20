var express_1 = require("express");
var userRouter = express_1.Router();
exports.userRouter = userRouter;
var User = require("../models/user.js");
// create new unique-name user, but it is still unclaimed
userRouter.post("/", function (request, response, next) {
    var userName = request.body.userName.trim();
    User.findOne({ "name": userName }, function (err, user) {
        if (user) {
            // this username has been used before
            if (user.registered) {
                // if it's been claimed already
                console.log("ERR: username is taken");
                response.json({ message: "Username is already taken" });
            }
            else {
                response.json({ message: "Username is available for claim" });
            }
        }
        else {
            // this username has not been added
            var newUser = new User();
            newUser.name = userName;
            newUser.registered = false;
            newUser.highScore = 0;
            newUser.highLevel = 0;
            newUser.save(function (err, newUser) {
                if (err) {
                    console.error(err.stack);
                }
                console.log("NEW USER: " + newUser.name);
                response.json(newUser);
            });
        }
    });
});
// clear the account's record and mark username as registered
userRouter.post("/register", function (request, response, next) {
    var userName = request.body.userName.trim();
    User.findOne({ "name": userName }, function (err, user) {
        if (user) {
            if (user.registered) {
                // if it's been claimed already
                console.log("ERR: username is taken");
                response.json({ message: "Username is already taken" });
            }
            else {
                user.registered = true;
                user.highScore = 0;
                user.highLevel = 0;
                user.save(function (err, user) {
                    if (err) {
                        console.error(err.stack);
                    }
                    response.json(user);
                });
            }
        }
        else {
            var newUser = new User();
            newUser.name = userName;
            newUser.registered = true;
            newUser.highScore = 0;
            newUser.highLevel = 0;
            newUser.save(function (err, newUser) {
                if (err) {
                    console.error(err.stack);
                }
                console.log("NEW USER: " + newUser.name);
                response.json(newUser);
            });
        }
    });
});
// save if request & account registered status are the same
userRouter.post("/saveScore", function (request, response, next) {
    User.findOne({ "name": request.body.userName }, function (err, user) {
        if (user && user.registered == request.body.registered) {
            user.highScore = user.highScore > request.body.score ? user.highScore : request.body.score;
            user.highLevel = user.highLevel > request.body.level ? user.highLevel : request.body.level;
            user.save(function (err, user) {
                if (err) {
                    console.error(err.stack);
                }
                response.json(user);
            });
        }
        else {
            response.json({ message: "ERROR" });
        }
    });
});
// sort and get users by criteria
userRouter.get("/list/score", function (request, response, next) {
    User.find({}).sort({ score: -1 }).limit(510).exec(function (err, users) {
        if (err) {
            console.error(err.stack);
        }
        response.json(users);
    });
});
//# sourceMappingURL=user.js.map