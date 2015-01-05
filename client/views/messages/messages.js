var pageSession = new ReactiveDict();

Template.Messages.rendered = function() {
	
};

Template.Messages.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Messages.helpers({
	
});

var MessagesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MessagesViewSearchString");
	var sortBy = pageSession.get("MessagesViewSortBy");
	var sortAscending = pageSession.get("MessagesViewSortAscending");
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

var MessagesViewExport = function(cursor, fileType) {
	var data = MessagesViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MessagesView.rendered = function() {
	pageSession.set("MessagesViewStyle", "table");
	
};

Template.MessagesView.events({
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
				pageSession.set("MessagesViewSearchString", searchString);
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
					pageSession.set("MessagesViewSearchString", searchString);
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
					pageSession.set("MessagesViewSearchString", "");
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
		MessagesViewExport(this.all_messages, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MessagesViewExport(this.all_messages, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MessagesViewExport(this.all_messages, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MessagesViewExport(this.all_messages, "json");
	}

	
});

Template.MessagesView.helpers({
	"isEmpty": function() {
		return !this.all_messages || this.all_messages.count() == 0;
	},
	"isNotEmpty": function() {
		return this.all_messages && this.all_messages.count() > 0;
	},
	"isNotFound": function() {
		return this.all_messages && pageSession.get("MessagesViewSearchString") && MessagesViewItems(this.all_messages).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MessagesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MessagesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MessagesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MessagesViewStyle") == "gallery";
	}

	
});


Template.MessagesViewTable.rendered = function() {
	
};

Template.MessagesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MessagesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MessagesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MessagesViewSortAscending") || false;
			pageSession.set("MessagesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MessagesViewSortAscending", true);
		}
	}
});

Template.MessagesViewTable.helpers({
	"tableItems": function() {
		return MessagesViewItems(this.all_messages);
	}
});


Template.MessagesViewTableItems.rendered = function() {
	
};

Template.MessagesViewTableItems.events({
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
						Messages.remove({ _id: me._id });
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

Template.MessagesViewTableItems.helpers({

});
