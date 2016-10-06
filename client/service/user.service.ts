import {Injectable} from "@angular/core";
import {tokenNotExpired, AuthHttp} from "angular2-jwt";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../components/user/user";
import {ApiService} from "./api.service";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class UserService {
    // Configure Auth0
    lock = new Auth0Lock('BQBgvwL4VhCBYG5UCWCoxwBG3drfBR1A', 'davefpg.auth0.com', {});

    constructor(private authHttp: AuthHttp,
                private http: Http,
                private apiService: ApiService) {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
            let localUser = this.getLocalUser();
            this.apiService.register(localUser.name, authResult.email)
                .subscribe(data => console.log(data));
        });
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

    updateLocalUser(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }


    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };


    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
