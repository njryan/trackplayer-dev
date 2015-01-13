this.App = {};
this.Helpers = {};

Meteor.startup(function () {


    /* END THE TEST CODE */
});

App.logout = function () {
    Meteor.logout(function (err) {
    });
};

this.menuItemClass = function (routeName) {
    if (!routeGranted(routeName)) {
        return "hidden";
    }

    if (!Router.current() || !Router.current().route) {
        return "";
    }

    if (!Router.routes[routeName]) {
        return "";
    }

    var currentPath = Router.routes[Router.current().route.getName()].handler.path;
    var routePath = Router.routes[routeName].handler.path;

    if (routePath === "/") {
        return currentPath == routePath ? "active" : "";
    }

    return currentPath.indexOf(routePath) === 0 ? "active" : "";
};


Helpers.menuItemClass = function (routeName) {
    return menuItemClass(routeName);
};

Helpers.userFullName = function () {
    var name = "";
    if (Meteor.user() && Meteor.user().profile)
        name = Meteor.user().profile.name;
    return name;
};

Helpers.userEmail = function () {
    var email = "";
    if (Meteor.user() && Meteor.user().profile)
        email = Meteor.user().profile.email;
    return email;
};


Helpers.randomString = function (strLen) {
    return Random.id(strLen);
};

Helpers.secondsToTime = function (seconds, timeFormat) {
    return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function (day) {
    if (_.isArray(day)) {
        var s = "";
        _.each(day, function (d, i) {
            if (i > 0) {
                s = s + ", ";
            }
            s = s + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
        });
        return s;
    }
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
};

Helpers.formatDate = function (date, dateFormat) {
    if (!date) {
        return "";
    }

    var f = dateFormat || "MM/DD/YYYY";

    if (_.isString(date)) {
        if (date.toUpperCase() == "NOW") {
            date = new Date();
        }
        if (date.toUpperCase() == "TODAY") {
            d = new Date();
            date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
    }

    return moment(date).format(f);
};

Helpers.integerToYesNo = function (i) {
    return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function (i) {
    return i ? "True" : "False";
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});

// Create function for firing off notifications based on events -


// Setting Up Account Ui and Social Media Integration
Accounts.ui.config({
    requestPermissions: {
        facebook: ['public_profile', 'email']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignupFields: []
});


// Custom UI Helper for Profile Image
/*UI.registerHelper("getImageUser", function (userId) {
    var user= Meteor.users.findOne(userId);
    if (user.services)
    {
        if (user.services.facebook)
            return user.services.facebook.picture;
        if (user.services.twitter)
            return user.services.twitter.profile_image_url;
        if (user.services.google)
            return user.services.google.picture;
    }
    else
    {
        return "images/withOutPhoto.png";
    }
});*/

Template.registerHelper('userFBImage', function() {
        if(Meteor.user().services.facebook) {
            return Meteor.user().services.facebook.id;
    }
});