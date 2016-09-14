System.register(["@angular/core"], function(exports_1) {
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
    var HelloComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HelloComponent = (function () {
                function HelloComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], HelloComponent.prototype, "name", void 0);
                HelloComponent = __decorate([
                    core_1.Component({
                        selector: "hello",
                        template: "<h2 class=\"ui header divided\">{{name}}</h2>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], HelloComponent);
                return HelloComponent;
            })();
            exports_1("HelloComponent", HelloComponent);
        }
    }
});
//# sourceMappingURL=hello.component.js.map