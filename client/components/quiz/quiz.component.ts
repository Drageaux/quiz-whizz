import { Component, Input } from "@angular/core";
import "gsap";

@Component({
    selector: "quiz",
    templateUrl: "client/components/quiz/quiz.component.html"
})
export class QuizComponent implements OnInit {
    @Input() name:string;
    score:number = 0;
    quizMonster:string[] = [];
    quizQuestions:string[] = [];
    quizAnswers:string[] = [];
    currentQuizId:number = 0;
    currentQuestion:string = "";

    ngOnInit() {
        let tl = new TimelineMax();
        tl.set("#monster-0", {y: 100});
        this.quizQuestions.push("What's the common name for 'feline?'");
        this.quizAnswers.push("cat");
        this.currentQuestion = this.quizQuestions[this.currentQuizId];
    }

    keyPress(event:any) {
        if (event.keyCode == 13) {
            if (event.target.value.toLowerCase() == this.quizAnswers[0]) {
                this.destroyMonster(this.currentQuizId);
            } else {
                this.score--;
            }
        } else if (event.keyCode == 38) {

        }
    }

    destroyMonster(id:number){
        $("#monster-"+id).css("display", "none");
        this.score++;
        // TODO: clear form and question
    }
}
