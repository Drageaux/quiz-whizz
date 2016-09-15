System.register(["@angular/core", "@angular/http", "ng-semantic"], function(exports_1, context_1) {
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
    var core_1, http_1, ng_semantic_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng_semantic_1_1) {
                ng_semantic_1 = ng_semantic_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.http = http;
                    this.user = {
                        password: "angualr2express",
                        username: "john"
                    };
                    this.isLogged = !!localStorage.getItem("id_token");
                }
                __decorate([
                    core_1.ViewChild("myPopup"), 
                    __metadata('design:type', ng_semantic_1.SemanticPopupComponent)
                ], AppComponent.prototype, "myPopup", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "\n    <nav class=\"ui menu inverted huge\">\n        <a routerLink=\"home\" class=\"item\">Home</a>\n        <!--<a routerLink=\"contact\" class=\"item\">Contact Me</a>-->\n\n        <!--<nav class=\"menu right\">-->\n            <!--<a (click)=\"myPopup.show($event, {position: 'right center'})\" *ngIf=\"!isLogged\" class=\"item\">Login</a>-->\n            <!--<a (click)=\"logout()\" *ngIf=\"isLogged\" class=\"item inverted red\">Logout</a>-->\n        <!--</nav>-->\n    </nav>\n    <div class=\"ui container\">\n\n        <!--<sm-popup class=\"huge\" #myPopup>-->\n            <!--<sm-card class=\"card basic\">-->\n                <!--<card-title> Simple login </card-title>-->\n                <!--<card-subtitle>  </card-subtitle>-->\n                <!--<card-content>-->\n                    <!--<p><b>Password</b>: angualr2express</p>-->\n                    <!--<p><b>Username</b>: john</p>-->\n                <!--</card-content>-->\n                <!--<sm-button class=\"bottom attached fluid primary\" *ngIf=\"!isLogged\" (click)=\"login()\">Login</sm-button>-->\n                <!--<sm-button class=\"bottom attached fluid red\" *ngIf=\"isLogged\" (click)=\"logout()\">Logout</sm-button>-->\n            <!--</sm-card>-->\n        <!--</sm-popup>-->\n\n        <router-outlet></router-outlet>\n\n    </div>"
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map