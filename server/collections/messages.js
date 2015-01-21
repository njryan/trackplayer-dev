Messages.allow({
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

Messages.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Messages.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Messages.before.remove(function(userId, doc) {
	
});

Messages.after.insert(function(userId, doc) {
	
});

Messages.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Messages.after.remove(function(userId, doc) {
	
});
