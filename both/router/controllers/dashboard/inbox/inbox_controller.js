this.DashboardInboxController = RouteController.extend({
    template: "Dashboard",

    yieldTemplates: {
        'DashboardInbox': { to: 'DashboardSubcontent'}

    },

    onBeforeAction: function() {
        /*BEFORE_FUNCTION*/
        this.next();
    },

    action: function() {
        if(this.isReady()) { this.render(); } else { this.render("Dashboard"); this.render("loading", { to: "DashboardSubcontent" });}
        /*ACTION_FUNCTION*/
    },

    isReady: function() {
        var subs = [
            Meteor.subscribe("my_received_messages"),
            Meteor.subscribe("my_sent_messages")
        ];
        var ready = true;
        _.each(subs, function(sub) {
            if(!sub.ready())
                ready = false;
        });
        return ready;
    },

    data: function() {
        return {
            params: this.params || {},
            my_sent_messages: Messages.find({ownerId:Meteor.userId()},{}),
            my_received_messages: Messages.find({to:Meteor.userId()}, {})
        };
        /*DATA_FUNCTION*/
    },

    onAfterAction: function() {
    }
});
