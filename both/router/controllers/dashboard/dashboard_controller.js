this.DashboardController = RouteController.extend({
	template: "Dashboard",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
		//'DashboardHome' : { to: 'DashboardSubcontent'}
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		//console.log("action called");
		//this.redirect('dashboard.profile', this.params || {});
		this.redirect('dashboard.home', this.params || {});
		/*ACTION_FUNCTION*/
		//this.next();
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