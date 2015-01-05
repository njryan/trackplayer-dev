this.AdsController = RouteController.extend({
	template: "Ads",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		var subs = [
			Meteor.subscribe("ads"),
			Meteor.subscribe("all_ads")
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
			ads: Ads.find({}, {}),
			all_ads: Ads.find({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});