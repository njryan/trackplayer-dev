this.MessagesEditController = RouteController.extend({
	template: "MessagesEdit",

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
			Meteor.subscribe("message", this.params.messageId)
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
			message: Messages.findOne({_id:this.params.messageId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});