import { Routes, RouterModule } from '@angular/router';

import { LeaderboardComponent } from "./leaderboard.component";
import { NavigateGuard } from "../../service/navigate-guard.service";

export const routes:Routes = [
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate: [NavigateGuard]
    }
];

export const routing = RouterModule.forChild(routes);