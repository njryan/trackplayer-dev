/**
 * Helper Functions on Client Only.
 */

// Straight from telescope source -- Probably not being used at the moment

UI.registerHelper("userName", function(userOrUserId) {
    var user = (typeof userOrUserId === "string") ? Meteor.users.findOne(userOrUserId) :  userOrUserId;
    if (!!user)
        return getUserName(user);
});

var slideDown;

slideDown = {
    "in": function(node, next) {
        var $node;
        $node = $(node);
        $.Velocity.hook($node, "translateY", "-100%");
        return $node.insertBefore(next).velocity({
            translateY: ['0%', '-100%']
        }, {
            duration: 500,
            easing: 'ease-in-out',
            queue: false
        });
    },
    "out": function(node) {
        var $node;
        $node = $(node);
        return $node.velocity({
            translateY: '100%'
        }, {
            duration: 500,
            easing: 'ease-in-out',
            queue: false,
            complete: function() {
                return $node.remove();
            }
        });
    }
};

// Custom Transition Code Testing
Transitioner.transition({
    fromRoute: 'home_private',
    toRoute: 'songs',
    velocityAnimaton: slideDown
});