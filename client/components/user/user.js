System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(_id, userId, userUrl, email, name, profileImage, highScore, highLevel) {
                    this._id = _id;
                    this.userId = userId;
                    this.userUrl = userUrl;
                    this.email = email;
                    this.name = name;
                    this.profileImage = profileImage;
                    this.highScore = highScore;
                    this.highLevel = highLevel;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map