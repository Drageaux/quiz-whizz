import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs/Observable";

import { Quiz } from "../components/quiz/quiz";

@Injectable()
export class ApiService {

    constructor(private authHttp:AuthHttp,
                private http:Http) {
    }

    get(url:string) {
        return this
            .authHttp
            .get(url)
            .map((response:Response) => response.json());
    }

    /********
     * USER *
     ********/
    createUser() {
        //return this.http.post
    }

    logHighScore(userName:string, score:number, level:number) {
        let body = {
            userName: userName,
            score: score,
            level: level
        };
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .post("/user/saveScore", body, options)
            .map((res:Response) => res.json())
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
