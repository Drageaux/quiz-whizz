import { Component, Input } from "@angular/core";
import {ApiService} from "../../service/api.service";
import "gsap";

@Component({
    selector: "quiz",
    templateUrl: "client/components/quiz/quiz.component.html"
})
export class QuizComponent implements OnInit {
    @Input() name:string;
    currentLevel:number = 4;
    score:number = 0;
    quiz:any = {};
    buttonWidth:number = 1; // for uniformity
    currAvailInput:any[] = []; // array list model bound to available choices of symbols
    currUserInput:any[] = []; // stack list model bound to symbols the user selected
    inputIndex:number = 0;

    // each monster will have their own timeline,
    // so that the user cannot interfere with the monster reaching their goal
    monsterExample:any = {
        id: 0,
        question: "What's the common name for 'feline?'",
        answer: "cat",
        animationTimeline: new TimelineMax()
    };

    constructor(private apiService:ApiService) {
    }

    ngOnInit() {
        this.makeQuiz();
        // TODO: create array of available buttons
        // TODO: create array of selected buttons

    }

    /***************
     * INTERACTIVE *
     ***************/
    keyPress(event:any) {
        if (event.keyCode == 13) { // pressed Enter/Submit
            if (this.checkSolution()) {
                // TODO: this.destroyMonster(this.monsterExample); // animation
                this.currentLevel += this.quiz.targetValue; // increase difficulty
                this.makeQuiz(); // return another quiz
            }
        }
        // TODO: navigate between different quizzes
    }

    selectAnswer(index:number){
        this.currUserInput[this.inputIndex].value = this.currAvailInput[index].value;
        this.currAvailInput[index].disabled = true;
        this.inputIndex++;
    }


    /**************
     * ANIMATIONS *
     **************/
    spawnMonster() {
        //let tl = this.monsterExample.animationTimeline;
        //tl.to("#monster-0", 10, {left: "100%", ease: Power0.easeNone, onComplete: this.gameOver});
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
        // TODO: popup a nag button or modal to let user replay/go to leaderboard
    }


    /************************
     * END-TO-END FUNCTIONS *
     ************************/
    makeQuiz() {
        this.apiService
            .makeQuiz(this.currentLevel)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.quiz = data;

                    this.currAvailInput = [];
                    this.currUserInput = [];
                    this.inputIndex = 0;
                    let maxSymbolWidth = 1;
                    for (let i = 0; i < this.quiz.expr.length; i++) {
                        // to display a uniform width
                        if (this.quiz.expr[i].length > maxSymbolWidth){
                            maxSymbolWidth = this.quiz.expr[i].length;
                            console.log(this.quiz.expr[i].length);
                        }
                        // for the binding models
                        this.currAvailInput[i] = {
                            value: this.quiz.expr[i],
                            disabled: false
                        };
                        this.currUserInput[i] = { value: "" };
                    }
                    this.buttonWidth = 50 + maxSymbolWidth * 8;
                },
                (error:Error) => {
                    let error = error.message;
                    setTimeout(() => error = null, 4000)
                });
    }

    checkSolution() {
        // TODO: send request to Mathjs to check solution
    }

    /***********
     * HELPERS *
     ***********/
    isEmptyString(text:string) {
        if (text == " " || text == "" || text == null){
            return true;
        }
        return false;
    }
}
