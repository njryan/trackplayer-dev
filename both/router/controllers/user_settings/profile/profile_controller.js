this.DashboardProfileController = RouteController.extend({
	template: "Dashboard",

	yieldTemplates: {
		'DashboardProfile': { to: 'DashboardSubcontent'}
		
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
			Meteor.subscribe("current_user_data"),
			Meteor.subscribe("profiles")
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
			current_user_data: Users.findOne({_id:Meteor.userId()}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});