import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {ApiService} from "../../service/api.service";
import {Observable} from "rxjs/Rx";
import {Quiz} from "./quiz";
import {Message} from "../message/message";
import {UserService} from "../../service/user.service";

declare var $;
declare var TimelineMax;
declare var Bounce;
declare var Power1;
declare var Power2;
declare var Power3;

@Component({
    selector: "quiz",
    templateUrl: "client/components/quiz/quiz.component.html"
})
export class QuizComponent implements OnInit {
    // essential
    @Input() name: string;
    @Output() onBackToMenu = new EventEmitter<boolean>(); // emits event to parent component
    user: any;
    diffLevel: number; // difficulty
    score: number;
    health: number; // chances left
    buttonWidth: number = 1; // for uniformity
    consoleLog: any[];
    error: any;
    // quiz-related
    quiz: Quiz = new Quiz([], "", "", 0);
    currAvailInput: any[]; // array list model bound to available choices of symbols
    currUserInput: any[]; // stack list model bound to symbols the user selected
    inputIndex: number; // basically the length of the answer list
    exprString: string;
    // power-ups
    boosterPower: number;
    boosterToggle: boolean; // true = next question will be harder
    boosterActive: boolean; // true = current question is harder
    // timer
    time: number;
    timer: any;
    timePercent: number;
    paused: boolean = true;

    // each monster will have their own timeline,
    // so that the user cannot interfere with the monster reaching their goal
    monsterExample: any = {
        id: 0,
        question: "What's the common name for 'feline?'",
        answer: "cat",
        animationTimeline: new TimelineMax()
    };

    constructor(private apiService: ApiService,
                private userService: UserService) {
        this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
        this.diffLevel = 1;
        this.score = 0;
        this.health = 5;
        this.consoleLog = [];
        this.currAvailInput = [];
        this.currUserInput = [];
        this.inputIndex = 0;
        this.exprString = "";

        this.boosterPower = 3;
        this.boosterToggle = false;
        this.boosterActive = false;

        this.makeQuiz();
        $("#timer").progress({
            duration: 60,
            total: 60
        });
        this.time = 60000;
        this.timePercent = this.time / 60000 * 100;
        this.resume();
    }

    /***************
     * INTERACTIVE *
     ***************/
    keyPress(event: any) {
        if (event.keyCode == 13) { // pressed Enter/Submit
            if (this.checkSolution()) {
                // TODO: this.destroyMonster(this.monsterExample); // animation
                this.makeQuiz(); // return another quiz
            }
        }
        // TODO: navigate between different quizzes
    }

    selectAnswer(index: number) {
        if (!this.currAvailInput[index].disabled) {
            let value = this.currAvailInput[index].value;
            this.currUserInput[this.inputIndex].value = value; // move
            this.currUserInput[this.inputIndex].originIndex = index; // remember the index for removal

            this.currAvailInput[index].disabled = true; // disable original button
            this.currAvailInput[index].location = this.inputIndex; // remember the location to cancel selection
            this.inputIndex++;
            this.compileExpressionString();

            // when all answers selected
            if (this.inputIndex == 4) {
                this.checkSolution();
            }
        } else {
            let location = this.currAvailInput[index].location;
            this.removeAnswer(location);
        }
    }

    removeAnswer(index: number) {
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
        clearInterval(this.timer);
        if (!this.isEmptyString(this.user.name)) { this.logHighScore(this.user.name); }
        this.health = 0;
        $("#game-over")
            .modal('setting', 'closable', false)
            .modal("show");
    }

    logHighScore(name: string) {
        if (!this.isEmptyString(name) && name.length <= 14) {
            this.user.name = name;
            this.userService.updateLocalUser(this.user);
            this.apiService
                .createUser(this.user.name)
                .subscribe(
                    (data) => {
                        this.user = data;
                        this.userService.updateLocalUser(this.user);
                        if (!this.isEmptyString(this.user.name) && this.user.name.length <= 14) {
                            this.apiService
                                .logHighScore(this.user.name, this.score, this.diffLevel, this.user.registered)
                                .subscribe((data) => console.log(data));
                        }
                    },
                    (error: Error) => {
                        this.error = error.message;
                        setTimeout(() => this.error = null, 4000)
                    });
        }
    }

    resume() {
        clearInterval(this.timer);
        this.timer = self.setInterval(() => {
            if (this.time > 0) {
                this.time -= 100;
            } else {
                this.gameOver();
            }
            this.timePercent = this.time / 60000 * 100;
            $("#timer").progress("set percent", this.timePercent);
        }, 100);
    }

    quitGame() {
        clearInterval(this.timer);
        $("#confirm-quit").modal("show");
    }

    restart() {
        this.ngOnInit();
        $("#game-over").modal("hide");
    }

    backToMenu(event: any) {
        this.onBackToMenu.emit(false);
        $("#game-over").modal("hide");
        $("body > .dimmer.modals.page").remove(); // this would stack extra dimmer layers otherwise
    }


    /*************
     * POWER UPS *
     *************/
    ultimateBooster() {
        this.boosterToggle = !this.boosterToggle;
        let message = new Message("", "", "");
        message.header = this.boosterToggle ?
            "Booster ACTIVATED!" :
            "Booster deactivated.";
        message.value = this.boosterToggle ?
            "The next questions will earn you 2x points" :
            "You will no longer earn 2x points";
        message.type = "warning";
        this.consoleLog.push(message);
        setTimeout(
            () => $("#console").scrollTop($("#console")[0].scrollHeight),
            100
        );
    }

    refillPowerUps() {
        if (this.diffLevel % 7 == 0 && this.health < 5) { this.health++; }
        if (this.diffLevel % 5 == 0 && this.boosterPower < 3) { this.boosterPower++; }
    }


    /**************
     * ANIMATIONS *
     **************/
    spawnMonster() {
        //let tl = this.monsterExample.animationTimeline;
        //tl.to("#monster-0", 10, {left: "100%", ease: Power0.easeNone, onComplete: this.gameOver});
    }

    destroyMonster(monster: any) {
        // this.score++;
        // let tl = monster.animationTimeline;
        //
        // let monsterObjectId = "#monster-0";
        // tl.kill(null, monsterObjectId)
        //     .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
        //     .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
        //     .to(monsterObjectId, 0.3, {autoAlpha: 0, ease: Power1.easeIn}, "-=0.2");

        // TODO: clear form and question
    }

    correctAnswer() {
        if (this.health > 0) {
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

            let extraTime = this.diffLevel > 10 ? 10000 : this.diffLevel * 1000;
            this.time = (this.time + extraTime) < 60000
                ? this.time + extraTime : 60000;
            this.score += this.quiz.score;
            this.refillPowerUps();
            this.diffLevel++;

            // wait after the animation; seems like the best way right now
            let timer = Observable.timer(1000);
            timer.subscribe(t => this.makeQuiz());
        }
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
                .makeQuiz(this.diffLevel, this.boosterToggle)
                .subscribe(
                    (data) => {
                        console.log(data);
                        this.quiz = data;
                        this.boosterActive = this.boosterToggle;

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
                            if (i < 4) {
                                this.currUserInput[i] = {
                                    value: "",
                                    originIndex: null
                                };
                            }
                            this.exprString = this.quiz.givenValue;
                        }
                        this.buttonWidth = 50 + maxSymbolWidth * 8;
                    });
        }
    }

    checkSolution() {
        clearInterval(this.timer);
        this.apiService
            .checkSolution(this.exprString)
            .subscribe(
                (data) => {
                    this.resume();
                    console.log(data);
                    let mess = new Message("", "", "");
                    if (data.result == this.quiz.targetValue) {
                        mess.header = "Nice!";
                        mess.value = "Your answer was correct";
                        mess.type = "positive";
                        this.correctAnswer();
                    } else if (Number.isInteger(Number(data.result))) {
                        mess.header = "Wrong answer.";
                        mess.value = "Your answer value was " + data.result;
                        mess.type = "negative";
                        this.wrongAnswer();
                    } else {
                        mess.header = "Wrong answer.";
                        mess.value = "Your syntax was wrong";
                        mess.type = "negative";
                        this.wrongAnswer();
                    }
                    this.consoleLog.push(mess);
                    setTimeout(
                        () => $("#console").scrollTop($("#console")[0].scrollHeight),
                        100
                    );
                }
            );
    }

    /***********
     * HELPERS *
     ***********/
    isEmptyString(text: string) {
        text = text.trim();
        if (text == "" || text == null) {
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
