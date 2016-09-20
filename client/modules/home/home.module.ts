import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { QuizComponent } from "../../components/quiz/quiz.component";
import { routing } from "./home.routing";
import { SharedModule } from "../shared/shared.module";
import { RoundPipe } from "../../pipes/round.pipe";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule,
    ],
    declarations: [ HomeComponent, QuizComponent, RoundPipe ],
    bootstrap:    [ HomeComponent ]
})
export class HomeModule { }