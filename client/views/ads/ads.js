var pageSession = new ReactiveDict();

Template.Ads.rendered = function() {
	
};

Template.Ads.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Ads.helpers({
	
});

var AdsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdsViewSearchString");
	var sortBy = pageSession.get("AdsViewSortBy");
	var sortAscending = pageSession.get("AdsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "price", "description"];
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

var AdsViewExport = function(cursor, fileType) {
	var data = AdsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdsView.rendered = function() {
	pageSession.set("AdsViewStyle", "table");
	
};

Template.AdsView.events({
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
				pageSession.set("AdsViewSearchString", searchString);
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
					pageSession.set("AdsViewSearchString", searchString);
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
					pageSession.set("AdsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("ads.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdsViewExport(this.all_ads, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdsViewExport(this.all_ads, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdsViewExport(this.all_ads, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdsViewExport(this.all_ads, "json");
	}

	
});

Template.AdsView.helpers({
	"isEmpty": function() {
		return !this.all_ads || this.all_ads.count() == 0;
	},
	"isNotEmpty": function() {
		return this.all_ads && this.all_ads.count() > 0;
	},
	"isNotFound": function() {
		return this.all_ads && pageSession.get("AdsViewSearchString") && AdsViewItems(this.all_ads).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdsViewStyle") == "gallery";
	}

	
});


Template.AdsViewTable.rendered = function() {
	
};

Template.AdsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdsViewSortAscending") || false;
			pageSession.set("AdsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdsViewSortAscending", true);
		}
	}
});

Template.AdsViewTable.helpers({
	"tableItems": function() {
		return AdsViewItems(this.all_ads);
	}
});


Template.AdsViewTableItems.rendered = function() {
	
};

Template.AdsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("ads.details", {adId: this._id});
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
						Ads.remove({ _id: me._id });
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
		Router.go("ads.edit", {adId: this._id});
		return false;
	}
});

Template.AdsViewTableItems.helpers({

});
