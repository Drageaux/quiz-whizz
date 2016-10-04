System.register(["@angular/core", "../../service/api.service", "rxjs/Rx", "./quiz", "../message/message", "../../service/user.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, api_service_1, Rx_1, quiz_1, message_1, user_service_1;
    var QuizComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (quiz_1_1) {
                quiz_1 = quiz_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            QuizComponent = (function () {
                function QuizComponent(apiService, userService) {
                    this.apiService = apiService;
                    this.userService = userService;
                    this.onBackToMenu = new core_1.EventEmitter(); // emits event to parent component
                    this.buttonWidth = 1; // for uniformity
                    // quiz-related
                    this.quiz = new quiz_1.Quiz([], "", "", 0);
                    // each monster will have their own timeline,
                    // so that the user cannot interfere with the monster reaching their goal
                    this.monsterExample = {
                        id: 0,
                        question: "What's the common name for 'feline?'",
                        answer: "cat",
                        animationTimeline: new TimelineMax()
                    };
                    this.user = this.userService.getLocalUser();
                }
                QuizComponent.prototype.ngOnInit = function () {
                    this.diffLevel = 1;
                    this.score = 0;
                    this.health = 5;
                    this.consoleLog = [];
                    this.currAvailInput = [];
                    this.currUserInput = [];
                    this.inputIndex = 0;
                    this.exprString = "";
                    this.boosterToggle = false;
                    this.boosterActive = false;
                    this.canAnswer = true;
                    this.makeQuiz();
                    $("#timer").progress({
                        duration: 60,
                        total: 60
                    });
                    this.time = 60000;
                    this.timePercent = this.time / 60000 * 100;
                    this.resume();
                };
                /***************
                 * INTERACTIVE *
                 ***************/
                QuizComponent.prototype.keyPress = function (event) {
                    if (event.keyCode == 13) {
                        if (this.checkSolution()) {
                            // TODO: this.destroyMonster(this.monsterExample); // animation
                            this.makeQuiz(); // return another quiz
                        }
                    }
                    // TODO: navigate between different quizzes
                };
                QuizComponent.prototype.selectAnswer = function (index) {
                    if (this.canAnswer) {
                        if (!this.currAvailInput[index].disabled) {
                            var value = this.currAvailInput[index].value;
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
                        }
                        else {
                            var location_1 = this.currAvailInput[index].location;
                            this.removeAnswer(location_1);
                        }
                    }
                };
                QuizComponent.prototype.removeAnswer = function (index) {
                    if (this.canAnswer) {
                        this.canAnswer = false; // disable spamming
                        var answer = this.currUserInput[index];
                        this.currAvailInput[answer.originIndex].disabled = false; // re-enable the original button
                        // remove just the 1 selected answer
                        this.currUserInput.splice(index, 1);
                        this.currUserInput.push({
                            value: "",
                            originIndex: null
                        });
                        // update available inputs' locations
                        for (var i = 0; i < this.currUserInput.length; i++) {
                            var userInput = this.currUserInput[i];
                            if (userInput.originIndex != null) {
                                this.currAvailInput[userInput.originIndex].location = i;
                            }
                        }
                        this.inputIndex--;
                        this.compileExpressionString();
                        this.canAnswer = true; // enable clicking
                    }
                };
                QuizComponent.prototype.gameOver = function () {
                    clearInterval(this.timer);
                    if (!this.isEmptyString(this.user.name)) {
                        this.logHighScore(this.user.name);
                    }
                    this.health = 0;
                    $("#game-over")
                        .modal('setting', 'closable', false)
                        .modal("show");
                };
                QuizComponent.prototype.logHighScore = function (name) {
                    var _this = this;
                    if (!this.isEmptyString(name) && name.length <= 14) {
                        this.user.name = name;
                        this.userService.updateLocalUser(this.user);
                        this.apiService
                            .createUser(this.user.name)
                            .subscribe(function (data) {
                            _this.user = data;
                            _this.userService.updateLocalUser(_this.user);
                            if (!_this.isEmptyString(_this.user.name) && _this.user.name.length <= 14) {
                                _this.apiService
                                    .logHighScore(_this.user.name, _this.score, _this.diffLevel, _this.user.registered)
                                    .subscribe(function (data) { return console.log(data); });
                            }
                        }, function (error) {
                            _this.error = error.message;
                            setTimeout(function () { return _this.error = null; }, 4000);
                        });
                    }
                };
                QuizComponent.prototype.resume = function () {
                    var _this = this;
                    clearInterval(this.timer);
                    this.timer = self.setInterval(function () {
                        if (_this.time > 0) {
                            _this.time -= 100;
                        }
                        else {
                            _this.gameOver();
                        }
                        _this.timePercent = _this.time / 60000 * 100;
                        $("#timer").progress("set percent", _this.timePercent);
                    }, 100);
                };
                QuizComponent.prototype.quitGame = function () {
                    clearInterval(this.timer);
                    $("#confirm-quit").modal("show");
                };
                QuizComponent.prototype.restart = function () {
                    this.ngOnInit();
                    $("#game-over").modal("hide");
                };
                QuizComponent.prototype.backToMenu = function (event) {
                    this.onBackToMenu.emit(false);
                    $("#game-over").modal("hide");
                    $("body > .dimmer.modals.page").remove(); // this would stack extra dimmer layers otherwise
                };
                /*************
                 * POWER UPS *
                 *************/
                QuizComponent.prototype.ultimateBooster = function () {
                    this.boosterToggle = !this.boosterToggle;
                    this.boosterToggle ?
                        this.pushMessage("Booster ACTIVATED!", "The next questions will earn you 2x points", "warning") :
                        this.pushMessage("Booster deactivated.", "You will no longer earn 2x points", "warning");
                };
                QuizComponent.prototype.refillPowerUps = function () {
                    if (this.diffLevel % 5 == 0 && this.health < 5) {
                        this.health++;
                    }
                };
                /**************
                 * ANIMATIONS *
                 **************/
                QuizComponent.prototype.spawnMonster = function () {
                    //let tl = this.monsterExample.animationTimeline;
                    //tl.to("#monster-0", 10, {left: "100%", ease: Power0.easeNone, onComplete: this.gameOver});
                };
                QuizComponent.prototype.destroyMonster = function (monster) {
                    // this.score++;
                    // let tl = monster.animationTimeline;
                    //
                    // let monsterObjectId = "#monster-0";
                    // tl.kill(null, monsterObjectId)
                    //     .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
                    //     .to(monsterObjectId, 0.4, {scale: 1.5, ease: Bounce.easeOut})
                    //     .to(monsterObjectId, 0.3, {autoAlpha: 0, ease: Power1.easeIn}, "-=0.2");
                    // TODO: clear form and question
                };
                /*******************
                 * SYSTEM FEEDBACK *
                 *******************/
                QuizComponent.prototype.correctAnswer = function () {
                    var _this = this;
                    if (this.health > 0) {
                        var timeline = new TimelineMax();
                        var answerItems = $("#input-area ul li");
                        var earnedScore = $("#hud .add-score");
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
                            .set(earnedScore, { x: 3, y: 0, autoAlpha: 1 }, 0)
                            .to(earnedScore, 0.7, { autoAlpha: 0, y: -20 }, 0.3);
                        var extraTime = this.diffLevel > 10 ? 10000 : this.diffLevel * 1000;
                        this.time = (this.time + extraTime) < 60000
                            ? this.time + extraTime : 60000;
                        this.score += this.quiz.score;
                        this.refillPowerUps();
                        this.diffLevel++;
                        // wait after the animation; seems like the best way right now
                        var timer = Rx_1.Observable.timer(1000);
                        timer.subscribe(function (t) { return _this.makeQuiz(); });
                    }
                };
                QuizComponent.prototype.wrongAnswer = function () {
                    var _this = this;
                    var timeline = new TimelineMax();
                    var answerItems = $("#input-area ul li");
                    timeline
                        .set(answerItems, { backgroundColor: "#DB2828" })
                        .from(answerItems, 0.3, { x: 10, ease: Bounce.easeOut })
                        .set(answerItems, { x: 0 })
                        .to(answerItems, 0.5, {
                        autoAlpha: 0,
                        y: 50,
                        ease: Power1.easeOut
                    }, "+=0.2");
                    this.health--;
                    // game over
                    if (this.health == 0) {
                        this.gameOver();
                    }
                    else {
                        // wait after the animation; seems like the best way right now
                        var timer = Rx_1.Observable.timer(1000);
                        timer.subscribe(function (t) { return _this.makeQuiz(); });
                    }
                };
                QuizComponent.prototype.pushMessage = function (header, value, type) {
                    var message = new message_1.Message(header, value, type);
                    this.consoleLog.push(message);
                    setTimeout(function () { return $("#console").scrollTop($("#console")[0].scrollHeight); }, 100);
                };
                /************************
                 * END-TO-END FUNCTIONS *
                 ************************/
                QuizComponent.prototype.makeQuiz = function () {
                    var _this = this;
                    if (this.health > 0) {
                        this.apiService
                            .makeQuiz(this.diffLevel, this.boosterToggle)
                            .subscribe(function (data) {
                            console.log(data);
                            _this.quiz = data;
                            _this.boosterActive = _this.boosterToggle;
                            _this.currAvailInput = [];
                            _this.currUserInput = [];
                            _this.inputIndex = 0;
                            var maxSymbolWidth = 1;
                            for (var i = 0; i < _this.quiz.expr.length; i++) {
                                // to display a uniform width
                                if (_this.quiz.expr[i].length > maxSymbolWidth) {
                                    maxSymbolWidth = _this.quiz.expr[i].length;
                                }
                                // for the binding models
                                _this.currAvailInput[i] = {
                                    value: _this.quiz.expr[i],
                                    disabled: false,
                                    location: null
                                };
                                if (i < 4) {
                                    _this.currUserInput[i] = {
                                        value: "",
                                        originIndex: null
                                    };
                                }
                                _this.exprString = _this.quiz.givenValue;
                            }
                            _this.buttonWidth = 50 + maxSymbolWidth * 8;
                            _this.canAnswer = true;
                        });
                    }
                };
                QuizComponent.prototype.checkSolution = function () {
                    var _this = this;
                    clearInterval(this.timer);
                    this.canAnswer = false;
                    this.apiService
                        .checkSolution(this.exprString)
                        .subscribe(function (data) {
                        console.log(data);
                        if (data.result == _this.quiz.targetValue) {
                            _this.pushMessage("Nice!", "Your answer was correct", "positive");
                            _this.correctAnswer();
                        }
                        else if (Number.isInteger(Number(data.result))) {
                            _this.pushMessage("Wrong answer.", "Your answer value was " + data.result, "negative");
                            _this.wrongAnswer();
                        }
                        else {
                            _this.pushMessage("Wrong syntax.", "Your syntax was wrong", "negative");
                            _this.wrongAnswer();
                        }
                        _this.resume();
                    });
                };
                /***********
                 * HELPERS *
                 ***********/
                QuizComponent.prototype.isEmptyString = function (text) {
                    text = text.trim();
                    if (text == "" || text == null) {
                        return true;
                    }
                    return false;
                };
                QuizComponent.prototype.compileExpressionString = function () {
                    this.exprString = this.quiz.givenValue;
                    for (var i = 0; i < this.currUserInput.length; i++) {
                        var value = this.currUserInput[i].value;
                        // manipulate expression sent to the server
                        if (!this.isEmptyString(value)) {
                            if (Number.isInteger(Number(value))) {
                                this.exprString = "(" + this.exprString + value + ")";
                            }
                            else {
                                // if operators and numbers are out of order, the syntax will be wrong;
                                // this takes care of misuse/abuse case of mixing up string orders
                                this.exprString += value;
                            }
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], QuizComponent.prototype, "name", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], QuizComponent.prototype, "onBackToMenu", void 0);
                QuizComponent = __decorate([
                    core_1.Component({
                        selector: "quiz",
                        templateUrl: "client/components/quiz/quiz.component.html"
                    }), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, user_service_1.UserService])
                ], QuizComponent);
                return QuizComponent;
            }());
            exports_1("QuizComponent", QuizComponent);
        }
    }
});
//# sourceMappingURL=quiz.component.js.map