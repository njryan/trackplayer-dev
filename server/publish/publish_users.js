Meteor.publish("profiles", function() {
  return Meteor.users.find(this.userId, { fields: { profile: 1,'services.facebook.name':1 } });
});
