this.DashboardSongsController = RouteController.extend({
    template: "Dashboard",

    yieldTemplates: {
        'DashboardSongs': { to: 'DashboardSubcontent'}

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
            Meteor.subscribe("user_only_songs"),
            Meteor.subscribe("images"),
            Meteor.subscribe("audios")
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
            user_only_songs: Songs.find({ownerId:Meteor.userId()},{}),
            images: Images.find({},{}),
            audios: Audios.find({},{})
        };
        /*DATA_FUNCTION*/
    },

    onAfterAction: function() {
    }
});