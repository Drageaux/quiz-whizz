import { Component, Output } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { EventEmitter } from "events";

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent {
    appName:string = "Quiz Whizz";
    userName:string = "test";
    error:string;
    response:{};
    playing:boolean = false;

    constructor(private apiService:ApiService) {
    }

    protected() {
        this.apiService
            .get("/api")
            .subscribe(
                (data) => {
                    this.response = data;
                },
                (error:Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }

    updateUserName(name:any){
        this.userName = name;
    }

    startGame() {
        this.playing = true;
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
