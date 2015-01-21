Songs.allow({
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


Songs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Songs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Songs.before.remove(function(userId, doc) {
	
});

Songs.after.insert(function(userId, doc) {
	
});

Songs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Songs.after.remove(function(userId, doc) {
	
});
