this.Songs = new Meteor.Collection("songs");
Songs.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author",
    optional:true
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
  genre: {
    type: [String],
    label: "Genre",
    allowedValues: ["rap-hiphop","jazz","country", "pop", "rock", "reggae", "classical", "EDM"],
    autoform: {
      afFieldInput: {
        firstOption: "(Select a Genre)"
      }
    }
  },
  likes: {
    type: Number,
    label: "Likes",
    optional:true
  },
  coverImage: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }

  },
  audioFile: {
    type: 'string',
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Audios'
      }
    }

  }
}));
