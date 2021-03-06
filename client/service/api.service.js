System.register(["@angular/core", '@angular/http', "angular2-jwt", "rxjs/Observable"], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, angular2_jwt_1, Observable_1;
    var ApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            ApiService = (function () {
                function ApiService(authHttp, http) {
                    this.authHttp = authHttp;
                    this.http = http;
                }
                /********
                 * USER *
                 ********/
                ApiService.prototype.createUser = function (userName) {
                    var body = { userName: userName };
                    var headers = new http_2.Headers({ "Content-Type": "application/json" });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this
                        .http
                        .post("/user", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.register = function (userName, email) {
                    var body = { userName: userName, email: email };
                    var headers = new http_2.Headers({ "Content-Type": "application/json" });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this
                        .http
                        .post("/user/register", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.logHighScore = function (userName, score, level, registered) {
                    var body = {
                        userName: userName,
                        score: score,
                        level: level,
                        registered: registered
                    };
                    var headers = new http_2.Headers({ "Content-Type": "application/json" });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this
                        .http
                        .post("/user/saveScore", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                /***************
                 * LEADERBOARD *
                 ***************/
                ApiService.prototype.getUsersBy = function (criteria) {
                    return this
                        .http
                        .get("/user/list/" + criteria)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                /********
                 * QUIZ *
                 ********/
                ApiService.prototype.makeQuiz = function (level, boosterToggle) {
                    var body = {
                        currentLevel: level,
                        boosterToggle: boosterToggle
                    };
                    var headers = new http_2.Headers({ "Content-Type": "application/json" });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this
                        .http
                        .post("/quiz", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.checkSolution = function (expr) {
                    var body = { expr: expr };
                    var headers = new http_2.Headers({ "Content-Type": "application/json" });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this
                        .http
                        .post("/quiz/check", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                ApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http])
                ], ApiService);
                return ApiService;
            }());
            exports_1("ApiService", ApiService);
        }
    }
});
//# sourceMappingURL=api.service.js.map