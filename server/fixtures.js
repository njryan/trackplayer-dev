if (Meteor.users.find().count() === 0) {
  // To Do: Refactor this code to make it dynamic for any scale of data
  // Loop through user array, for each user, make certain number of each post
  var now = new Date().getTime();
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom' },
    bio: 'Tommies Bio Tommies Bio Tommies Bio',
    rating: 3,
    username: 'tommy',
    state: 'NY',
    artistType: 'Musician',
    roles: ["user"]
  });
  var tom = Meteor.users.findOne(tomId);

  var sachaId = Meteor.users.insert({
    profile: { name: 'SachaG' },
    bio: 'S Bio S Bio S Bio',
    rating: 2,
    username: 'Sacha',
    state: 'NY',
    artistType: 'Songwriter',
    roles: ["user"]
  });
  var sacha = Meteor.users.findOne(sachaId);

  var moId = Meteor.users.insert({
    profile: { name: 'MOs' },
    bio: 'M Bio S Bio M Bio',
    rating: 5,
    username: 'moman',
    state: 'CT',
    artistType: 'Producer',
    roles: ["user"]
  });
  var moman = Meteor.users.findOne(moId);

  for (var i = 0; i < 6; i++) {
    Songs.insert({
      title: 'Test song #' + i,
      name: 'Test song #' + i,
      author: sacha.profile.name,
      ownerId: sacha._id,
      url: '/music/song' + i + '.mp3',
      submitted: now - i * 3600 * 1000,
      likes: i + 3,
      genre: 'Rock'
    });
  }
  for (var j = 0; j < 6; j++) {
    Messages.insert({
      title: 'Test Message #' + i,
      name: 'Test Message #' + i,
      author: moman.profile.name,
      ownerId: moman._id,
      upload:'/attachments/'+i,
      description: "same message sample message sample mssage",
      subject: "It's saying Hi! " + i + " ",
      submitted: now - i * 600 * 1000,
    });
  }
  for (var k = 0; k < 6; k++) {
    Requests.insert({
      title: 'Test Request #' + i,
      name: 'Test Request #' + i,
      author: tom.profile.name,
      ownerId: tom._id,
      to: moman._id,
      message: 'Hey! Lets work together man!',
      submitted: now - i * 700 * 1000,
    });
  }

  for (var l = 0; l < 6; l++) {
    Ads.insert({
      title: 'Test Ad #' + i,
      author: tom.profile.name,
      ownerId: tom._id,
      name: 'Test Ad #' + i,
      price: i + 12,
      description: "it goes a little something like this!",
      submitted: now - i * 3600 * 1000,
      genre: 'Jazz'
    });
  }

}
