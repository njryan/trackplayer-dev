Meteor.publish("messages", function() {
	return Messages.find({}, {});
});

Meteor.publish("all_messages", function() {
	return Messages.find({}, {});
});

Meteor.publish("message_null", function() {
	return Messages.find({_id:null}, {});
});

Meteor.publish("message", function(messageId) {
	return Messages.find({_id:messageId}, {});
});

