Meteor.startup(function () {
    /***************************************************************/
    /* Fixture Generation */
    //Add other methods to fit your needs
    /***************************************************************/
    var fakeFixture = {
        getName: function() {
            var namesLength = this.names.length,
                name = this.names[Math.floor(Math.random() * namesLength)];
            return this.capitalize(name);
        },
        getWord:  function(min, max) {
            var length = this.wordLengths[Math.floor(Math.random() * 16)];
            if(min && (length < min)) length = min;
            if(max && (length > max)) length = max;
            var word = '';
            for(var i = 0; i < length; ++i) {
                var count = this.syllabeCounts[Math.floor(Math.random() * 16)];
                word += this.syllabes[Math.floor(Math.random() * count)];
            }
            return word;
        },
        getLocation: function () {
            var location = this.fromArray(this.cities);
            return {
                city: location[0],
                state: location[1]
            };
        },
        getSentence: function(length) {
            if(!length) {
                length = 4 + Math.floor(Math.random() * 8);
            }
            var ending = (Math.random() < 0.95) ? '.' : (Math.random() < 0.5) ? '!' : '?';
            var result = this.getWord();
            result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
            for(var i = 1; i < length; ++i) {
                result += ' ' + this.getWord();
            }
            return result + ending;
        },
        getParagraph: function(length) {
            if(!length) {
                length = 6 + Math.floor(Math.random() * 8);
            }
            var result = this.getSentence();
            for(var i = 1; i < length; ++i) {
                result += ' ' + this.getSentence();
            }
            return result;
        },
        getDomain: function() {
            return this.getWord(2) + this.domains[Math.floor(Math.random() * 8)];
        },
        getEmail: function () {
            return (this.getName() + '@' +this.getDomain()).toLowerCase();
        },
        getRandomDate: function(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        },
        getBoolen: function () {
            return Math.round(Math.random()) === 0 ? true : false;
        },
        capitalize: function(str) {
            return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
        },
        fromArray: function(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        getRandomRange: function (maxNum) {
            return _.random(maxNum);
        },
        getGenre: function () {
            return this.fromArray(this.genre)
        },
        getProPic: function() {
            return '/images/profile/avatar'+this.getRandomRange(7)+'.png';
        },
        /*******************************/
        // Raw Data
        /*******************************/
        genre: ["rap", "jazz", "country", "pop", "rock", "reggae", "classical", "edm"],
        syllabes: [
            'the','ing','er','a','ly','ed','i','es','re','tion','in','e','con','y','ter','ex','al','de','com','o','di','en','an','ty','ry','u',
            'ti','ri','be','per','to','pro','ac','ad','ar','ers','ment','or','tions','ble','der','ma','na','si','un','at','dis','ca','cal','man','ap',
            'po','sion','vi','el','est','la','lar','pa','ture','for','is','mer','pe','ra','so','ta','as','col','fi','ful','get','low','ni','par','son',
            'tle','day','ny','pen','pre','tive','car','ci','mo','an','aus','pi','se','ten','tor','ver','ber','can','dy','et','it','mu','no','ple','cu',
            'fac','fer','gen','ic','land','light','ob','of','pos','tain','den','ings','mag','ments','set','some','sub','sur','ters','tu','af','au','cy','fa','im',
            'li','lo','men','min','mon','op','out','rec','ro','sen','side','tal','tic','ties','ward','age','ba','but','cit','cle','co','cov','daq','dif','ence',
            'ern','eve','hap','ies','ket','lec','main','mar','mis','my','nal','ness','ning','nu','oc','pres','sup','te','ted','tem','tin','tri','tro','up',
        ],
        wordLengths: [
            1, 1,
            2, 2, 2, 2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4,
            5
        ],
        syllabeCounts: [
            10,15,20,25,
            30,35,40,45,
            50,75,100,125,
            150,175,175,175
        ],
        names: [
            'Abigail','Alice','Amelia','Angelina','Ann',
            'Ashley','Avery','Barbara','Brianna','Camila',
            'Chloe','Dorothy','Elizabeth','Ella','Emily',
            'Emma','Fiona','Florence','Gabrielle','Haley',
            'Hannah','Isabella','Jasmine','Jennifer','Jessica',
            'Juliette','Kate','Leah','Lily','Linda',
            'Lea','Madison','Makayla','Margaret','Maria',
            'Mariana','Mary','Megan','Mia','Olivia',
            'Patricia','Rachel','Samantha','Sarah','Sophie',
            'Susan','Taylor','Valeria','Victoria','Zoe',
            'Alexander','Anthony','Benjamin','Brandon','Carter',
            'Charles','Charlie','Christian','Christopher','Daniel',
            'David','Deven','Dylan','Elijah','Eric',
            'Ethan','Felix','Gabriel','George','Harry',
            'Hudson','Hunter','Jack','Jacob','James',
            'Jason','Jayden','Jeremiah','John','Joseph',
            'Joshua','Justin','Kevin','Liam','Logan',
            'Lucas','Matthew','Michael','Neil','Noah',
            'Oliver','Owen','Raphael','Richard','Robert',
            'Ryan','Samuel','Thomas','Tyler','William'
        ],
        domains: [
            '.net', '.org', '.edu', '.com',
            '.com', '.com', '.com', '.com',
        ],
        cities: [
            ['New York', 'New York'],
            ['Los Angeles', 'California'],
            ['Chicago', 'Illinois'],
            ['Houston', 'Texas' ],
            ['Philadelphia', 'Pennsylvania'] ,
            ['Phoenix', 'Arizona'],
            ['San Diego', 'California'],
            ['Dallas', 'Texas'],
            ['San Antonio', 'Texas' ],
            ['Detroit', 'Michigan'],
            ['San Jose', 'California'],
            ['Indianapolis', 'Indiana'],
            ['San Francisco', 'California'],
            ['Jacksonville', 'Florida'],
            ['Columbus', 'Ohio '],
            ['Austin', 'Texas'],
            ['Memphis', 'Tennessee'],
            ['Baltimore', 'Maryland'],
            ['Milwaukee', 'Wisconsin'],
            ['Boston', 'Massachusetts'],
            ['Charlotte', 'North Carolina'],
            ['El Paso', 'Texas'],
            ['Washington', 'D.C.'],
            ['Seattle', 'Washington'],
            ['Fort Worth', 'Texas'],
            ['Denver', 'Colorado'],
            ['Nashville-Davidson', 'Tennessee'],
            ['Portland', 'Oregon'],
            ['Oklahoma City', 'Oklahoma'],
            ['Las Vegas', 'Nevada'],
        ],
        artistTypes: ['Producer', 'Musician', 'Vocalist', 'Recording Engineer', 'Songwriter', 'Band/Group']
    };

    if (Meteor.users.find().count() === 0) {
        // initiate global user Id array
        var arrayIds = [];
        /*******************************/
        // User Fixture
        /*******************************/
        //User Obj
        var createFakeUser = function () {
            return {
                profile: {
                    firstName: fakeFixture.getName(),
                    //You would make a band fixture here if you wish
                    artistType: fakeFixture.fromArray(fakeFixture.artistTypes),
                    state: fakeFixture.getLocation(),
                    bio: fakeFixture.getParagraph(),
                    rating: fakeFixture.fromArray([1, 2, 3, 4, 5]),
                    avatar: fakeFixture.getProPic()
                },
                userName: fakeFixture.getName(),
                createdAt: fakeFixture.getRandomDate(new Date(2012, 0, 1), new Date()),
	            roles: ['user']
            };
        };
        //User inser
        var initFakeUsers = function (numberOfUsers) {
            var newUser;
            for (var i = 0; i < numberOfUsers; i++) {
                newUser = Meteor.users.insert(createFakeUser());
                arrayIds.push(newUser); // Add Id to the array
                var newUserInfo = Meteor.users.findOne(newUser);
                console.log("User: "+newUserInfo.profile.firstName+" -added."+arrayIds+'');
            }
            console.log("User Count = "+numberOfUsers);
        };
        //Creats x amount of users
        initFakeUsers(13);
		console.log(" arrayIds: "+arrayIds);

        // Create Admin Account
        var createAdminAccount = function () {
            return {
                profile: {
                    firstName: 'admin',
                    //You would make a band fixture here if you wish
                    artistType: fakeFixture.fromArray(fakeFixture.artistTypes),
                    state: fakeFixture.getLocation(),
                    bio: fakeFixture.getParagraph(),
                    rating: fakeFixture.fromArray([1, 2, 3, 4, 5]),
                    avatar: fakeFixture.getProPic()
                },
                userName: 'admin',
                createdAt: fakeFixture.getRandomDate(new Date(2012, 0, 1), new Date()),
                roles: ['admin']
            };
        };
        var initAdminAccount = function () {
            var newAdmin = Meteor.users.insert(createFakeUser());
            arrayIds.push(newAdmin);
            var newAdminInfo = Meteor.users.findOne(newAdmin);
            console.log("User: "+newAdminInfo.profile.firstName+" -added.");
        };
        initAdminAccount();
        console.log('arrayIds '+fakeFixture.fromArray(arrayIds));
        // Song Obj
        var createFakeSong = function (i) { // Pass in i to loop through the actual local files
            return {
                title: fakeFixture.getSentence(5),
                createdBy: fakeFixture.fromArray(arrayIds), // Assign to random user
                genre: fakeFixture.getGenre(),
                likes: fakeFixture.fromArray([2, 5, 10, 15, 21]),
                audioFileId: '/fixtures/songs/song'+i+'.mp3',
                coverImageId: '/fixtures/covers/sample'+i+'.png',
                createdAt: fakeFixture.getRandomDate(new Date(2012, 0, 1), new Date()),
                ownerId: fakeFixture.fromArray(arrayIds)
            };
        };

	    // Special Call for Creating Songs - refering to actual files in file system
	    var initFakeSongs = function() {
		    for (var i = 0; i < 11; i++) {
			    var newSong = Songs.insert(createFakeSong(i));
			    console.log("newSong: "+newSong);
			    var newSongInfo = Songs.findOne(newSong);
			    console.log('new song made: ' + newSongInfo.ownerId + ' '+ newSongInfo.createdBy);
		    }
	    };
        initFakeSongs(); // Creating Fake Songs
        console.log('arrayIds '+fakeFixture.fromArray(arrayIds));
	    var createFakeMessages = function () {
		    return {
			    title: fakeFixture.getSentence(5),
			    createdBy: fakeFixture.fromArray(arrayIds), // Assign to random user
			    to: fakeFixture.fromArray(arrayIds), // Send to random user ToDo: send to random except self
			    body: fakeFixture.getParagraph(1),
			    read: false,
			    createdAt: fakeFixture.getRandomDate(new Date(2012, 0, 1), new Date()),
                ownerId: fakeFixture.fromArray(arrayIds)
		    };
	    };
	    var initFakeMessages = function (numberOfMessages) {
		    for (var i = 0; i < numberOfMessages; i++) {
			    var newMessage = Messages.insert(createFakeMessages());
			    console.log('Message create: '+newMessage);
			    var newMess = Messages.findOne(newMessage);
			    console.log('nmess: '+newMess.ownerId);
			    console.log("User: "+newMess.title+" -added.");
		    }
	    };

        initFakeMessages(20);
        console.log("Init Done!");
	    // Create 1 ad for each fake user
	    var createFakeAds = function (value) {
            if (!value){
                console.log("NO VALUE!");
            }
		    var userObj = Meteor.users.findOne(value);
		    console.log('createFake '+userObj+'value: '+value);
		    return {
			    title: fakeFixture.getSentence(5),
			    createdBy: value, // Assign to the pulled in author
			    description: fakeFixture.getParagraph(1),
			    artistType: userObj.profile.artistType,
			    createdAt: fakeFixture.getRandomDate(new Date(2012, 0, 1), new Date()),
			    price: fakeFixture.getRandomRange(100),
                genre: fakeFixture.getGenre()
		    };
	    };
        var initFakeAds = function(list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var adObj = Ads.insert(createFakeAds(list[i]));
                console.log('Ad Made: '+adObj);
            }
        };
        initFakeAds(arrayIds);
	    //_.each(arrayIds, createFakeAds());
	    //arrayIds.forEach(createFakeAds());
        //initFakeAds(10);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
        /////////////////////////////////////////////////////////////////////
        //Now Follow/copy the same Schema for the reset of your collections//
        //Best of luck and I only started developing a few months ago and  //
        //and I only picked up meteor about 4 months ago so keep with it   //
        //Although, this shit will keep you up at night, but damn it is one//
        //hell of a rewarding task. Best wishes, T                         //
        /////////////////////////////////////////////////////////////////////

        // for (var j = 0; j < 6; j++) {
        //   Messages.insert({
        //     title: 'Test Message #' + j,
        //     to: sacha._id,
        //     createdBy: sachaId,
        //     body: Fake.paragraph(3),
        //     createdAt: now - j * 600 * 1000,
        //     read: false
        //   });
        //   console.log("Message "+ j);
        // }
        // for (var k = 0; k < 6; k++) {
        //   Requests.insert({
        //     title: 'Test Request #' + k,
        //     createdBy: sachaId,
        //     to: moman._id,
        //     ownerId: sacha._id,
        //     body: 'Hey! Lets work together man!',
        //     sentAt: now - k * 700 * 1000,
        //     read: false
        //   });
        //   console.log("Requests "+ k);
        // }

        // for (var l = 0; l < 6; l++) {
        //   Ads.insert({
        //     title: 'Test Ad #' + i,
        //     createdAt: now - l * 700 * 200,
        //     createdBy: tom._id || tomId,
        //     ownerId: sacha._id || sachaId,
        //     price: l + 12,
        //     description: Fake.paragraph(2),
        //     genre: 'Pop'
        //   });
        //   console.log("Ads "+ l);
        // }
    }

});
