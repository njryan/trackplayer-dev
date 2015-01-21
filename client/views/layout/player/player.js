// Playlist Play
Template.Player.events({
                           'click .play-pause': function (event, template) {
                               cl("play-pause e target: " + event.target.val + ' ' + event.target.nodeName);

                               if (curSoundObj !== null) { // Check if curSoundObj is actually live
                                   curSoundObj.togglePause();
                               }
                               else {
                                   cl('curSoundOb = null');
                                   console.log(this.id + this.url); // debugging
                                   playSong(this.id, this.url); // Pass the current song Id + url
                               }
                           },
                           'click .previous': function (event, template) {
                               console.log('Previous Clicked: ' + template + ' ' + event);
                               previousSong(this.id);
                           },
                           'click .sm2-progress-track': function (e, t) { // Seeking Handler
                               e.stopPropagation();
                               cl('seek click initiated ' + this.id + '' + this.url);
                               if (Session.get('currentSoundObj') !== null) {
                                   var barWidth = $('.sm2-progress-track').outerWidth(); // Get the width of the
                                                                                         // progress bar
                                   cl("barwidth: " + barWidth + '' + this.id);
                                   setSeekPos(this.id, e, barWidth);
                               }
                               else {
                                   cl('currentSoundObj null ' + this.url);
                                   playSong(this.id, this.url);
                               }
                           }

});

Template.Player.helpers({
                            song: [
                                { id: "song2", url: "/fixtures/songs/song2.mp3", name: "Yos", artist: "beetles" }
                                //{ id: "song2", url: "/music/song2.mp3", name: "RUGs", artist: "besrdles" },
                                //{ id: "song3", url: "/music/song3.mp3", name: "MEs", artist: "mees" }
                            ],
                            getProgress: function () {
                                return Session.get('progress') + '%';
                            },
                            currentPos: function () {
                                return Session.get('currentPos');
                            },
                            currentDur: function () {
                                return Session.get('currentDur');
                            },
                            playingClass: function () {
                                return Session.get('playingClass') === true ? 'playing' : 'paused';
                            }
                            /*artistName: function (ownerId) {
                             if (!ownerId) cl('No _id Set!');
                             var userObj = Meteor.users.findOne({ _id: ownerId });
                             if (!userObj) cl("No userObj Set!");
                             //cl("name: "+userObj.userName);
                             return userObj.userName;
                             }*/


});
