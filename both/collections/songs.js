Songs = new Meteor.Collection("songs");

Songs.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author",
        optional: true,
        autoValue: function() {
            if (this.userId) {
                return this.username;
            }
        }
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
        allowedValues: ["rap-hiphop", "jazz", "country", "pop", "rock", "reggae", "classical", "EDM"],
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
    coverImage: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }

    },
    audioFile: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Audios'
            }
        }

    }
}));
