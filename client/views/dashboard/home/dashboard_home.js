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
	
});


