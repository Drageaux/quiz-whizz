import { Component, Output } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { EventEmitter } from "events";

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent {
    appName:string = "Quiz Whizz";
    userName:string = "";
    registered:boolean = false;

    playing:boolean = false;

    constructor(private apiService:ApiService) {
    }

    updateUserName(name:any) {
        this.userName = name;
    }

    startGame() {
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
