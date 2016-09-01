import { Component, Input } from "@angular/core";
import "gsap";

@Component({
    selector: "quiz",
    templateUrl: "client/components/quiz/quiz.component.html"
})
export class QuizComponent implements OnInit {
    @Input() name:string;
    // each monster will have their own timeline,
    // so that the user cannot interfere with the monster reaching their goal
    monsterExample:any = {
        id: 0,
        question: "What's the common name for 'feline?'",
        answer: "cat",
        animationTimeline: new TimelineMax()
    };
    score:number = 0;
    quizMonsters:any[] = [
        {
            id: 0,
            question: "What's the common name for 'feline?'",
            answer: "cat",
            animationTimeline: new TimelineMax()
        },
        {
            id: 1,
            question: "What's 72 times 11? (enter a number)",
            answer: "792",
            animationTimeline: new TimelineMax()
        },
        {
            id: 2,
            question: "Fill in the blank: OH. MY. ._ _ _",
            answer: "792",
            animationTimeline: new TimelineMax()
        }
    ];
    quizQuestions:string[] = [];
    quizAnswers:string[] = [];
    currentQuizId:number = 0;
    currentQuestion:string = "";

    ngOnInit() {
        let tl = this.monsterExample.animationTimeline;
        tl.to("#monster-0", 10, {left: "100%", ease: Power0.easeNone, onComplete: this.gameOver});

        this.quizQuestions.push("What's the common name for 'feline?'");
        this.quizAnswers.push("cat");
        this.currentQuestion = this.quizQuestions[this.currentQuizId];
    }

    keyPress(event:any) {
        if (event.keyCode == 13) {
            if (event.target.value.toLowerCase() == this.quizAnswers[0]) {
                this.destroyMonster(this.monsterExample);
            } else {
                this.score--;
            }
        } else if (event.keyCode == 38) {

        }
    }

    spawnMonster() {

    }

    destroyMonster(monster:any) {
        this.score++;
        let tl = monster.animationTimeline;

        let monsterObjectId = "#monster-0";
        tl.kill(null, monsterObjectId)
            .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
            .to(monsterObjectId, 0.3, {autoAlpha: 0, ease: Power1.easeIn}, "-=0.2");

        // TODO: clear form and question
    }

    gameOver() {
        alert("GAME OVER!")
    }
}
