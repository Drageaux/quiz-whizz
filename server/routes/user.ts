import { Router, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";

const userRouter:Router = Router();

//
userRouter.post("/saveScore", function (request:Request, response:Response, next:NextFunction) {

    console.log("HELLO" + request.body);

    response.json(request.body);
});


export { userRouter }
