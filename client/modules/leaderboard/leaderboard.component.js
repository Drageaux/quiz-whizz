System.register(["@angular/core", "../../service/api.service"], function(exports_1, context_1) {
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
    var core_1, api_service_1;
    var LeaderboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            LeaderboardComponent = (function () {
                function LeaderboardComponent(apiService) {
                    this.apiService = apiService;
                    this.topUsers = [];
                }
                LeaderboardComponent.prototype.ngOnInit = function () {
                    this.getUsersByScore();
                };
                LeaderboardComponent.prototype.getUsersByScore = function () {
                    var _this = this;
                    this.apiService
                        .getUsersByScore()
                        .subscribe(function (data) {
                        _this.topUsers = data;
                        console.log(data);
                    }, function (error) {
                        _this.error = error.message;
                        setTimeout(function () { return _this.error = null; }, 4000);
                    });
                };
                LeaderboardComponent.prototype.getUsersByLevel = function () {
                };
                /***********
                 * HELPERS *
                 ***********/
                LeaderboardComponent.prototype.isEmptyString = function (text) {
                    if (text == " " || text == "" || text == null) {
                        return true;
                    }
                    return false;
                };
                LeaderboardComponent = __decorate([
                    core_1.Component({
                        selector: "leaderboard",
                        templateUrl: "client/modules/leaderboard/leaderboard.component.html"
                    }), 
                    __metadata('design:paramtypes', [api_service_1.ApiService])
                ], LeaderboardComponent);
                return LeaderboardComponent;
            }());
            exports_1("LeaderboardComponent", LeaderboardComponent);
        }
    }
});
//# sourceMappingURL=leaderboard.component.js.map