Messages = new Meteor.Collection("messages");
Messages.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Subject",
        max: 200
    },
    to: {
        type: String,
        label: "To: ",
        max: 200
    },
    createdAt: {
        type: Date,
        label: "Published On",
        optional: true,
        denyUpdate: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    ownerId: {
        type: String,
        optional: true,
        label: 'createdBY'
        /*autoValue: function() {
            if (this.userId) {
                return this.userId;
            }
        }*/
    },
    read: {
        type: Boolean,
        optional: true
    },
    body: {
        type: String,
        label: "Message",
        max: 400,
        autoform: {
            rows:3
        }
    }
}));