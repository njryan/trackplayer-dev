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

// Initiating Code for the Audio Player - Currently Not in use
Template.PlayerWrapper.helpers({
    /*"playerCheck": function() {
        cl('Player DIdnt Load!');
    }*/
});

Template.PlayerWrapper.created = function() {
  //Notifications.new({ title: '{Artist Name} has liked {Song Name}!', icon: 'bolt' });
};


Template.PlayerWrapper.rendered = function() {


};

Template.PlayerWrapper.events({

 // Create event for clicking on song and updating the current url in player
    // Integrate with sound manager 2 API

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

