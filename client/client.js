this.App = {};
this.Helpers = {};

Meteor.startup(function () {
    SimpleSchema.debug = true;

    // Session Set Defaults
    Session.setDefault('curSoundObj', null);

    curSoundObj = null;

    // Set constants for soundmanager
    soundManager.useHighPerformance = true;
    soundManager.useFastPolling = true;


});

App.logout = function () {
    Meteor.logout(function (err) {
    });
};

this.menuItemClass = function (routeName) {
    if (!routeGranted(routeName)) {
        return "hidden";
    }

    if (!Router.current() || !Router.current().route) {
        return "";
    }

    if (!Router.routes[routeName]) {
        return "";
    }

    var currentPath = Router.routes[Router.current().route.getName()].handler.path;
    var routePath = Router.routes[routeName].handler.path;

    if (routePath === "/") {
        return currentPath == routePath ? "active" : "";
    }

    return currentPath.indexOf(routePath) === 0 ? "active" : "";
};


Helpers.menuItemClass = function (routeName) {
    return menuItemClass(routeName);
};

Helpers.userFullName = function () {
    var name = "";
    if (Meteor.user() && Meteor.user().profile)
        name = Meteor.user().profile.name;
    return name;
};

Helpers.userEmail = function () {
    var email = "";
    if (Meteor.user() && Meteor.user().profile)
        email = Meteor.user().profile.email;
    return email;
};


Helpers.randomString = function (strLen) {
    return Random.id(strLen);
};

Helpers.secondsToTime = function (seconds, timeFormat) {
    return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function (day) {
    if (_.isArray(day)) {
        var s = "";
        _.each(day, function (d, i) {
            if (i > 0) {
                s = s + ", ";
            }
            s = s + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
        });
        return s;
    }
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
};

Helpers.formatDate = function (date, dateFormat) {
    if (!date) {
        return "";
    }

    var f = dateFormat || "MM/DD/YYYY";

    if (_.isString(date)) {
        if (date.toUpperCase() == "NOW") {
            date = new Date();
        }
        if (date.toUpperCase() == "TODAY") {
            d = new Date();
            date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
    }

    return moment(date).format(f);
};

Helpers.integerToYesNo = function (i) {
    return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function (i) {
    return i ? "True" : "False";
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});

// Create function for firing off notifications based on events -


// Setting Up Account Ui and Social Media Integration
Accounts.ui.config({
    requestPermissions: {
        facebook: ['public_profile']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignupFields: []
});


// Set up the Share-It social media buttons
ShareIt.configure({
    useFB: true,          // boolean (default: true)
                          // Whether to show the Facebook button
    useTwitter: true,     // boolean (default: true)
                          // Whether to show the Twitter button
    useGoogle: false,      // boolean (default: true)
    // Whether to show the Google+ button
    classes: "small btn", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: true,      // boolean (default: false)
    // Don't put text on the sharing buttons
    applyColors: true     // boolean (default: true)
                          // apply classes to inherit each social networks background color
});

// Custom UI Helper for Profile Image
/*UI.registerHelper("getImageUser", function (userId) {
 var user= Meteor.users.findOne(userId);
 if (user.services)
 {
 if (user.services.facebook)
 return user.services.facebook.picture;
 if (user.services.twitter)
 return user.services.twitter.profile_image_url;
 if (user.services.google)
 return user.services.google.picture;
 }
 else
 {
 return "images/withOutPhoto.png";
 }
 });*/



// Template Helper to Pull User FB Image
Template.registerHelper('userFBImage', function() {
    if(Meteor.user().services.facebook) {
        return '<img src="http://graph.facebook.com/'+Meteor.user().services.facebook.id+'/picture/?type=small" alt="...">';
    }
    return '<img src="/images/'+'anon-img.png">'; // See if returns string or actual image
});


// General Helpers

// Console Log helper
// ToDo: Make this a dynamic helper, passing in variables and automatically outputs the log, Make accepts as many args are needed
cl = function(output) {
    console.log(output);
};

// Helper to console Log Objects clearly.
clJ = function(output) {
    console.log(JSON.stringify(output));
};


/*
 * Helper Functions for Managing Audio Playing
 *
 * TO DO: Get Volume Functionality Working!!
 */



// Convert the time from milliseconds to minutes and seconds
convertTime = function(msec,useString) {
    var nSec = Math.floor(msec / 1000),
        hh = Math.floor(nSec / 3600),
        min = Math.floor(nSec / 60) - Math.floor(hh * 60),
        sec = Math.floor(nSec - (hh * 3600) - (min * 60));

    return (useString ? ((hh ? hh + ':' : '') + (hh && min < 10 ? '0' + min : min) + ':' + ( sec < 10 ? '0' + sec : sec ) ) : { 'min': min, 'sec': sec });
};


// Get X position of the target clicked on
getOffX = function(o) {
    // http://www.xs4all.nl/~ppk/js/findpos.html
    var curleft = 0;
    if (o.offsetParent) {
        while (o.offsetParent) {
            curleft += o.offsetLeft;
            o = o.offsetParent;
        }
    } else if (o.x) {
        curleft += o.x;
    }
    return curleft;
};

// Helper function to set new position when progress bar clicked
// Pass in: Current SongId, Event, barWidth
setSeekPos = function (_id, e, barWidth) {
    var seekPos = 0, deltaX = 0;
    deltaX = ((e.clientX - getOffX(e.target))/barWidth) * 100; // Percentage of seek bar clicked
    seekPos = ((deltaX * Session.get('currentDurRaw')) / 100);
    //cl(deltaX + ''+seekPos); //Debug
    curSoundObj.setPosition(seekPos);
};

toggleMute = function (_id) {
  if (curSoundObj) {
      if (curSoundObj.muted) {
          Session.set('mutedClass', false);
      } else {
          Session.set('mutedClass', true);
      }
      soundManager.toggleMute(_id);
      soundManager._writeDebug(curSoundObj.id+' Muted? '+(curSoundObj.muted?'Yes - mute': 'No - not muted')+'.');
      //cl('Mute Toggled');
  } else {
      cl("Cant mute, no song playing!");
  }
};


// Play song, or toggle pause if the song is already playing
playSong = function (_id, url) {
    // If Sound Manager is already active, stop playing all other songs. Play one at a time
    if(typeof(soundManager) !== 'undefined'){
        soundManager.stopAll();
    }
    if (!soundManager.canPlayURL(url)) cl("Bad UrL"); // Check for proper URL
    if (!soundManager.getSoundById(_id)) {
        curSoundObj = soundManager.createSound({
            id: _id,
            url: url,
            autoLoad: false,
            stream: false,
            autoPlay: true, // start playing this song automatically instead of using soundManager.play(_id) to manually start it

            onload: function () {
                Session.set('curSoundObj', this.id);
                cl("loaded! "+ this.id);
                this.setPosition(0); // Set Position to 0 on Load
                Session.set('currentDurRaw', this.duration); // Current Duration in milliseconds for seek click
                Session.set('currentPos', this.position); // initial position
                Session.set('currentDur', convertTime(this.durationEstimate, true)); // Set the total duration time
                Session.set('mutedClass', false);
            },
            onbufferchange: function() {
                soundManager._writeDebug(this.id+' Buffering '+(this.isBuffering?'started': 'stopped')+'.'); // debug to console

                this.isBuffering? Session.set('bufferingClass', true) : Session.set('bufferingClass', false);
            },
            whileplaying: function () {
                Session.set('progress', (this.position * 100 / this.duration)); // to round the decimals --> .toFixed(4)); // Display Current position in % for progress bar
                Session.set('currentPos', convertTime(this.position, true)); // Update the Current Time String
            },
            onplay: function () {
                Session.set('playingClass', true);
            },
            onpause: function () {
                Session.set('playingClass', false);
            },
            onresume: function () {
                Session.set('playingClass', true);
            },
            onfinish: function () {
                // remember to release audio resources
                soundManager.unload(_id);
                soundManager.destroySound(_id);
                Session.set('playingClass', false);
                curSoundObj = null;
                // maybe play next file from playlist?
                //playNext(doc._id);
                cl("done playing sound!");
            },
            onerror: function () {
                // soundManager init failed - ExternalInterface/security/JS error, or missing .SWF/old Flash plugin
                // Notify user if needed, disable sound-specific functionality etc.
                console.log("Error on SoundObj - onerror!");
            },
            whileloading: function() {
                //cl('Debug Helper While Loading: '+this.id +' Playstate: '+this.playState+' ReadyState: '+this.readyState); // Debug helper
                //soundManager._writeDebug(this.id + ': loading ' + this.bytesLoaded + ' / ' + this.bytesTotal);

            },
            ontimeout: function() {
                cl('Error - ontimeout!');
            }
        });
        cl('curSoundObj ID: '+curSoundObj.id + ' URL: '+curSoundObj.url);
    } else {
        cl("How did it get here.... else loop of playSong"+soundManager.getSoundById(_id));
        soundManager.togglePause(_id);
    }
};

previousSong = function (_id) {
    if (curSoundObj.position !== 0) { //Song playing for over 1 second, set to beginning
        soundManager.setPosition(_id, 0);
        cl("Song set back to position 0");
    } else {
        cl('ToDO: COnfig Playlist');
    }
};


