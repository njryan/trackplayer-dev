Meteor.publish("ads", function() {
	return Ads.find({}, {});
});

Meteor.publish("all_ads", function() {
	return Ads.find({}, {});
});

Meteor.publish("ads_null", function() {
	return Ads.find({_id:null}, {});
});

Meteor.publish("ad", function(adId) {
	return Ads.find({_id:adId}, {});
});

Meteor.publish("my_ads", function() {
	return Ads.find({ownerId: this._id});
});
