import { Component, Output } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { EventEmitter } from "events";

import {User} from "../../components/user/user";

@Component({
    selector: "leaderboard",
    templateUrl: `client/modules/leaderboard/leaderboard.component.html`
})
export class LeaderboardComponent {

    topUsers:User[] = [];

    constructor(private apiService:ApiService) {
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
