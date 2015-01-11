Template.layout.rendered = function() {
  // scroll to anchor
  $('body').on('click', 'a', function(e) {
    var href = $(this).attr("href");
    if (!href) {
      return;
    }
    if (href.length > 1 && href.charAt(0) == "#") {
      var hash = href.substring(1);
      if (hash) {
        e.preventDefault();

        var offset = $('*[id="' + hash + '"]').offset();

        if (offset) {
          $('html,body').animate({
            scrollTop: offset.top - 50
          }, 400);
        }
      }
    } else {
      if (href.indexOf("http://") != 0 && href.indexOf("https://") != 0 && href.indexOf("#") != 0) {
        $('html,body').scrollTop(0);
      }
    }
  });
  /*TEMPLATE_RENDERED_CODE*/


  // custom evan code to try to subscribe
};

// Initiating Code for the Audio Player
Template.AudioPlayer.helpers({

});

Template.AudioPlayer.created = function() {

}



Template.AudioPlayer.rendered = function() {
  // Jplayer Sample Code
  /*myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_N",
			cssSelectorAncestor: "#jp_container_N"
		}, [
	{
		title:"Cro Magnon Man",
		artist:"The Stark Palace",
		mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
		oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
		poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
	}
	], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "../../dist/jplayer",
		supplied: "webmv, ogv, m4v, oga, mp3",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true
	});*/

}

Template.AudioPlayer.events({
  // Template Helper to load in the first playlist
  /*"click #playlist-setPlaylist-audio-mix" : function() {
		myPlaylist.setPlaylist([
		{
			title:"Cro Magnon Man",
			artist:"The Stark Palace",
			mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
			oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
			poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
		},
	{
		title:"Your Face",
		artist:"The Stark Palace",
		mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
		oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg",
		poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
	},
{
	title:"Hidden",
	artist:"Miaow",
	free: true,
	mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
	oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
	poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
},
{
	title:"Cyber Sonnet",
	artist:"The Stark Palace",
	mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
	oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg",
	poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
},
{
	title:"Tempered Song",
	artist:"Miaow",
	mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
	oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
	poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
},
{
	title:"Lentement",
	artist:"Miaow",
	mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
	oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg",
	poster: "http://www.jplayer.org/audio/poster/Miaow_640x360.png"
}
]);
}*/

});

Template.PublicLayoutLeftMenu.rendered = function() {
  $(".menu-item-collapse .dropdown-toggle").each(function() {
    if ($(this).find("li.active")) {
      $(this).removeClass("collapsed");
    }
    $(this).parent().find(".collapse").each(function() {
      if ($(this).find("li.active").length) {
        $(this).addClass("in");
      }
    });
  });


};

Template.PublicLayoutLeftMenu.events({

});

Template.PublicLayoutLeftMenu.helpers({

});

Template.PublicLayoutRightMenu.rendered = function() {
  $(".menu-item-collapse .dropdown-toggle").each(function() {
    if ($(this).find("li.active")) {
      $(this).removeClass("collapsed");
    }
    $(this).parent().find(".collapse").each(function() {
      if ($(this).find("li.active").length) {
        $(this).addClass("in");
      }
    });
  });


};

Template.PublicLayoutRightMenu.events({

});

Template.PublicLayoutRightMenu.helpers({

});


Template.PrivateLayoutLeftMenu.rendered = function() {
  $(".menu-item-collapse .dropdown-toggle").each(function() {
    if ($(this).find("li.active")) {
      $(this).removeClass("collapsed");
    }
    $(this).parent().find(".collapse").each(function() {
      if ($(this).find("li.active").length) {
        $(this).addClass("in");
      }
    });
  });


};

Template.PrivateLayoutLeftMenu.events({

});

Template.PrivateLayoutLeftMenu.helpers({

});

Template.PrivateLayoutRightMenu.rendered = function() {
  $(".menu-item-collapse .dropdown-toggle").each(function() {
    if ($(this).find("li.active")) {
      $(this).removeClass("collapsed");
    }
    $(this).parent().find(".collapse").each(function() {
      if ($(this).find("li.active").length) {
        $(this).addClass("in");
      }
    });
  });


};

Template.PrivateLayoutRightMenu.events({

});

Template.PrivateLayoutRightMenu.helpers({

});

Template.PrivateLayoutBottomLeftMenu.rendered = function() {
  $(".menu-item-collapse .dropdown-toggle").each(function() {
    if ($(this).find("li.active")) {
      $(this).removeClass("collapsed");
    }
    $(this).parent().find(".collapse").each(function() {
      if ($(this).find("li.active").length) {
        $(this).addClass("in");
      }
    });
  });


};

Template.PrivateLayoutBottomLeftMenu.events({

});

Template.PrivateLayoutBottomLeftMenu.helpers({

});