/**
 * Created by evanmarchand on 1/19/15.
 */
//var elapsedTimeHumanized = FirstClock.elapsedTime({humanize: true, suffix: true});

Template.DashboardHome.rendered = function() {

};

Template.DashboardHome.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    },
    "click #page-back-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }

});

Template.DashboardHome.helpers({
    "clock": function() {
        return FirstClock.elapsedTime({humanize: true, suffix: true});
    }
});
