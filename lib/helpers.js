/**
 * Helper Functions for entire site
 */

// Directly from telescope source code
getUserName = function(user){
    try{
        if (user.username)
            return user.username;
        if (user && user.services && user.services.twitter && user.services.twitter.screenName)
            return user.services.twitter.screenName
    }
    catch (error){
        console.log(error);
        return null;
    }
};
getDisplayName = function(user){
    return (user.profile && user.profile.name) ? user.profile.name : getUserName(user);
};
getDisplayNameById = function(userId){
    return getDisplayName(Meteor.users.findOne(userId));
};