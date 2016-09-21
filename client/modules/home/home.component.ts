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

    playing:boolean = false;

    constructor(private apiService:ApiService,
                private userService:UserService) {
        // see if there's a name saved in local storage, create new one if found none
        this.user = this.userService.getLocalUser();
        if (!this.isEmptyString(this.user.name)) {
            console.log("Welcome back!");
        }
    }

    updateUserName(name:string) {
        this.user.name = name;
        this.userService.updateLocalUser(this.user);
    }

    startGame(name:string) {
        this.updateUserName(name);
        this.playing = true;
        if (!this.isEmptyString(this.user.name) && this.user.name.length <= 14) {
            this.apiService
                .createUser(this.user.name)
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
        this.user = this.userService.getLocalUser();
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
