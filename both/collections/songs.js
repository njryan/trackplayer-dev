this.Songs = new Meteor.Collection("songs");
Songs.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  ownerId: {
    type: String,
    label: "Owner Id",
    min: 0
  },
  createdAt: {
    type: Date,
    label: "Published On",
    optional: true
  },
  genre: {
    type: String,
    label: "Genre",
    allowedValues: ["Rap/Hip-Hop","Jazz","Country", "Pop", "Rock", "Reggae", "Classical", "EDM", "Country"],
    autoform: {
      afFieldInput: {
        firstOption: "(Select a Genre)"
      }
    }
  },
  likes: {
    type: Number,
    label: "Likes"
  },
  coverImage: {
    type: 'string',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }

  },
  audioFile: {
    type: 'string',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Audios'
      }
    }

  }
}));
