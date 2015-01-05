Template.RezRadio.rendered = function() {
	
};

Template.RezRadio.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.RezRadio.helpers({
	
});



