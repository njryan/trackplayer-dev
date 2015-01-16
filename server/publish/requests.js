Meteor.publish("requests", function() {
	return Requests.find({}, {});
});

Meteor.publish("all_requests", function() {
	return Requests.find({}, {});
});

Meteor.publish("request_null", function() {
	return Requests.find({_id:null}, {});
});

Meteor.publish("request", function(requestId) {
	return Requests.find({_id:requestId}, {});
});

Meteor.publish("my_pending_requests", function() {
	return Ads.find({to: this._id});
});

