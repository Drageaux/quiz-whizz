System.register(["@angular/core", "@angular/router", "angular2-jwt", "@angular/http", "rxjs/Observable", "./api.service"], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_jwt_1, http_1, Observable_1, api_service_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(router, authHttp, http, apiService) {
                    var _this = this;
                    this.router = router;
                    this.authHttp = authHttp;
                    this.http = http;
                    this.apiService = apiService;
                    // Configure Auth0
                    this.lock = new Auth0Lock('BQBgvwL4VhCBYG5UCWCoxwBG3drfBR1A', 'davefpg.auth0.com', {});
                    // Add callback for lock `authenticated` event
                    this.lock.on("authenticated", function (authResult) {
                        localStorage.setItem('id_token', authResult.idToken);
                        // Fetch profile information
                        _this.lock.getProfile(authResult.idToken, function (error, profile) {
                            if (error) {
                                console.log(error);
                            }
                            _this.userProfile = profile;
                            localStorage.setItem('profile', JSON.stringify(profile));
                        });
                        _this.lock.hide();
                    });
                }
                UserService.prototype.getLocalUser = function () {
                    var user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                        return user;
                    }
                    else {
                        return {
                            "name": "",
                            "registered": false
                        };
                    }
                };
                UserService.prototype.updateLocalUser = function (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                };
                UserService.prototype.login = function () {
                    // Call the show method to display the widget.
                    this.lock.show();
                };
                ;
                UserService.prototype.authenticated = function () {
                    // Check if there's an unexpired JWT
                    // This searches for an item in localStorage with key == 'id_token'
                    return angular2_jwt_1.tokenNotExpired();
                };
                ;
                UserService.prototype.logout = function () {
                    // Remove token from localStorage
                    localStorage.removeItem('id_token');
                };
                ;
                UserService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, angular2_jwt_1.AuthHttp, http_1.Http, api_service_1.ApiService])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map