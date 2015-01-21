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
        /*autoValue: function() {
            if (this.userId) {
                return this.userId;
            }
        }*/
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
        allowedValues: ["rap", "jazz", "country", "pop", "rock", "reggae", "classical", "edm"],
        autoform: {
            type: "select",
            options: [
                {label: "Rap/Hip Hop", value: "rap"},
                {label: "Jazz", value: "jazz"},
                {label: "Country", value: "country"},
                {label: "Pop", value: "pop"},
                {label: "Rock", value: "rock"},
                {label: "Reggae", value: "reggae"},
                {label: "Classical", value: "classical"},
                {label: "EDM", value: "edm"}
            ]
        }
    },
    likes: {
        type: Number,
        label: "Likes",
        optional: true
    },
    coverImageId: {
        type: String,
        //optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }

    },
    audioFileId: {
        type: String,
        //optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Audios'
            }
        }

    },
    socialShare: {
        type: [String],
        label: "Share Song",
        optional:true,
        allowedValues: ["twitter", "fb"],
        autoform: {
            type: "select-checkbox-inline",
            options: function () {
                return [
                    {label: "Twitter", value: "twitter"},
                    {label: "Facebook", value: "fb"}
                ];
            }
        }
    }
}));
