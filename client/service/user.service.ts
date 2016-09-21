import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs/Observable";

import { User } from "../components/user/user";

@Injectable()
export class UserService {

    constructor(private authHttp:AuthHttp,
                private http:Http) {
    }

    getLocalUser() {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            return user;
        } else {
            return {
                "name": "",
                "registered": false
            };
        }
    }

    updateLocalUser(user:User) {
        localStorage.setItem("user", JSON.stringify(user));
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
