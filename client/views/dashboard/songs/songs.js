var pageSession = new ReactiveDict();

Template.Songs.rendered = function() {

};

Template.Songs.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    },
    "click #page-back-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }


});

Template.Songs.helpers({

});

var SongsViewItems = function(cursor) {
    if(!cursor) {
        return [];
    }

    var searchString = pageSession.get("SongsViewSearchString");
    var sortBy = pageSession.get("SongsViewSortBy");
    var sortAscending = pageSession.get("SongsViewSortAscending");
    if(typeof(sortAscending) == "undefined") sortAscending = true;

    var raw = cursor.fetch();

    // filter
    var filtered = [];
    if(!searchString || searchString == "") {
        filtered = raw;
    } else {
        searchString = searchString.replace(".", "\\.");
        var regEx = new RegExp(searchString, "i");
        var searchFields = ["title", "url", "genre", "likes"];
        filtered = _.filter(raw, function(item) {
            var match = false;
            _.each(searchFields, function(field) {
                var value = (getPropertyValue(field, item) || "") + "";

                match = match || (value && value.match(regEx));
                if(match) {
                    return false;
                }
            })
            return match;
        });
    }

    // sort
    if(sortBy) {
        filtered = _.sortBy(filtered, sortBy);

        // descending?
        if(!sortAscending) {
            filtered = filtered.reverse();
        }
    }

    return filtered;
};

var SongsViewExport = function(cursor, fileType) {
    var data = SongsViewItems(cursor);
    var exportFields = ["likes"];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = "export." + fileType;

    downloadLocalResource(str, filename, "application/octet-stream");
}


Template.SongsView.rendered = function() {
    pageSession.set("SongsViewStyle", "table");

};

Template.SongsView.events({
    "submit #dataview-controls": function(e, t) {
        return false;
    },

    "click #dataview-search-button": function(e, t) {
        e.preventDefault();
        var form = $(e.currentTarget).parent();
        if(form) {
            var searchInput = form.find("#dataview-search-input");
            if(searchInput) {
                searchInput.focus();
                var searchString = searchInput.val();
                pageSession.set("SongsViewSearchString", searchString);
            }

        }
        return false;
    },

    "keydown #dataview-search-input": function(e, t) {
        if(e.which === 13)
        {
            e.preventDefault();
            var form = $(e.currentTarget).parent();
            if(form) {
                var searchInput = form.find("#dataview-search-input");
                if(searchInput) {
                    var searchString = searchInput.val();
                    pageSession.set("SongsViewSearchString", searchString);
                }

            }
            return false;
        }

        if(e.which === 27)
        {
            e.preventDefault();
            var form = $(e.currentTarget).parent();
            if(form) {
                var searchInput = form.find("#dataview-search-input");
                if(searchInput) {
                    searchInput.val("");
                    pageSession.set("SongsViewSearchString", "");
                }

            }
            return false;
        }

        return true;
    },

    "click #dataview-insert-button": function(e, t) {
        e.preventDefault();
        Router.go("songs.insert", {});
    },

    "click #dataview-export-default": function(e, t) {
        e.preventDefault();
        SongsViewExport(this.all_songs, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        SongsViewExport(this.all_songs, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        SongsViewExport(this.all_songs, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        SongsViewExport(this.all_songs, "json");
    }


});

Template.SongsView.helpers({
    "isEmpty": function() {
        return !this.all_songs || this.all_songs.count() == 0;
    },
    "isNotEmpty": function() {
        return this.all_songs && this.all_songs.count() > 0;
    },
    "isNotFound": function() {
        return this.all_songs && pageSession.get("SongsViewSearchString") && SongsViewItems(this.all_songs).length == 0;
    },
    "searchString": function() {
        return pageSession.get("SongsViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("SongsViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("SongsViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("SongsViewStyle") == "gallery";
    }


});


Template.SongsViewTable.rendered = function() {

};

Template.SongsViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("SongsViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("SongsViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("SongsViewSortAscending") || false;
            pageSession.set("SongsViewSortAscending", !sortAscending);
        } else {
            pageSession.set("SongsViewSortAscending", true);
        }
    }
});

Template.SongsViewTable.helpers({
    "tableItems": function() {
        return SongsViewItems(this.all_songs);
    }
});


Template.SongsViewTableItems.rendered = function() {

};

Template.SongsViewTableItems.events({
    /*"click td": function(e, t) {
     e.preventDefault();
     Router.go("songs.details", {songId: this._id});
     return false;
     },*/

    "click #delete-button": function(e, t) {
        e.preventDefault();
        var me = this;
        bootbox.dialog({
            message: "Delete? Are you sure?",
            title: "Delete",
            animate: false,
            buttons: {
                success: {
                    label: "Yes",
                    className: "btn-success",
                    callback: function() {
                        Songs.remove({ _id: me._id });
                    }
                },
                danger: {
                    label: "No",
                    className: "btn-default"
                }
            }
        });
        return false;
    },
    "click #edit-button": function(e, t) {
        e.preventDefault();
        Router.go("songs.edit", {songId: this._id});
        return false;
    }
});

Template.SongsViewTableItems.helpers({
    "imageItems": function() {
        //console.log(this);
        return Images.find({},{limit:1});
    },
    "audioItems": function() {
        //console.log(this);
        return Audios.find({},{limit:1});
    }
});

