Requests = new Meteor.Collection("requests");
Requests.attachSchema(new SimpleSchema({
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
    createdBy: {
        type: String,
        optional: true
    },
    sentAt: {
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
    read: {
        type: Boolean,
        optional: true
    },
    body: {
        type: String,
        label: "Message",
        max: 400
    },
    replied: {
        type: Boolean,
        optional: true
    },
    adRef: {
        type: String,
        optional: true
    }
}));
