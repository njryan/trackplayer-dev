/**
 * Helper Functions on Client Only.
 */

// Straight from telescope source

UI.registerHelper("userName", function(userOrUserId) {
    var user = (typeof userOrUserId === "string") ? Meteor.users.findOne(userOrUserId) :  userOrUserId;
    if (!!user)
        return getUserName(user);
});