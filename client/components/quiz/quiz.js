System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Quiz;
    return {
        setters:[],
        execute: function() {
            Quiz = (function () {
                function Quiz(expr, givenValue, targetValue, score) {
                    this.expr = expr;
                    this.givenValue = givenValue;
                    this.targetValue = targetValue;
                    this.score = score;
                }
                return Quiz;
            }());
            exports_1("Quiz", Quiz);
        }
    }
});
//# sourceMappingURL=quiz.js.map