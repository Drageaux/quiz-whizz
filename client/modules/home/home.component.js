System.register(["@angular/core", "../../service/api.service"], function(exports_1) {
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
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(apiService) {
                    this.apiService = apiService;
                    this.appName = "Quiz Whizz";
                    this.userName = "";
                    this.registered = false;
                    this.playing = false;
                }
                HomeComponent.prototype.updateUserName = function (name) {
                    this.userName = name;
                };
                HomeComponent.prototype.startGame = function () {
                    var _this = this;
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
                    __metadata('design:paramtypes', [api_service_1.ApiService])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map