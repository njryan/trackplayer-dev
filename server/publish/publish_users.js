Meteor.publish("profiles", function() {
  return Meteor.users.find(this.userId, { fields: { profile: 1,'services.facebook.name':1, 'services.facebook.id':1 } });
});

Meteor.publish("all_users", function() {
  return Meteor.users.find();
});