System.register(["@angular/core", "../../service/api.service", "../../service/user.service"], function(exports_1, context_1) {
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
    var core_1, api_service_1, user_service_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(apiService, userService) {
                    this.apiService = apiService;
                    this.userService = userService;
                    this.appName = "Quiz Whizz";
                    this.userName = "";
                    this.registered = false;
                    this.playing = false;
                    // see if there's a name saved in local storage, create new one if found none
                    this.user = this.userService.getLocalUser();
                    if (this.user == null || this.isEmptyString(this.user.name)) {
                        this.user = {
                            "name": "",
                            "registered": false
                        };
                        this.userService.updateLocalUser(this.user);
                    }
                    else {
                        console.log("Welcome back!");
                        this.userName = this.user.name;
                    }
                }
                HomeComponent.prototype.updateUserName = function (name) {
                    this.userName = name;
                    this.user.name = this.userName;
                    this.userService.updateLocalUser(this.user);
                };
                HomeComponent.prototype.startGame = function (name) {
                    var _this = this;
                    this.updateUserName(name);
                    this.playing = true;
                    if (!this.isEmptyString(this.userName) && this.userName.length <= 14) {
                        this.apiService
                            .createUser(this.userName)
                            .subscribe(function (data) {
                            console.log(data);
                        }, function (error) {
                            _this.error = error.message;
                            setTimeout(function () { return _this.error = null; }, 4000);
                        });
                    }
                };
                HomeComponent.prototype.onBackToMenu = function (event) {
                    this.playing = event;
                };
                /***********
                 * HELPERS *
                 ***********/
                HomeComponent.prototype.isEmptyString = function (text) {
                    if (text == " " || text == "" || text == null) {
                        return true;
                    }
                    return false;
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: "home",
                        templateUrl: "client/modules/home/home.component.html"
                    }), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, user_service_1.UserService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map