System.register(['@angular/core', "@angular/http", "ng-semantic", "@angular/common", "./leaderboard.component", "./leaderboard.routing"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, ng_semantic_1, common_1, leaderboard_component_1, leaderboard_routing_1;
    var LeaderboardModule;
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
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (leaderboard_component_1_1) {
                leaderboard_component_1 = leaderboard_component_1_1;
            },
            function (leaderboard_routing_1_1) {
                leaderboard_routing_1 = leaderboard_routing_1_1;
            }],
        execute: function() {
            LeaderboardModule = (function () {
                function LeaderboardModule() {
                }
                LeaderboardModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            http_1.HttpModule,
                            leaderboard_routing_1.routing,
                            ng_semantic_1.NgSemanticModule,
                        ],
                        declarations: [leaderboard_component_1.LeaderboardComponent],
                        bootstrap: [leaderboard_component_1.LeaderboardComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LeaderboardModule);
                return LeaderboardModule;
            })();
            exports_1("LeaderboardModule", LeaderboardModule);
        }
    }
});
//# sourceMappingURL=leaderboard.module.js.map