/// <reference path="../typings/index.d.ts" />
import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
let mongoose = require("mongoose");
//require('dotenv').config();

import { protectedRouter } from "./routes/protected";
import { loginRouter } from "./routes/login";
import { quizRouter } from "./routes/quiz";
import { userRouter } from "./routes/user";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/quiz-whizz");

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter); // user api
app.use("/quiz", quizRouter); // quiz api

app.use('/client', express.static(join(__dirname, '../client')));
app.use('/node_modules', express.static(join(__dirname, '../node_modules')));


// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
