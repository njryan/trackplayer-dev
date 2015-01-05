var pageSession = new ReactiveDict();

Template.SongsEdit.rendered = function() {
	
};

Template.SongsEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.SongsEdit.helpers({
	
});

Template.SongsEditEditForm.rendered = function() {
	

	pageSession.set("songsEditEditFormInfoMessage", "");
	pageSession.set("songsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.SongsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("songsEditEditFormInfoMessage", "");
		pageSession.set("songsEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("songsEditEditFormInfoMessage", "Saved.");
			}

			Router.go("songs", {});
		}

		function errorAction(msg) {
			pageSession.set("songsEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Songs.update({ _id: t.data.song._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("songs", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.SongsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("songsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("songsEditEditFormErrorMessage");
	}
	
});
