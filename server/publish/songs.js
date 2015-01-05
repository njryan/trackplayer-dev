Meteor.publish("songs", function() {
	if (this.ready()) {
		return Songs.find({}, {});
	}
});

Meteor.publish("all_songs", function() {
	return Songs.find({}, {});
});

Meteor.publish("songs_null", function() {
	return Songs.find({_id:null}, {});
});

Meteor.publish("song", function(songId) {
	return Songs.find({_id:songId}, {});
});
