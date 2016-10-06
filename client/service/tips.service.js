System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var TipsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TipsService = (function () {
                function TipsService() {
                    this.tips = [
                        "Operators (+, -, x, /) must always be in the first answer slot",
                        "You will lose 1 health if time runs out. The time will refill until health reaches 0",
                        "Gain 1 health every 5 correct answers",
                        "Gain X amount of time for each X-level correct answer (up to 10 seconds)",
                        "Every 10 level, there will be more wrong options to select",
                        "Click the Booster to activate challenge mode. You will get 2x points for each challenge question"
                    ];
                }
                TipsService.prototype.makeRandomTipObject = function () {
                    var index = Math.floor((Math.random() * (this.tips.length - 1)));
                    return {
                        header: "Game Tip #" + (index + 1) + ":",
                        message: this.tips[index] + "",
                    };
                };
                TipsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TipsService);
                return TipsService;
            }());
            exports_1("TipsService", TipsService);
        }
    }
});
//# sourceMappingURL=tips.service.js.map