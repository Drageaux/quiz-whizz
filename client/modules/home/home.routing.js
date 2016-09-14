System.register(['@angular/router', './home.component'], function(exports_1) {
    var router_1, home_component_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: 'home', component: home_component_1.HomeComponent }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forChild(routes));
        }
    }
});
//# sourceMappingURL=home.routing.js.map