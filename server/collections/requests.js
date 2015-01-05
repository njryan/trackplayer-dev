Requests.allow({
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

Requests.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Requests.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Requests.before.remove(function(userId, doc) {
	
});

Requests.after.insert(function(userId, doc) {
	
});

Requests.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Requests.after.remove(function(userId, doc) {
	
});
