import { Component, OnInit, Output } from "@angular/core";
import { ApiService } from "../../service/api.service";

import { User } from "../../components/user/user";

@Component({
    selector: "leaderboard",
    templateUrl: `client/modules/leaderboard/leaderboard.component.html`
})
export class LeaderboardComponent implements OnInit {

    topUsers:User[] = [];

    constructor(private apiService:ApiService) {
    }

    ngOnInit(){
        this.getUsersByScore();
    }

    getUsersByScore() {
        this.apiService
            .getUsersByScore()
            .subscribe(
                (data) => {
                    this.topUsers = data;
                    console.log(data)
                },
                (error:Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }

    getUsersByLevel() {

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
