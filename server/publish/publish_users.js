Meteor.publish("profiles", function() {
  return Meteor.users.find({ }, { fields: { profile: 1 } });
});
