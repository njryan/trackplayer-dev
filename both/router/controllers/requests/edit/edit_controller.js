this.RequestsEditController = RouteController.extend({
	template: "RequestsEdit",

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
			Meteor.subscribe("profiles"),
			Meteor.subscribe("request", this.params.requestId)
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
			profiles: Users.find({}, {}),
			request: Requests.findOne({_id:this.params.requestId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});