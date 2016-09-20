import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { LeaderboardComponent } from "./leaderboard.component";
import { routing } from "./leaderboard.routing";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        NgSemanticModule,
    ],
    declarations: [ LeaderboardComponent ],
    bootstrap:    [ LeaderboardComponent ]
})
export class LeaderboardModule { }