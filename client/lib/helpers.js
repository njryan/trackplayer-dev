/**
 * Helper Functions on Client Only.
 */

// Straight from telescope source -- Probably not being used at the moment

UI.registerHelper("userName", function(userOrUserId) {
    var user = (typeof userOrUserId === "string") ? Meteor.users.findOne(userOrUserId) :  userOrUserId;
    if (!!user)
        return getUserName(user);
});