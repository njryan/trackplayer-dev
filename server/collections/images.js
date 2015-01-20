Images.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    download: function(userId) {
        return true;
    },
    remove: function(userId) {
        return true;
    }
});
