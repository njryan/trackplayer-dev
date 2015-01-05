var pageSession = new ReactiveDict();

Template.Requests.rendered = function() {
	
};

Template.Requests.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Requests.helpers({
	
});

var RequestsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RequestsViewSearchString");
	var sortBy = pageSession.get("RequestsViewSortBy");
	var sortAscending = pageSession.get("RequestsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["to", "message"];
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

var RequestsViewExport = function(cursor, fileType) {
	var data = RequestsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.RequestsView.rendered = function() {
	pageSession.set("RequestsViewStyle", "table");
	
};

Template.RequestsView.events({
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
				pageSession.set("RequestsViewSearchString", searchString);
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
					pageSession.set("RequestsViewSearchString", searchString);
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
					pageSession.set("RequestsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("requests.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		RequestsViewExport(this.all_requests, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RequestsViewExport(this.all_requests, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RequestsViewExport(this.all_requests, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RequestsViewExport(this.all_requests, "json");
	}

	
});

Template.RequestsView.helpers({
	"isEmpty": function() {
		return !this.all_requests || this.all_requests.count() == 0;
	},
	"isNotEmpty": function() {
		return this.all_requests && this.all_requests.count() > 0;
	},
	"isNotFound": function() {
		return this.all_requests && pageSession.get("RequestsViewSearchString") && RequestsViewItems(this.all_requests).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RequestsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RequestsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("RequestsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RequestsViewStyle") == "gallery";
	}

	
});


Template.RequestsViewTable.rendered = function() {
	
};

Template.RequestsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("RequestsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RequestsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RequestsViewSortAscending") || false;
			pageSession.set("RequestsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("RequestsViewSortAscending", true);
		}
	}
});

Template.RequestsViewTable.helpers({
	"tableItems": function() {
		return RequestsViewItems(this.all_requests);
	}
});


Template.RequestsViewTableItems.rendered = function() {
	
};

Template.RequestsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("requests.details", {requestId: this._id});
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
						Requests.remove({ _id: me._id });
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
		Router.go("requests.edit", {requestId: this._id});
		return false;
	}
});

Template.RequestsViewTableItems.helpers({

});
