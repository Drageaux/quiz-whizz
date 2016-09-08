import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from "angular2-jwt";
import { Response } from "@angular/http";
import {Observable} from "rxjs/Observable";

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

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
