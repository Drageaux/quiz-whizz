System.register([], function(exports_1) {
    var Quiz;
    return {
        setters:[],
        execute: function() {
            Quiz = (function () {
                function Quiz(expr, givenValue, targetValue) {
                    this.expr = expr;
                    this.givenValue = givenValue;
                    this.targetValue = targetValue;
                }
                return Quiz;
            })();
            exports_1("Quiz", Quiz);
        }
    }
});
//# sourceMappingURL=quiz.js.map