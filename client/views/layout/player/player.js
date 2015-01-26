// Playlist Play
Template.Player.events({
    // ToDo: Need to make this reactive - this.id and this.url always point to the initial song, does not update
    'click .play-pause': function (event, template) {
         //cl("play-pause e target: " + curSoundObj + ''+ this.id +' '+this.url); // Debug - not reactive
        clJ(this); // Get the current object info --  still not reactive though

        if (curSoundObj !== null) { // Check if curSoundObj is actually live
            curSoundObj.togglePause();
        }
        else {
            // cl('curSoundOb = null');
            console.log("playing for first time: ID: "+this.id +' URL: '+ this.url); // debugging
            playSong(this.id, this.url); // Pass the current song Id + url
        }
    },
    'click .previous': function (event, template) {
        console.log('Previous Clicked: ' + this.id + ' ' + event.currentTarget);
        previousSong(curSoundObj.id);
    },
    'click .sm2-progress-track': function (e, t) { // Seeking Handler
        e.stopPropagation();
        cl('seek click initiated ' + this.id + '' + this.url);
        if (Session.get('currentSoundObj') !== null) {
            var barWidth = $('.sm2-progress-track').outerWidth(); // Get the width of the // progress ba

            //cl("barwidth: " + barWidth + '' + this.id); // debugging seek functionality
            setSeekPos(this.id, e, barWidth);
        }
        else {
            // cl('currentSoundObj null ' + this.url);
            playSong(this.id, this.url);
        }
    },
    'click .sm2-volume-control': function (e,t) {
        // Start with just mute when clicking on the volume slider

        if (!curSoundObj) { // check if a song is playing
            cl('Cant mute if nothing is playing!');
        } else {
            e.preventDefault();
            toggleMute(curSoundObj.id);
        }
    }

});

Template.Player.helpers({
    song: [
        //{ id: "song2", url: "/fixtures/songs/song2.mp3", name: "Yos", artist: "beetles" },
        //{ id: "song2", url: "/fixtures/songs/song1.mp3", name: "RUGs", artist: "besrdles" },
        { id: "song3", url: "/fixtures/songs/song3.mp3", name: "Default Title Song 1", artist: "Jason Brunderloin" }
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
    },
    mutedClass: function () {
        return Session.get('mutedClass') === true ? 'muted' : 'non-muted';
    },
    bufferingClass: function () {
        return Session.get('bufferingClass') === true ? 'buffering' : '';
    }
    /*artistName: function (ownerId) {
     if (!ownerId) cl('No _id Set!');
     var userObj = Meteor.users.findOne({ _id: ownerId });
     if (!userObj) cl("No userObj Set!");
     //cl("name: "+userObj.userName);
     return userObj.userName;
     }*/

});
