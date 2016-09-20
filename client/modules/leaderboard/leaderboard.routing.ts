import { Routes, RouterModule } from '@angular/router';

import { LeaderboardComponent } from "./leaderboard.component";

export const routes: Routes = [
    { path: 'leaderboard', component: LeaderboardComponent }
];

export const routing = RouterModule.forChild(routes);