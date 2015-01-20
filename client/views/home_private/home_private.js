Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
    "click .song_url": function(e,t) {
        cl("Song Url Clicked :"+t);
        var id;
        var url;
        e.preventDefault();
        url = e.target.href;
        //id = e.target.getAttribute('data-id');
        id = this.id;
        playSong(id,url);
    }

	
});

Template.HomePrivate.helpers({
    "songs": function() {
        return Songs.find();
    },
    "seshHelper": function (_id) {
        Session.set('curUrl', _id);
    }
	
});
