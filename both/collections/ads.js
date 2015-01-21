Ads = new Meteor.Collection("ads");
Ads.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    price: {
        type: Number,
        label: "Price",
        optional:false
    },
    createdBy: {
        type: String,
        optional: true,
        /*autoValue: function() {
            if (this.userId) {
                return this.userId;
            }
        },*/
        autoform: {
            omit: true
        }
    },
    createdAt: {
        type: Date,
        label: "Published On",
        optional: true
    },
    description: {
        type: String,
        label: "Description",
        optional: false,
        max: 300
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
    }
}));