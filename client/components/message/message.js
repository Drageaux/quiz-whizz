System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(header, value, type) {
                    this.header = header;
                    this.value = value;
                    this.type = type;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
//# sourceMappingURL=message.js.map