import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs/Rx";
import "gsap";

@Component({
    selector: "quiz",
    templateUrl: "client/components/quiz/quiz.component.html"
})
export class QuizComponent implements OnInit {
    // essential
    @Input() name:string;
    @Output() onBackToMenu = new EventEmitter<boolean>(); // emits event to parent component
    diffLevel:number = 1; // difficulty
    score:number = 0;
    health:number = 3; // chances left
    buttonWidth:number = 1; // for uniformity
    errorMessage:string = "";
    // quiz-related
    quiz:any = {};
    currAvailInput:any[] = []; // array list model bound to available choices of symbols
    currUserInput:any[] = []; // stack list model bound to symbols the user selected
    inputIndex:number = 0; // basically the length of the answer list
    exprString = "";
    // power-ups
    skipPower:number = 3;


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
    }

    /***************
     * INTERACTIVE *
     ***************/
    howToPlay() {
        $("#how-to-modal").modal("show");
    }

    keyPress(event:any) {
        if (event.keyCode == 13) { // pressed Enter/Submit
            if (this.checkSolution()) {
                // TODO: this.destroyMonster(this.monsterExample); // animation
                this.diffLevel += this.quiz.targetValue; // increase difficulty
                this.makeQuiz(); // return another quiz
            }
        }
        // TODO: navigate between different quizzes
    }

    selectAnswer(index:number) {
        if (!this.currAvailInput[index].disabled) {
            let value = this.currAvailInput[index].value;
            this.currUserInput[this.inputIndex].value = value; // move
            this.currUserInput[this.inputIndex].originIndex = index; // remember the index for removal

            this.currAvailInput[index].disabled = true; // disable original button
            this.currAvailInput[index].location = this.inputIndex; // remember the location to cancel selection
            this.inputIndex++;
            this.compileExpressionString();

            // when all answers selected
            if (this.inputIndex == this.currAvailInput.length) {
                this.checkSolution();
            }
        } else {
            let location = this.currAvailInput[index].location;
            this.removeAnswer(location);
        }
    }

    removeAnswer(index:number) {
        let answer = this.currUserInput[index];
        this.currAvailInput[answer.originIndex].disabled = false; // re-enable the original button

        // remove just the 1 selected answer
        this.currUserInput.splice(index, 1);
        this.currUserInput.push({
            value: "",
            originIndex: null
        });
        this.inputIndex--;
        this.compileExpressionString();
    }

    gameOver() {
        $("#game-over")
            .modal("show");
    }

    quitGame() {
        $("#confirm-quit")
            .modal("show");
    }

    restart() {
        this.score = 0;
        this.health = 3;
        this.diffLevel = 1;
        this.errorMessage = "";
        this.currAvailInput = [];
        this.currUserInput = [];
        this.inputIndex = 0;
        this.exprString = "";

        this.skipPower = 3;
        this.makeQuiz();
        $("#game-over").modal("hide");
    }

    backToMenu(event:any) {
        this.onBackToMenu.emit(false);
        $("#game-over").modal("hide");
        $("body > .dimmer.modals.page").remove(); // this would stack extra dimmer layers otherwise
    }

    /*************
     * POWER UPS *
     *************/
    skipQuestion() {
        if (this.skipPower > 0) {
            this.skipPower--;
            this.makeQuiz();
        }
    }

    refillPowerUps() {
        if (this.diffLevel % 7 == 0 && this.health < 3) { this.health++; }
        if (this.diffLevel % 5 == 0 && this.skipPower < 3) { this.skipPower++; }
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
            .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
            .to(monsterObjectId, 0.3, {autoAlpha: 0, ease: Power1.easeIn}, "-=0.2");

        // TODO: clear form and question
    }

    correctAnswer() {
        let timeline = new TimelineMax();
        let answerItems = $("#input-area ul li");
        let earnedScore = $("#hud .add-score");
        timeline
            .to(answerItems, 0.1, {
                backgroundColor: "#21BA45",
                ease: Power1.easeOut
            })
            .to(answerItems, 0.5, {
                autoAlpha: 0,
                y: -50,
                ease: Power1.easeOut
            }, "+=0.2");
        timeline
            .set(earnedScore, {x: 3, y: 0, autoAlpha: 1}, 0)
            .to(earnedScore, 0.7, {autoAlpha: 0, y: -20}, 0.3);
        this.score += this.quiz.targetValue;
        this.refillPowerUps();
        this.diffLevel++;

        // wait after the animation; seems like the best way right now
        let timer = Observable.timer(1000);
        timer.subscribe(t => this.makeQuiz());
    }

    wrongAnswer() {
        let timeline = new TimelineMax();
        let answerItems = $("#input-area ul li");
        timeline
            .set(answerItems, {backgroundColor: "#DB2828"})
            .from(answerItems, 0.3, {x: 10, ease: Bounce.easeOut})
            .set(answerItems, {x: 0})
            .to(answerItems, 1, {backgroundColor: "#2185D0"}, "+=0.6");
        this.health--;

        // game over
        if (this.health == 0) {
            this.gameOver();
        }
    }


    /************************
     * END-TO-END FUNCTIONS *
     ************************/
    makeQuiz() {
        if (this.health > 0) {
            this.apiService
                .makeQuiz(this.diffLevel)
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
                            if (this.quiz.expr[i].length > maxSymbolWidth) {
                                maxSymbolWidth = this.quiz.expr[i].length;
                            }
                            // for the binding models
                            this.currAvailInput[i] = {
                                value: this.quiz.expr[i],
                                disabled: false,
                                location: null
                            };
                            this.currUserInput[i] = {
                                value: "",
                                originIndex: null
                            };
                            this.exprString = this.quiz.givenValue;
                        }
                        this.buttonWidth = 50 + maxSymbolWidth * 8;
                    });
        }
    }

    checkSolution() {
        // TODO: send request to Mathjs to check solution
        this.apiService
            .checkSolution(this.exprString)
            .subscribe(
                (data) => {
                    console.log(data);
                    if (data.result == this.quiz.targetValue) {
                        this.errorMessage = "";
                        this.correctAnswer();
                    } else if (Number.isInteger(Number(data.result))) {
                        this.errorMessage = "The result of your answer was " + data.result;
                        this.wrongAnswer();
                    } else {
                        this.errorMessage = "Please check your expression syntax";
                        this.wrongAnswer();
                    }
                }
            );
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

    compileExpressionString() {
        this.exprString = this.quiz.givenValue;

        for (let i = 0; i < this.currUserInput.length; i++) {
            let value = this.currUserInput[i].value;
            // manipulate expression sent to the server
            if (!this.isEmptyString(value)) {
                if (Number.isInteger(Number(value))) {
                    console.log(value);
                    this.exprString = "(" + this.exprString + value + ")";
                } else {
                    // if operators and numbers are out of order, the syntax will be wrong;
                    // this takes care of misuse/abuse case of mixing up string orders
                    this.exprString += value;
                }
            }
        }
    }
}
