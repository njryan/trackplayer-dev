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
        cl("Song Url Clicked :"+ t.name);
        var id;
        var url;
        e.preventDefault();
	    e.stopPropagation();
        url = e.target.parentNode.href;
	    cl('parent: '+e.target.parentNode.href+'');
        id = e.target.parentNode.getAttribute('data-id');
        //id = this.id;
	    cl("song change: "+url+' Id :'+id);
        playSong(id,url);
    }

	
});

Template.HomePrivate.helpers({
    "songs": function() {
	    cl("this: "+this);
        return Songs.find();
    },
    "seshHelper": function (_id) {
	    cl("this: "+this);
        Session.set('curUrl', _id);
    },
	"seshHelper1": function(parentContext) {
		cl("this: "+this);
		cl("Parents Context: "+parentContext+''+parentContext);
	},
    "artistName": function (ownerId) {
        if (!ownerId) cl('No _id Set!');
        var userObj = Meteor.users.findOne({_id:ownerId});
        if (!userObj) cl("No userObj Set!");
        //cl("name: "+userObj.userName);
        return userObj.userName;
    }
});
