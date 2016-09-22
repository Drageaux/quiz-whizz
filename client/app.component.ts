import { Component, ViewChild, ElementRef } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { SemanticPopupComponent } from "ng-semantic";

@Component({
    selector: "app",
    template: `
    <nav class="ui menu inverted huge" *ngIf="!isPlaying()">
        <a routerLink="home" routerLinkActive="active" class="item">Home</a>
        <a routerLink="leaderboard" routerLinkActive="active" class="item">Leaderboard</a>
        <!--<a routerLink="contact" class="item">Contact Me</a>-->

        <!--<nav class="menu right">-->
            <!--<a (click)="myPopup.show($event, {position: 'right center'})" *ngIf="!isLogged" class="item">Login</a>-->
            <!--<a (click)="logout()" *ngIf="isLogged" class="item inverted red">Logout</a>-->
        <!--</nav>-->
    </nav>

    <router-outlet></router-outlet>
    `
})
export class AppComponent {
    response:Response;
    isLogged:boolean;
    @ViewChild("myPopup") myPopup:SemanticPopupComponent;

    constructor(private http:Http) {
        this.isLogged = !!localStorage.getItem("id_token");
    }

    ngOnInit(){
        localStorage.setItem("playing", "false");
    }

    isPlaying() {
        return localStorage.getItem("playing") == "true";
    }

    //signup() {
    //    this.http.post("/login/signup", JSON.stringify({
    //            password: this.user.password,
    //            username: this.user.username
    //        }), new RequestOptions({
    //            headers: new Headers({"Content-Type": "application/json"})
    //        }))
    //        .map((res:any) => res.json())
    //        .subscribe(
    //            (res:Response) => {
    //                this.response = res;
    //            },
    //            (error:Error) => {
    //                console.log(error);
    //            }
    //        );
    //}
    //
    //login() {
    //    this.http.post("/login", JSON.stringify({password: this.user.password}), new RequestOptions({
    //            headers: new Headers({"Content-Type": "application/json"})
    //        }))
    //        .map((res:Response) => res.json())
    //        .subscribe(
    //            (res:Response & { jwt: string }) => {
    //                localStorage.setItem("id_token", res.jwt);
    //                this.myPopup.hide();
    //                location.reload();
    //            },
    //            (error:Error) => {
    //                console.log(error);
    //            }
    //        );
    //}
    //
    //logout():void {
    //    localStorage.removeItem("id_token");
    //    location.reload();
    //}
}