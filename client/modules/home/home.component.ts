import { Component, Input, Output } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { EventEmitter } from "events";
import { User } from "../../components/user/user";
import { UserService } from "../../service/user.service";

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent {
    user:any;
    appName:string = "Quiz Whizz";
    userName:string = "";
    registered:boolean = false;

    playing:boolean = false;

    constructor(private apiService:ApiService,
                private userService:UserService) {
        // see if there's a name saved in local storage, create new one if found none
        this.user = this.userService.getLocalUser();
        if (this.user == null || this.isEmptyString(this.user.name)) {
            this.user = {
                "name": "",
                "registered": false
            };
            this.userService.updateLocalUser(this.user);
        } else {
            console.log("Welcome back!");
            this.userName = this.user.name;
        }
    }

    updateUserName(name:string) {
        this.userName = name;
        this.user.name = this.userName;
        this.userService.updateLocalUser(this.user);
    }

    startGame(name:string) {
        this.updateUserName(name);
        this.playing = true;
        if (!this.isEmptyString(this.userName) && this.userName.length <= 14) {
            this.apiService
                .createUser(this.userName)
                .subscribe(
                    (data) => {
                        console.log(data)
                    },
                    (error:Error) => {
                        this.error = error.message;
                        setTimeout(() => this.error = null, 4000)
                    });
        }
    }

    onBackToMenu(event:any) {
        this.playing = event;
    }

    /***********
     * HELPERS *
     ***********/
    isEmptyString(text:string) {
        if (text == " " || text == "" || text == null) {
            return true;
        }
        return false;
    }
}
