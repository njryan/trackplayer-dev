var pageSession = new ReactiveDict();

Template.DashboardInbox.rendered = function() {

};

Template.DashboardInbox.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    },
    "click #page-back-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }


});

Template.DashboardInbox.helpers({

});

var DashboardInboxViewItems = function(cursor) {
    if(!cursor) {
        return [];
    }

    var searchString = pageSession.get("DashboardInboxViewSearchString");
    var sortBy = pageSession.get("DashboardInboxViewSortBy");
    var sortAscending = pageSession.get("DashboardInboxViewSortAscending");
    if(typeof(sortAscending) == "undefined") sortAscending = true;

    var raw = cursor.fetch();

    // filter
    var filtered = [];
    if(!searchString || searchString == "") {
        filtered = raw;
    } else {
        searchString = searchString.replace(".", "\\.");
        var regEx = new RegExp(searchString, "i");
        var searchFields = ["to", "subject", "description", "upload"];
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

var DashboardInboxViewExport = function(cursor, fileType) {
    var data = DashboardInboxViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = "export." + fileType;

    downloadLocalResource(str, filename, "application/octet-stream");
};


Template.DashboardInboxView.rendered = function() {
    pageSession.set("DashboardInboxViewStyle", "table");

};

Template.DashboardInboxView.events({
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
                pageSession.set("DashboardInboxViewSearchString", searchString);
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
                    pageSession.set("DashboardInboxViewSearchString", searchString);
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
                    pageSession.set("DashboardInboxViewSearchString", "");
                }

            }
            return false;
        }

        return true;
    },

    "click #dataview-insert-button": function(e, t) {
        e.preventDefault();
        Router.go("messages.insert", {});
    },

    "click #dataview-export-default": function(e, t) {
        e.preventDefault();
        DashboardInboxViewExport(this.my_received_messages, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        DashboardInboxViewExport(this.my_received_messages, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        DashboardInboxViewExport(this.my_received_messages, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        DashboardInboxViewExport(this.my_received_messages, "json");
    }


});

Template.DashboardInboxView.helpers({
    "isEmpty": function() {
        return !this.my_received_messages || this.my_received_messages.count() == 0;
    },
    "isNotEmpty": function() {
        return this.my_received_messages && this.my_received_messages.count() > 0;
    },
    "isNotFound": function() {
        return this.my_received_messages && pageSession.get("DashboardInboxViewSearchString") && DashboardInboxViewItems(this.my_received_messages).length == 0;
    },
    "searchString": function() {
        return pageSession.get("DashboardInboxViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("DashboardInboxViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("DashboardInboxViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("DashboardInboxViewStyle") == "gallery";
    }


});


Template.DashboardInboxViewTable.rendered = function() {

};

Template.DashboardInboxViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("DashboardInboxViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("DashboardInboxViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("DashboardInboxViewSortAscending") || false;
            pageSession.set("DashboardInboxViewSortAscending", !sortAscending);
        } else {
            pageSession.set("DashboardInboxViewSortAscending", true);
        }
    }
});

Template.DashboardInboxViewTable.helpers({
    "tableItems": function() {
        return DashboardInboxViewItems(this.my_received_messages);
    }
});


Template.DashboardInboxViewTableItems.rendered = function() {

};

Template.DashboardInboxViewTableItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        Router.go("messages.details", {messageId: this._id});
        return false;
    },

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
                        DashboardInbox.remove({ _id: me._id });
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
        Router.go("messages.edit", {messageId: this._id});
        return false;
    }
});

Template.DashboardInboxViewTableItems.helpers({

});
