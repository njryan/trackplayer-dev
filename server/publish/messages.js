/*
 * Publishing Messages
 *
 * TO DO: **SECURITY** - Limit fields displayed, and set parameter checks
 */


Meteor.publish("all_messages", function() {
	return Messages.find({}, {});
});

// Publish Messages "to: " for user inbox
Meteor.publish("my_received_messages", function() {
	return Messages.find({ to : this.userId }, {});
});

// Publish Messages from current user for user inbox
Meteor.publish("my_sent_messages", function() {
	return Messages.find({ownerId:this.userId}, {});
});

Meteor.publish("message_null", function() {
	return Messages.find({_id:null}, {});
});

Meteor.publish("message", function(messageId) {
	return Messages.find({_id:messageId}, {});
});

