System.register(['@angular/router', "./leaderboard.component", "../../service/navigate-guard.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, leaderboard_component_1, navigate_guard_service_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (leaderboard_component_1_1) {
                leaderboard_component_1 = leaderboard_component_1_1;
            },
            function (navigate_guard_service_1_1) {
                navigate_guard_service_1 = navigate_guard_service_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                {
                    path: 'leaderboard',
                    component: leaderboard_component_1.LeaderboardComponent,
                    canActivate: [navigate_guard_service_1.NavigateGuard]
                }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forChild(routes));
        }
    }
});
//# sourceMappingURL=leaderboard.routing.js.map