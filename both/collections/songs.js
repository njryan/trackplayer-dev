Songs = new Meteor.Collection("songs");

Songs.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    ownerId: {
        type: String,
        label: "Owner Id",
        optional: true,
        autoValue: function() {
            if (this.userId) {
                return this.userId;
            }
        }
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
    genre: {
        type: String,
        label: "Genre",
        allowedValues: ["Rap/HipHop", "Jazz", "Country", "Pop", "Rock", "Reggae", "Classical", "EDM"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Genre)"
            }
        }
    },
    likes: {
        type: Number,
        label: "Likes",
        optional: true
    },
    coverImageId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'Images'
            }
        }

    },
    audioFileId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'cfs-files',
                collection: 'Audios'
            }
        }

    }
}));
