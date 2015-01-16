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
        autoValue: function() {
            if (this.userId) {
                return this.userId;
            }
        },
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
        allowedValues: ["Rap/Hip-Hop","jazz","country", "Pop", "Rock", "Reggae", "Classical", "EDM"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Genre)"
            }
        }
    }
}));