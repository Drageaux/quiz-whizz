import {Component, OnInit, Output} from "@angular/core";
import {ApiService} from "../../service/api.service";

import {User} from "../../components/user/user";

@Component({
    selector: "leaderboard",
    templateUrl: `client/modules/leaderboard/leaderboard.component.html`
})
export class LeaderboardComponent implements OnInit {
    topUsers: User[] = [];
    criteria: string = "";
    error: any;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.getUsersBy("score");
    }

    getUsersBy(criteria: string) {
        if (this.criteria !== criteria) {
            this.criteria = criteria;
            this.apiService
                .getUsersBy(criteria)
                .subscribe(
                    (data) => {
                        this.topUsers = data;
                        console.log(data)
                    },
                    (error: Error) => {
                        this.error = error.message;
                        setTimeout(() => this.error = null, 4000)
                    });
        }
    }


    /***********
     * HELPERS *
     ***********/
    isEmptyString(text: string) {
        if (text == " " || text == "" || text == null) {
            return true;
        }
        return false;
    }
}
