if (Meteor.users.find().count() === 0) {
  // To Do: Refactor this code to make it dynamic for any scale of data
  // Loop through user array, for each user, make certain number of each post
  var now = new Date().getTime();
  // create two users
  console.log("Starting User Dump Now");
  var tomId = Meteor.users.insert({
    profile: {
      firstName: 'Tom',
      artistType: "band",
      state: 'NY',
      bio: Fake.paragraph(1),
      rating: 3
    },
    username: 'tommy',
    createdAt: now
  });
  var tom = Meteor.users.findOne(tomId);

  console.log("One Done!" + tom._id + tom + tomId);

  var sachaId = Meteor.users.insert({
    profile: {
      firstName: 'SachaG',
      artistType: "musician",
      bio: Fake.word(20),
      state: 'NY',
      rating: 2
    },
    username: 'Sacha',
    createdAt: now
  });
  var sacha = Meteor.users.findOne(sachaId);

  console.log("Two Done!"+ sacha._id +" "+ sacha +" "+ sachaId);

  var moId = Meteor.users.insert({
    profile: {
      firstName: 'MOs',
      state: 'CT',
      artistType: "producer",
      rating: 5,
      bio: Fake.paragraph(3)
    },
    createdAt: now,
    username: 'moman'
  });
  var moman = Meteor.users.findOne(moId);

  console.log("Mo:" + moId +" "+ moman +" "+ moman._id);

  for (var i = 0; i < 6; i++) {
    Songs.insert({
      title: 'Test song #' + i,
      name: 'Test song #' + i,
      author: sachaId,
      ownerId: sachaId,
      audioFile: '/music/song' + i + '.mp3',
      submitted: now - i * 3600 * 1000,
      likes: i + 3,
      coverImage: '/images/anon-img.png',
      genre: 'rock'
    });
  }
  for (var j = 0; j < 6; j++) {
    Messages.insert({
      title: 'Test Message #' + j,
      to: sacha._id,
      createdBy: sachaId,
      body: Fake.paragraph(3),
      createdAt: now - j * 600 * 1000,
      read: false
    });
    console.log("Message "+ j);
  }
  for (var k = 0; k < 6; k++) {
    Requests.insert({
      title: 'Test Request #' + k,
      createdBy: sachaId,
      to: moman._id,
      ownerId: sacha._id,
      body: 'Hey! Lets work together man!',
      sentAt: now - k * 700 * 1000,
      read: false
    });
    console.log("Requests "+ k);
  }

  for (var l = 0; l < 6; l++) {
    Ads.insert({
      title: 'Test Ad #' + i,
      createdAt: now - l * 700 * 200,
      createdBy: tom._id || tomId,
      ownerId: sacha._id || sachaId,
      price: l + 12,
      description: Fake.paragraph(2),
      genre: 'Pop'
    });
    console.log("Ads "+ l);
  }

}