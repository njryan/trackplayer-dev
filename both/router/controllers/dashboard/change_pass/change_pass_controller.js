this.DashboardChangePassController = RouteController.extend({
	template: "Dashboard",

	yieldTemplates: {
		'DashboardChangePass': { to: 'DashboardSubcontent'}
		
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
			params: this.params || {}
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});