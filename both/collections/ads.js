this.Ads = new Meteor.Collection("ads");
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
    ownerId: {
        type: String,
        label: "Owner Id",
        min: 0,
        optional:true
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
        type: [String],
        label: "Genre",
        allowedValues: ["Rap/Hip-Hop","jazz","country", "Pop", "Rock", "Reggae", "Classical", "EDM"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Genre)"
            }
        }
    }
}));