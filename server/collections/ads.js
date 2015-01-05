Ads.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return userId && doc.ownerId == userId;
	},

	remove: function (userId, doc) {
		return userId && doc.ownerId == userId;
	}
});

Ads.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Ads.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Ads.before.remove(function(userId, doc) {
	
});

Ads.after.insert(function(userId, doc) {
	
});

Ads.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Ads.after.remove(function(userId, doc) {
	
});
