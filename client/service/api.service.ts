import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs/Observable";

import { Quiz } from "../components/quiz/quiz";
import { User } from "../components/user/user";

@Injectable()
export class ApiService {

    constructor(private authHttp:AuthHttp,
                private http:Http) {
    }

    /********
     * USER *
     ********/
    createUser(userName:string) {
        let body = {userName: userName};
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/user", body, options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    register(userName:string, email:string) {
        let body = {userName: userName, email: email};
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/user/register", body, options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    logHighScore(userName:string, score:number, level:number, registered:boolean) {
        let body = {
            userName: userName,
            score: score,
            level: level,
            registered: registered
        };
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/user/saveScore", body, options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    /***************
     * LEADERBOARD *
     ***************/
    getUsersByScore() {
        return this
            .http
            .get("/user/list/score")
            .map((res) => <User[]> res.json())
            .catch(this.handleError);
    }

    /********
     * QUIZ *
     ********/
    makeQuiz(level:number) {
        let body = {currentLevel: level};
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/quiz", body, options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    checkSolution(expr:string) {
        let body = {expr: expr};
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/quiz/check", body, options)
            .map((res) => <Quiz> res.json())
            .catch(this.handleError);
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
